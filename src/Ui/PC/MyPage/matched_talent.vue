<template>

    <div class="matched_talent_info">


        <clip-loader v-if="check == false && nodata == false" ></clip-loader>
        <MatchedTalentList v-if="check" v-for="(results,index) in result" :key ="index" v-bind:result="results" :bridge = "bridge"/>
        <Message v-if="message" :name={name} :myId = {myId}  :youId = {youId} />
        <Add_Memo v-if="memo"  :datas = {memo_list} />

        <div v-if="nodata == true">
            <span>검색결과 없음</span>
        </div>
    </div>

    
</template>

<script>
    import {Server_IP} from '../../../server/serverIP'
    export default {

        data() {
            return {
                list_click : false,
                result : [],
                check : false,
                nodata : false,
                message : false,
                myId : 0,
                youId : 0,
                memo : false,
                matchedId : 0,
                memo_list : {
                    matchedId : 0,
                    memo : ""
                },
                name : ""

            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            this.$EventBus.$on('open_message', this.open_message);
            this.$EventBus.$on('open_memo', this.open_memo);
            this.$EventBus.$on('message_exit', this.exit_message);
            this.$EventBus.$on('memo_exit', this.exit_memo);
            
            
            
            var userId =  localStorage.getItem('user_id');
          
            this.$http.get(`${Server_IP}/talent/matched/${userId}`,{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        this.result = data.result;
                        this.check = true;

                        
                    } else if(data.status == 1) {
                        this.nodata =true;
                    } 
                    else {
                        this.result = [];
                        this.check = false;
                    }
                }, error => {
                    console.log(error);
                });

           
        },
        watch : {

        },
        mounted() {
           },

        beforeDestroy() {
        
        },

        props : {
            bridge : ""
        },
        methods: {
            list_open() {
                this.list_click = !this.list_click;
            },

            open_message(data) {
                this.message = true;
                this.myId = data.myId;
                this.youId = data.youId;
                this.name = data.name;
            },

            open_memo(data) {
                this.memo = true;
                this.memo_list.matchedId = data.matchedId;
                if(!data.notcm) {
                    this.memo_list.memo = data.comment;
                } else {
                    this.memo_list.memo = "";
                }
            },

            exit_message(data) {
                this.message = false;
            },
            exit_memo(data) {
                this.memo = false;
                this.$EventBus.$emit('memo_reload', {comment: data.memo, matchedId : data.matchedId});
                
                
            }
        }
    }
</script>

<style>

.matched_talent_info {
    position: absolute;
    margin-top: 20px;
    width: 1024px;
    height: auto;
    float: left;
    margin-bottom: 100px;
   
}

</style>
