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
                <button class="reset" @click="resetTimer">Reset</button>
            </div>
        </div>
            
        
        <!-- Select phase to record -->
        <label for="record-phase-select">Cube:</label>
            <select v-model="recordingPhase" id="record-phase-select">
                <option value="3x3">3x3</option>
                <option value="4x4">4x4</option>
                <option value="5x5">5x5</option>
                <option value="6x6">6x6</option>
                <option value="other">other</option>
                <!-- <option value="cross">Cross</option>
                <option value="F2L">F2L</option> -->
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
            recordingPhase: '3x3'
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
        background-color: var(--primary-color);
        border-radius: 15px;
    }

    .timer{
        padding: 20px;
        font-family: var(--timer-font);
        font-size: 70px;
        border: 1px solid black;
        width: 300px;
        margin: 10px auto;
        text-align: center;
        background-color: var(--secondary-color);
    }

    /* Buttons */
    .timer-buttons{
        margin: 30px 15px;
    }
    .timer-buttons button{
        width: 170px;
        height: 50px;
        border-radius: 10px;
        font-size: 20px;
        font-family: var(--button-font)
    }
    .start{
        background-color: rgba(78, 225, 78, 0.615);
    }
    .stop{
        background-color: rgba(255, 70, 70, 0.677);
    }
    .save{
        background-color: var(--secondary-color);
        margin-right: 2px;
    }
    .reset{
        background-color: var(--secondary-color);
        margin-left: 2px;
    }

    select{
        margin-left: 5px;
    }

</style>