<template>
    <div>
        <h1>Full Cube</h1>
        <p>Press <span>S</span> to start and stop the timer.
            Press <span>D</span> to clear the timer. 
            Press <span>SHIFT + S</span> to save the time to your history.
        </p>
        <Timer />
    </div>
</template>

<script>
import Timer from '../components/Timer.vue'
export default {
    components:{
        Timer
    }

}
</script>

<style>
    span{
        font-size: 20px;
        font-family: monospace;
        color: rgb(48, 0, 0)
    }
</style>