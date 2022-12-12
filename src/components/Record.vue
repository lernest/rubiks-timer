<template>
    <div class="history-list-item" :class="record.isfavorite ? 'favorite' : 'not-favorite'">
        <div>
            <ul class="inner-list">
                <li class="dates"> {{recordDate.toDateString()+" "+formattedTime}}</li>
                <li> {{record.phase}} </li>
                <li> {{formatDuration(record.duration)}} </li>
                <li v-if="!isEditing" class="notes"> {{record.notes}} </li>
                <li v-else><input v-model="noteInput" class="note-input" label="note-input" type="text"/></li>
                <li>
                    <button v-if="!isEditing" @click="editNote"><font-awesome-icon icon="fa-regular fa-pen-to-square" /></button>
                    <div class="note-edit-buttons" v-if="isEditing">
                        <button class="check-button" @click="updateNote"><font-awesome-icon icon="fa-regular fa-check-circle" /></button>
                        <button class="cancel-button" @click="cancelUpdate"><font-awesome-icon icon="fa-regular fa-circle-xmark" /></button>
                    </div>              
                </li>
                <li>
                    <button v-if="record.isfavorite" @click="toggleFavorite"><font-awesome-icon icon="fa-solid fa-star" /></button>
                    <button v-else @click="toggleFavorite"><font-awesome-icon icon="fa-regular fa-star" /></button>
                </li>
                <li>
                    <button @click="removeRecord"><font-awesome-icon icon="fa-regular fa-trash-can" /></button>
                </li>
            </ul>
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
            return `${date.getHours()>12 ? date.getHours()-12 : date.getHours()}:${date.getMinutes()}${date.getHours>12?"AM":"PM"}`
        }
    },
    methods:{
        editNote(){
            this.isEditing = true
        },
        updateNote(){
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

<style scoped>
    button{
        padding: 5px 5px;
        width: 35px;
        height: 35px;
    }

    .inner-list{
        padding: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 0.3fr 0.3fr 0.3fr;
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
        width: 90%;
        height: 100%
    }
    .icon{
        font-size: 20px;
    }

    .notes{
        font-size: 15px
    }

    .note-edit-buttons button{
        font-size: 18px;
        border: none;
        background-color: rgba(238, 238, 238, 0);
        margin: -5px;
    }

    .check-button{
        color: green;
    }

    .cancel-button{
        color: red;
    }

    .dates{
        font-size: 14px;
        padding: 15px 0px;
        /* text-align: left; */
    }



</style>