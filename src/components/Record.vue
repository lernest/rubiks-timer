<template>
    <div class="history-list-item" :class="record.isfavorite ? 'favorite' : 'not-favorite'">

        <div>
            <ul class="inner-list">
                <!-- <li> id: {{record.id}} </li> -->
                <li> {{record.phase}} </li>
                <!-- <li> {{record.time}} </li> -->
                <li> {{recordDate.toDateString()+" "+formattedTime}}</li>
                <li> {{formatDuration(record.duration)}} </li>
                <li> {{record.notes}} </li>
                <!-- <li> is favorite: {{record.isfavorite}} </li> -->
            </ul>
        </div>
        <div>
            <button v-if="!isEditing" @click="editNote">Edit Note</button>
            <div v-if="isEditing">
                <input v-model="noteInput" class="note-input" label="note-input" type="text">
            </div>
            <div v-if="isEditing">
                <button @click="updateNote">Submit</button>
                <button @click="cancelUpdate">Cancel</button>
            </div>
        </div>
        <div>
            <button v-if="record.isfavorite" @click="toggleFavorite">Unfavorite</button>
            <button v-else @click="toggleFavorite">Favorite</button>
        </div>
        <div>
            <button @click="removeRecord">Remove</button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        record: Object
    },
    data(){
        return{
            isEditing: false,
            noteInput: ''
        }
    },
    computed:{
        recordDate(){
            console.log(new Date(Date.parse(this.record.time)))
            return new Date(Date.parse(this.record.time))
        },
        formattedTime(){
            let date = this.recordDate
            return `${date.getHours()>12 ? date.getHours()-12 : date.getHours()}:${date.getMinutes()}${date.getHours>12?"PM":"AM"}`
        }
    },
    methods:{
        editNote(){
            this.isEditing = true
        },
        updateNote(){
            console.log(`Record.vue: updateNote():  ${this.note}`)
            let updatedNote = {
                record_id: this.record.id,
                note: this.noteInput,
            }

            this.$emit('updateNote',updatedNote)

            this.noteInput = ''
            this.isEditing = false
        },
        toggleFavorite(){
            this.$emit('toggleFavorite',this.record.id)
        },
        removeRecord(){
            this.$emit('removeRecord',this.record.id)
        },
        formatDuration(duration){
            let formatted = ""

            // Minutes - Longer than one minute
            if(!duration.minutes){
                formatted += '00:'
            }
            else if(duration.minutes < 10){
                formatted += '0'+duration.minutes+':'
            }
            else if(duration.minutes < 10){
                formatted += duration.minutes + ':'
            }

            // Seconds - Less than one second
            if(!duration.seconds){
                formatted += '00.'
            }
            // Seconds - Less than ten seconds, pad with one zero
            else if(duration.seconds < 10){
                formatted += '0'+duration.seconds+'.'
            }
            // Seconds - At least ten seconds, no need to pad
            else if(duration.seconds >= 10){
                formatted += duration.seconds+'.'
            }

            // Milliseconds - Zero, pad with 3
            if(!duration.milliseconds || duration.milliseconds == 0){
                formatted += '000'
            }
            // Milliseconds - Less than 10, pad with two zeros
            else if(duration.milliseconds < 10){
                formatted += '00'+duration.milliseconds
            }
            // Milliseconds - Less than 100, pad with one zero
            else if(duration.milliseconds < 100){
                formatted += '0'+duration.milliseconds
            }
            // Milliseconds - In the hundreds, no need to pad
            else if(duration.milliseconds >= 100){
                formatted += duration.milliseconds
            }

            return formatted
        },
        cancelUpdate(){
            this.noteInput = ''
            this.isEditing = false
        }
    }
}
</script>

<style>
    button{
        padding: 10px 10px;
    }
    .inner-list{
        padding: 5px;
    }

    .history-list-item{
        display: grid;
        grid-template-columns: 64% 12% 12% 12%;
        border-bottom: 1px solid gray;
        align-items: center;
    }
    .favorite{
        background-color: rgb(255, 255, 221);
    }
    .not-favorite{
        color: black;
    }
    .note-input{
        width: 100%;
    }
</style>