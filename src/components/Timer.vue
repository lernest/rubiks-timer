<template>
    <div>
        <h1>Timer</h1>
        <div class="timer">{{formattedTime}}</div>
        <button class="start" v-if="!isTimerRunning" @click="startTimer">Start</button>
        <button class="stop" v-else @click="stopTimer">Stop</button>
        <button @click="resetTimer">Clear</button>
        <div class="history">
            <h2>History</h2>
            <ul>
                <li v-for="time in savedTimes">{{time}}</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            elapsedTime: 0,
            duration: null,
            startTime: null,
            stopTime: null,
            isTimerRunning: false,
            savedTimes: []
        }
    },
    computed:{
        formattedTime(){
            return new Date(this.elapsedTime).toISOString().slice(14,23)
        }
    },
    created() {
        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            if(e.key == 'Backspace'){
                console.log('backspace!')
                this.resetTimer()
            }
            else if (e.key == 'Enter'){
                console.log('enter!')
                this.saveTime()
            }
            else if(e.key == ' '){
                console.log('space!')
                // Start and stop the timer when space is pressed
                if(!this.isTimerRunning){
                    this.startTimer()
                    return
                }
                else{
                    this.stopTimer()
                    return
                }
            }
        });
    },
    methods:{
        startTimer(){
            this.isTimerRunning = true;
            this.startTime = Date.now()
            this.timer = setInterval(()=>{
                // this.elapsedTime +=1;
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
        },
        saveTime(){
            this.savedTimes.push(this.formattedTime)
        }
    }
}
</script>

<style>
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
    .history li{
        border-top: 1px solid gray;
        padding: 5px;
    }

</style>