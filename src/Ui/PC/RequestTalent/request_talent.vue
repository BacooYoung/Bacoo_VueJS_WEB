<template>
    <div class="request">

        <div class="request_title">
            <div class="mypage_div">
                <div class="request_meun_1" v-on:click="type_click(1)">
                    <div class="request_meun_1_img">
                        <img width="35" height="35" v-bind:src="request_meun_1" />
                    </div>
                    <span>재능 요청</span>
                </div>

                <div class="request_meun_2" v-on:click="type_click(2)">
                    <div class="request_meun_2_img">
                        <img width="35" height="35" v-bind:src="request_meun_2"/>
                    </div>
                    <span>지난 요청들</span>
                </div>

            </div>
        </div>

        <div class="mypage_content_div">
            <Request_Talent_List v-if="type == 1"/>
            <MyRequest v-if="type == 2"/>
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

                this.$router.push('/');
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
    
    width: 1024px;
    height : auto;
    margin: 0 auto;
    margin-top : 80px;
    margin-bottom : 100px;
    font-family: "Noto Sans KR","Apple Gothic","돋움",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
}


.request_meun_1 {
    float: left;
    width : 50%;
    height: 80px;
    text-align : center;
    line-height : 70px;
    cursor: pointer;
    color : #F87A65;
}

.request_meun_1 span {
    font-size : 16px;
    font-weight: 500;
}


.request_meun_1_img {
    width: 100%;
    height: 35px;
    margin-bottom : 7px;
}

.mypage_content_div {
    width: 1024px;
    
    margin: 0 auto;
}


.request_meun_2 {
    float: left;
    width : 50%;
    height: 80px;
    text-align : center;
    line-height : 70px;
    cursor: pointer;
}

.request_meun_2 span {
    font-size : 16px;
    font-weight: 500;
    color : #7E7B7B;
}


.request_meun_2_img {
    width: 100%;
    height: 35px;
    margin-bottom : 7px;
}


.request_title {
    width : 1028px;
    height: 100px;
    border-bottom : 2px solid #A39696;
}

.request_title span {
    font-size : 16px;
    font-weight: 500;
}






</style>

