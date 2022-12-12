<template>
    <div class="timer-container">
        <h1>Timer</h1>
        <div class="timer">{{formattedTime}}</div>


        <div class="timer-buttons">
            <div v-if="showStartButton">
                <button class="start" v-if="!isTimerRunning" @click="startTimer">Start</button>
                <button class="stop" v-else @click="stopTimer">Stop</button>
            </div>
            <div v-if="!showStartButton">
                <button class="save" @click="saveTime">Save</button>
                <button @click="resetTimer">Reset</button>
            </div>
        </div>
            
        
        <!-- Select phase to record -->
        <label for="record-phase-select">Phase:</label>
            <select v-model="recordingPhase" id="record-phase-select">
                <option value="whole cube">Whole Cube</option>
                <option value="cross">Cross</option>
                <option value="F2L">F2L</option>
            </select>


    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            elapsedTime: 0,
            startTime: null,
            stopTime: null,
            isTimerRunning: false,
            showStartButton: true,
            recordingPhase: 'whole cube'
        }
    },
    computed:{
        formattedTime(){
            return new Date(this.elapsedTime).toISOString().slice(14,23)
        }
    },
    methods:{
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
            this.isTimerRunning = false
            this.stopTime = Date.now()
            this.showStartButton = false
        },
        resetTimer(){
            this.elapsedTime = 0
            this.note = ''
            this.startTime = null
            this.endTime = null
            this.showStartButton = true
        },
        saveTime(){
            let record = {
                phase: this.recordingPhase,
                time: new Date(this.startTime),
                duration:this.formattedTime,
                notes:''
            }

            console.log("Posting record:")
            console.log(record)

            // save to database
            axios.post('http://localhost:3000/add',record).then(res => {
                console.log("Posted")
                console.log(res)

                this.resetTimer()
                //this.getTimes()

            }).catch(e => {
                console.log(e)
            })
        },
    }
}
</script>

<style>
    button:hover{
        cursor: pointer;
    }

    .timer-container{
        min-width: 300px;
        padding: 20px;
        max-width: 500px;
        margin: auto;
        background-color: rgba(238, 238, 238, 0.929);
        border-radius: 15px;
    }

    .timer{
        padding: 20px;
        font-size: 50px;
        border: 1px solid black;
        width: 300px;
        margin: 10px auto;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.144)
    }
    .start{
        background-color: rgb(78, 225, 78);
    }
    .stop{
        background-color: rgb(205, 129, 129);
    }
    .save{
        background-color: rgba(78, 225, 78, 0.466);
    }

    select{
        margin-left: 5px;
    }
    .timer-buttons{
        margin: 30px 15px;
    }
    .timer-buttons button{
        width: 170px;
        height: 50px;
        border-radius: 10px;
        font-size: 20px;
    }
</style>