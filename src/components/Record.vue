<template>
    <div class="history-list-item" :class="record.isfavorite ? 'favorite' : 'not-favorite'">
        <div>
            <ul class="inner-list">
                <li class="dates"> {{recordDate.toDateString()+" "+formattedTime}}</li>
                <li> {{record.phase}} </li>
                <li> {{formatDuration(record.duration)}} </li>
                <li class="note-li">
                    <div v-if="!isEditing" class="notes"> <span class="empty-note" v-if="record.notes==''">no notes</span><span v-else>{{record.notes}}</span></div>
                    <div v-else>
                        <input v-model="noteInput" label="note-input" type="text"/>
                        <div class="note-edit-buttons">
                                    <button class="check-button" @click="updateNote"><font-awesome-icon icon="fa-regular fa-check-circle" /></button>
                                    <button class="cancel-button" @click="cancelUpdate"><font-awesome-icon icon="fa-regular fa-circle-xmark" /></button>
                        </div>   
                    </div>
                </li>
                
                <li> 
                    <ul>
                        <li>
                            <button v-if="record.isfavorite" @click="toggleFavorite" class="solid-star"><font-awesome-icon icon="fa-solid fa-star" /></button>
                            <button v-else @click="toggleFavorite"><font-awesome-icon icon="fa-regular fa-star" /></button>
                        </li>
                        <li>
                            <button v-if="!isEditing" @click="editNote"><font-awesome-icon icon="fa-regular fa-pen-to-square" /></button>
                            <button v-else @click="cancelUpdate"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>           
                        </li>
                        <li>
                            <button @click="removeRecord"><font-awesome-icon icon="fa-regular fa-trash-can" /></button>
                        </li>
                    </ul> 
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
            // console.log(new Date(Date.parse(this.record.time)))
            return new Date(Date.parse(this.record.time))
        },
        formattedTime(){

            let date = this.recordDate

            // pad minutes with 0 if less than 10
            let minutes = (date.getMinutes() < 10)?'0'+date.getMinutes():date.getMinutes()

            // convert to 12 hour time
            let hours = date.getHours()==0?'12':(date.getHours()>12 ? date.getHours()-12 : date.getHours())
            let amOrPm = date.getHours()<12?"AM":"PM"
            
            return `${hours}:${minutes}${amOrPm}`
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

    @media(max-width: 1400px){
        .inner-list{
            flex-direction: column
        }
        .inner-list ul{
            display: flex;
            padding: 10px
        }
    }


    button{
        padding: 5px 5px;
        width: 35px;
        height: 35px;
    }

    .inner-list{
        font-family: Avenir, Helvetica, Arial, sans-serif;
        padding: 10px;
        /* display: grid; */
        /* grid-template-columns: 1fr 1fr 1fr 1fr 0.3fr 0.3fr 0.3fr; */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-bottom: 1px solid gray;
        align-items: center;
    }
    .solid-star{
        color: rgba(0, 0, 0, 0.552);
    }

    .not-favorite{
        color: black;
    }

    .icon{
        font-size: 20px;
    }

    .notes{
        font-size: 15px
    }

    .note-edit-buttons button{
        font-size: 24px;
        border: none;
        background-color: rgba(238, 238, 238, 0);
        margin: -2px;
        margin-top: 0px;
        position: flex;
    }

    .check-button{
        color: green;
    }

    .cancel-button{
        color: red;
    }

    .dates{
        font-size: 14px;
        /* padding: 15px 0px; */
        /* text-align: left; */
    }

    .note-li{
        flex-basis: 22%
    }

    .empty-note{
        color: rgba(0, 0, 0, 0.29)
    }


</style>