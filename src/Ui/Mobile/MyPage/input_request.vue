<template>

    <div class="input_request_info">

        <clip-loader v-if="check == false && nodata == false" ></clip-loader>
        
        <InputRequest_List_m v-if="check" v-for="(results,index) in result" :key ="index" v-bind:result="results"/>

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
                nodata : false
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);
            
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
                    } else {
                        this.result = [];
                        this.check = false;
                        this.nodata =true;
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
            list_open() {
                this.list_click = !this.list_click;
            }
        }
    }
</script>

<style>

.input_request_info {
    margin-top: 20px;
    width: 100%;
    float: left;
   
}

</style>
