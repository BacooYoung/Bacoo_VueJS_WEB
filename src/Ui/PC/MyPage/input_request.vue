<template>

    <div class="input_request_info">


        <clip-loader v-if="check == false && nodata == false" ></clip-loader>
        <InputRequest_List v-if="check" v-for="(results,index) in result" :key ="results.talentlistId" :index="index" v-bind:result="results"/>
        <Detail_Talent v-if="list_click" v-bind:result="result_data" :typed = "typed" />




        <div v-if="nodata == true">
            <span>받은 요청이 없습니다.</span>
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
                typed : "input"
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            this.$EventBus.$on('add_input_detail_open', this.list_open);
            this.$EventBus.$on('add_input_detail_exit', this.list_exit);
            
            var userId =  localStorage.getItem('user_id');
          
            this.$http.get(`${Server_IP}/request/talent/${userId}`,{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        this.result = data.result;
                        this.check = true
                    } else if(data.status == 1) {
                        this.nodata =true;
                    } else {
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
        methods: {
            list_open(data) {
                
                this.result_data = data.result_list;
                this.list_click = true;
            },
            list_exit() {
                this.list_click = false;
            }
        }
    }
</script>

<style>

.input_request_info {
    margin-top: 20px;
    width: 1024px;
    float: left;
    margin-bottom: 100px;
   
}

</style>
