<template>
    <div>
        <h1>Timer</h1>
        <div class="timer">{{formattedTime}}</div>
        <div>
            <button class="start" v-if="!isTimerRunning" @click="startTimer">Start</button>
            <button class="stop" v-else @click="stopTimer">Stop</button>
        </div>
        <div v-if="!isTimerRunning && elapsedTime!=0">
            <label for="note-input">Note:</label>
            <input v-model="note" id="note-input" type="text">
        </div>
        <div>
            <button v-if="!isTimerRunning && elapsedTime!=0" @click="saveTime">Save</button>
            <button v-if="!isTimerRunning && elapsedTime!=0" @click="resetTimer">Reset</button>
        </div>

        
        <!-- Select phase to record -->
        <label for="record-phase-select">Phase:</label>
            <select v-model="recordingPhase" id="record-phase-select">
                <option value="whole cube">Whole Cube</option>
                <option value="cross">Cross</option>
                <option value="F2L">F2L</option>
            </select>


        <!-- Display historical times fetched from database -->
        <div class="history">
            <h2>History</h2>
            <div>
                
                <!-- Filter -->
                <label for="history-filter-select">Filter:</label>
                <select v-model="filterBy" id="history-filter-select">
                    <option value="all">All</option>
                    <option value="favorites">Favorites</option>
                    <option value="whole cube">Whole Cube</option>
                    <option value="cross">Cross</option>
                    <option value="F2L">F2L</option>
                </select>
                
                <!-- Sort -->
                <label for="history-sort-select">Sort:</label>
                <select v-model="sortBy" id="history-sort-select">
                    <option value="most recent">Most recent</option>
                    <option value="least recent">Least recent</option>
                    <option value="fastest">Fastest</option>
                    <option value="slowest">Slowest</option>
                </select>
            </div>
            
            <!-- Display sorted and filtered history  -->
            <ul class="outer-list">
                <li v-for="record in sortedHistory">
                    <Record :record=record @removeRecord="removeRecord" @toggleFavorite="toggleFavorite" @updateNote="updateNote"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Record from '../components/Record.vue'

export default {
    components:{
        Record
    },
    data(){
        return{
            elapsedTime: 0,
            startTime: null,
            stopTime: null,
            isTimerRunning: false,
            savedTimes: [],
            recordingPhase: 'whole cube',
            filterBy: 'whole cube',
            sortBy: 'most recent',
            keyBlocked: false,
            note: ''
        }
    },
    computed:{
        formattedTime(){
            return new Date(this.elapsedTime).toISOString().slice(14,23)
        },
        sortedHistory(){
            return this.filteredHistory.sort(this.compareRecords)
        },
        filteredHistory(){
            if(this.filterBy == 'all'){
                return this.savedTimes
            }if(this.filterBy == 'favorites'){
                return this.savedTimes.filter(x => x.isfavorite)
            }

            return this.savedTimes.filter(x => x.phase == this.filterBy)
        }
    },
    // created() {
    //     window.addEventListener('keydown', (e) => {
    //         // Throttle keyboard input
    //         if(this.keyBlocked){
    //             return
    //         }

    //         this.keyBlocked = true

    //         if (e.key == 'S'){
    //             console.log('Saving')
    //             this.saveTime()
    //         }
    //         else if(e.key == 's'){
    //             // Start and stop the timer when space is pressed
    //             if(!this.isTimerRunning){
    //                 console.log('starting!')
    //                 this.startTimer()
    //             }
    //             else{
    //                 console.log('stopping!')
    //                 this.stopTimer()
    //             }
    //         }

    //         this.keyBlocked = false
    //     });
    // },
    mounted(){
        this.getTimes()
    },
    methods:{
        compareRecords(a, b){
            // Helper for sortedHistory()
            if(this.sortBy == 'most recent'){
                return Date.parse(b.time)-Date.parse(a.time)
            }
            else if(this.sortBy == 'least recent'){
                return Date.parse(a.time)-Date.parse(b.time)
            }
            else if(this.sortBy == 'fastest'){
                return (a.duration.seconds+(a.duration.milliseconds / 1000)) - (b.duration.seconds+(b.duration.milliseconds / 1000))
            }
            else if(this.sortBy == 'slowest'){
                return (b.duration.seconds+(b.duration.milliseconds / 1000)) - (a.duration.seconds+(a.duration.milliseconds / 1000))
            }
            else{
                return 
            }

        },
        startTimer(){
            this.isTimerRunning = true;
            this.startTime = Date.now()
            this.timer = setInterval(()=>{
                this.elapsedTime = Date.now() - this.startTime
            }
                , 100)
        },  
        stopTimer(){
            clearInterval(this.timer)
            this.isTimerRunning = false;
            this.stopTime = Date.now()
        },
        resetTimer(){
            this.elapsedTime = 0
            this.note = ''
            this.startTime = null
            this.endTime = null
        },
        removeRecord(record_id){
            axios.post('http://localhost:3000/remove',{record_id}).then(res => {
                console.log("removed")
                console.log(res)

                this.getTimes()

            }).catch(e => {
                console.log(e)
            })
        },
        toggleFavorite(record_id){
            axios.post('http://localhost:3000/favorite',{record_id}).then(res => {
                console.log("Favorited")
                console.log(res)

                this.getTimes()

            }).catch(e => {
                console.log(e)
            })
        },
        updateNote(request){
            console.log(`Timer.vue updateNote()`)
            console.log(request)
            axios.post('http://localhost:3000/note',request).then(res => {
                console.log("updating note")
                console.log(res)

                this.getTimes()

            }).catch(e => {
                console.log(e)
            })
        },
        saveTime(){
            let record = {
                phase: this.recordingPhase,
                time: new Date(this.startTime),
                duration:this.formattedTime,
                notes:this.note
            }

            console.log("Posting record:")
            console.log(record)

            // save to database
            axios.post('http://localhost:3000/add',record).then(res => {
                console.log("Posted")
                console.log(res)

                this.resetTimer()
                this.getTimes()

            }).catch(e => {
                console.log(e)
            })
        },
        getTimes(){
            axios.get('http://localhost:3000/rubiks').then(res => {
                console.log("Getting times...")
                console.log(res.data)
                this.savedTimes = res.data
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
</script>

<style>
    button:hover{
        cursor: pointer;
    }

    .timer{
        padding: 20px;
        font-size: 30px;
        border: 1px solid black;
        width: 200px;
        margin: 5px auto;
        text-align: center;
    }
    .start{
        background-color: green;
    }
    .stop{
        background-color: red;
    }
    .history{
        border: 1px solid black;
        width: 50%;
        margin: auto;
        margin-top: 40px;
    }



</style>