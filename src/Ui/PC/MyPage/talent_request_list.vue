<template>
    <div class="talent_request_info">
        <div class="talent_request_info_name">
            <span>{{result.name}}</span>
        </div>

        <div class="talent_request_info_say">
             <span v-html="result.requestText"></span>
        </div>

        <div class="talent_request_info_status">
            <span>{{status}}</span>
        </div>
    </div>

    
</template>

<script>
  export default {

        data() {
            return {
                list_click : false,
                status : ""
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);
            if(this.result.rs === 0) {
                this.status = "요청중";
            } else if(this.result.rs === 1) {
                this.status = "수락함";
            } else  if(this.result.rs === 99) {
                this.status = "거절함";
            } 


           
        },
        props : {
            result : ""
        },

        watch : {

        },
        mounted() {

        },

        beforeDestroy() {
        
        },
        methods: {
           
        }
    }
</script>

<style>

.talent_request_info {

    margin-right : 30px;
    margin-top : 50px;
    float: left;
    width: 220px;
    
    height: 220px;
    border : 1px solid #ced4da;
    border-radius: 5px;
    box-shadow : 0 1px 1px 1px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.talent_request_info_name {
    margin-top : 5px;
    width: 100%;
    text-align : center; 

}

.talent_request_info_name span {
    font-size : 16px;
    font-weight: 700;
}

.talent_request_info_say {
    width : 100%;
    margin-top : 35px;
    height: 70px;
    padding-left : 15px;
    padding-right : 15px;
    margin-bottom : 35px;
    
}

.talent_request_info_status {
    
    margin-top : 55px;
    width: 100%;
    padding-left : 15px;
    padding-right : 15px;
    margin-bottom : 15px;
    text-align: center
}

.talent_request_info_status span {
    font-size : 16px;
    color : blue;
}

</style>
