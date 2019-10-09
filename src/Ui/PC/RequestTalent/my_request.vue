<template>

    <div class="my_request_info">

        <clip-loader v-if="check == false && nodata == false" ></clip-loader>
        <MyRequestList v-if="check" v-for="(results,index) in result" :key ="results.talentlistId" :index="index" v-bind:result="results"/>
        <Detail_Talent v-if="list_click" v-bind:result="result_data"  :indexs="indexs" :typed = "typed"/>

        <div v-if="nodata == true">
            <span>요청 기록이 없습니다.</span>
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
                result_data : [],
                nodata : false,
                indexs : 0,
                typed : "my"
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);
            
            var userId =  localStorage.getItem('user_id');
          
            this.$http.get(`${Server_IP}/request/talent/my/${userId}`,{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        
                        this.result = data.result;
                        this.check = true
                        this.nodata = false;
                    } else {
                        this.result = [];
                        this.check = false;
                        this.nodata = true;
                    }
                }, error => {
                    console.log(error);
                });


           this.$EventBus.$on('add_detail_open', this.list_open);
           this.$EventBus.$on('add_detail_exit', this.list_exit);

           this.$EventBus.$on('delete_edit', this.handleClose);
           

           
        },
        watch : {

        },
        mounted() {
           },

        beforeDestroy() {
        
        },
        methods: {
            handleClose(indexs) {

                //this.result.splice(indexs, 1);


                
                
            },
            list_open(data) {
                this.result_data = data.result_list;
                this.list_click = true;
                this.indexs = data.indexId;
            },
            list_exit() {
                this.list_click = false;
            }
        }
    }
</script>

<style>

.my_request_info {
    margin-top: 20px;
    width: 1024px;
    margin-bottom : 100px;
    float: left;
   
}

</style>
