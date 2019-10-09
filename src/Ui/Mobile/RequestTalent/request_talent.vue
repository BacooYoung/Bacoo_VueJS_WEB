<template>
    <div class="request">

        <div class="request_title">
            <div class="request_div">

                <div class="request_meun_1" v-on:click="type_click(1)">
                    <div class="request_meun_1_img">
                        <img width="25" height="25" v-bind:src="request_meun_1" />
                    </div>
                    <span>재능 요청</span>
                </div>

                <div class="request_meun_2" v-on:click="type_click(2)">
                    <div class="request_meun_2_img">
                        <img width="25" height="25" v-bind:src="request_meun_2" />
                    </div>
                    <span>지난 요청들</span>
                </div>

            </div>
        </div>
        <div class="request_line2"></div> 

        <div class="mypage_content_div">
            <Request_Talent_List_m v-if="type == 1"/>
            <MyRequest_m v-if="type == 2"/>
        </div>
        
    
    </div>
</template>


<script>
   
    export default {
         data() {
             return {
                type : 1,
                request_meun_1 : require('../../../assets/img/sent_on.png'),
                request_meun_2 : require('../../../assets/img/list_off.png')
            }
         },

         created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            if(!localStorage.getItem('user_id')) {

                this.$router.push('/')
            }

           
        },
        methods: {
            type_click(type_number) {
                $(`.request_meun_${this.type} span`).css('color', "#7E7B7B");
                $(`.request_meun_${type_number} span`).css('color', "#F87A65");
                
                if(this.type == 1) {
                   this.request_meun_1 = require('../../../assets/img/sent_off.png');
                } else if(this.type == 2) {        
                   this.request_meun_2 = require('../../../assets/img/list_off.png');
                } 

                if(type_number == 1) {
                   this.request_meun_1 = require('../../../assets/img/sent_on.png');  
                } else if(type_number == 2) {
                   this.request_meun_2 = require('../../../assets/img/list_on.png');
                } 

                this.type = type_number

               
            }
        }
    }
</script>

<style>

</style>


<style scoped>


.request{
    
    width: 100%;
    height : 1700px;
    margin: 0 auto;
    margin-top : 80px;

    font-family: "Noto Sans KR","Apple Gothic","돋움",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
}

.request_line {
    margin-top : 5px;
    width:80px;
    height: 2px;
    background-color : black;
    
    position: absolute;
    z-index: 2;
}

.request_line2 {
    
    margin-top : 5px;
    width: 100%;
    height: 2px;
    background-color : #ced4da;
    
    position: absolute;
    z-index: 1;
}


.request_div {
    width: 100%;
    
    margin: 0 auto;
    height: 60px;
}



.request_meun_1 {
    float: left;
    width : 50%;
    height: 80px;
    text-align : center;
    cursor: pointer;
    color : #F87A65;
}

.request_meun_1 span {
    font-size : 13px;
    font-weight: 500;
}


.request_meun_1_img {
    width: 100%;
    height: 25px;
    margin-bottom : 7px;
}

.request_meun_2 {
    float: left;
    width : 50%;
    height: 80px;
    text-align : center;
    cursor: pointer;
}

.request_meun_2 span {
    font-size : 13px;
    font-weight: 500;
    color : #7E7B7B;
}


.request_meun_2_img {
    width: 100%;
    height: 25px;
    margin-bottom : 7px;
}

.mypage_content_div {
    width: 100%;
    
    margin: 0 auto;
}


</style>

