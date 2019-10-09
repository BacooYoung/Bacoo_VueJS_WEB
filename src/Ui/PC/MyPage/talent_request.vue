<template>

    <div class="list_request_info">


        <clip-loader v-if="check == false && nodata == false" ></clip-loader>
        <TalentRequestList v-if="check" v-for="(results,index) in result" :key ="index" v-bind:result="results"/>
        
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
                nodata : false
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);
            
            var userId =  localStorage.getItem('user_id');
          
            this.$http.get(`${Server_IP}/talent/request/${userId}`,{
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
        methods: {
            list_open() {
                this.list_click = !this.list_click;
            }
        }
    }
</script>

<style>

.list_request_info {
    margin-top: 20px;
    width: 1024px;
    float: left;
    position: absolute;
    height: auto;
    margin-bottom: 100px;
   
}

</style>
