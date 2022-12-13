<template>
    <div>
        <!-- Display historical times fetched from database -->
        <div class="history">
            <div class="history-header">
                <h1>History</h1>
                <div class="filter-and-sort">
                    <!-- Filter -->
                    <div class="select">
                        <label for="history-filter-select">Filter:</label>
                        <select v-model="filterBy" id="history-filter-select">
                            <option value="all">All</option>
                            <option value="favorites">Favorites</option>
                            <option value="3x3">3x3</option>
                            <option value="4x4">4x4</option>
                            <option value="5x5">5x5</option>
                            <option value="6x6">6x6</option>
                        </select>
                    </div>

                    <!-- Sort -->
                    <div class="select">
                        <label for="history-sort-select">Sort:</label>
                        <select v-model="sortBy" id="history-sort-select">
                            <option value="most recent">Most recent</option>
                            <option value="least recent">Least recent</option>
                            <option value="fastest">Fastest</option>
                            <option value="slowest">Slowest</option>
                        </select>
                    </div>
                </div>
                
            </div>
            
            <!-- Display sorted and filtered history  -->
            <ul class="records">
                <li v-for="record in recordPage">
                    <Record :record=record @removeRecord="removeRecord" @toggleFavorite="toggleFavorite" @updateNote="updateNote"/>
                </li>
            </ul>
            <div class="empty-message" v-if="sortedHistory.length==0">No records to display</div>

            <!-- Pagination -->
            <ul v-if="pages.length>1" class="pages">
                <!-- <li v-if="currPage > 2"><button @click="setPage(1)"> {{'<<'}} </button></li> -->
                <!-- <li v-if="currPage > 1"><button @click="setPage(currPage-1)"> {{'<'}} </button></li> -->
                <li v-for="page in pages"><button :class="page == currPage ? 'currentPage' : ''" @click="setPage(page)">{{page}}</button></li>
                <!-- <li v-if="currPage < pages.length"><button @click="setPage(currPage+1)"> {{'>'}} </button></li> -->
                <!-- <li v-if="currPage < pages.length-1"><button @click="setPage(pages.length)"> {{'>>'}} </button></li> -->
            </ul>

            <!-- Page size  -->
            <div class="pageSizeSelect">
                <label for="select-num-per-page">Records per page</label>
                <select v-model="numPerPage" id="select-num-per-page">
                    <option value=5>5</option>
                    <option value=10>10</option>
                    <option value=15>15</option>
                    <option value=20>20</option>
                </select>
            </div>

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
            records: [],
            filterBy: 'all',
            sortBy: 'most recent',
            numPerPage: 5,
            currPage: 1
        }
    },
    mounted(){
        this.getTimes()
    },
    computed:{
        recordPage(){
            let startIndex = (this.currPage-1) * parseInt(this.numPerPage)
            return this.sortedHistory.slice(startIndex,startIndex + parseInt(this.numPerPage) )
        },
        sortedHistory(){
            return this.filteredHistory.sort(this.compareRecords)
        },
        filteredHistory(){
            if(this.filterBy == 'all'){
                return this.records
            }if(this.filterBy == 'favorites'){
                return this.records.filter(x => x.isfavorite)
            }

            return this.records.filter(x => x.phase == this.filterBy)
        },
        pages(){
            if((this.currPage-1) * this.numPerPage > this.sortedHistory.length){
                this.currPage = 1
            }
            let numPages = Math.ceil(this.sortedHistory.length / this.numPerPage)

            // The pages array should have i+1 in each cell
            // ex. [1,2,3,4,5]
            let pagesArr = []
            for(let i=0; i<numPages; i++){
                pagesArr.push(i+1)
            }

            return pagesArr
        },
        chartData(){
            this.records.map(x=>{
                                    x.duration = this.getSeconds(x.duration)
                                    x.timestamp = Date.parse(x.time)
                                    return x
                                })
        }
    },
    methods:{
        setPage(page){
            this.currPage = page
        },
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
        getSeconds(observer){
            return (observer.hours?observer.hours*60*60:0) + (observer.minutes?observer.minutes*60:0) + (observer.seconds?observer.seconds:0) + observer.milliseconds/1000
        },
        getTimes(){
            axios.get('http://localhost:3000/rubiks').then(res => {
                this.records = res.data
                // console.log(this.records[0].duration)
                // console.log(this.getSeconds(this.records[0].duration))
            }).catch(e => {
                console.log(e)
            })
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
        }
    }
}
</script>

<style>
    /* @media(min-width: 2000px){
        .history{
            max-width: 1000px;
        }
    } */

    @media(max-width: 1000px){
        .filter-and-sort{
            display: flex;
            flex-direction: column;
        }
    }

    .history{
        /* border: 1px solid black; */
        width: 50%;
        max-width: 800px;
        min-width: 300px;
        margin: auto;
        /* margin-top: 40px; */
        background-color: var(--primary-color);
        border-radius: 15px;
        padding: 0px 10px 5px 5px;
    }

    .history h1{
        margin: 20px;
        padding-top: 30px;
    }

    .history-header{
        border-bottom: 1px solid black;
        padding-bottom: 10px;
    }
    .select{
        margin: 2px 10px;
        display: inline;
    }
    .pages{
        display: flex;
        justify-content: flex-end;
        margin: 5px;
    }

    .pageSizeSelect{
        display: flex;
        justify-content: flex-end;
        font-size: 13px;
        margin: 5px
    }
    .pageSizeSelect select{
        padding: 0px;
        font-size: 13px;
    }

    .pages button{
        padding: 2px;
        width: 20px;
        height: 30px;
        margin: 3px;
        /* background-color: rgba(0, 0, 0, 0); */
        border: 1px solid rgba(0, 0, 0, 0.452);
    }

    .currentPage{
        border: 1px solid black;
        background-color: rgba(0, 0, 0, 0.44);
    }

    .empty-message{
        margin-top: 20px;
    }
</style>