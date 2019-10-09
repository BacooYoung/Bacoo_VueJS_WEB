<template>
    <div class="mypage">

        <div class="mypage_title">

            <div class="mypage_div">
                <div class="mypage_meun_1" v-on:click="type_click(1)">
                    <div class="mypage_meun_1_top">
                        <span>2</span>
                    </div>
                    <div class="mypage_meun_1_img">
                        <img width="35" height="35" v-bind:src="mypage_meun_1_img"/>
                    </div>
                    <span>내 프로필</span>
                </div>

                <div class="mypage_meun_4" v-on:click="type_click(4)">
                    <div class="mypage_meun_4_top">
                        <span>2</span>
                    </div>
                    <div class="mypage_meun_4_img">
                        <img width="35" height="35"  v-bind:src="mypage_meun_4_img"/>
                    </div>
                    <span>보낸 요청</span>
                </div>


                <div class="mypage_meun_3" v-on:click="type_click(3)">
                    <div class="mypage_meun_3_top" >
                        <span id="bridge"  v-if="bridge_meun_3 > 0">{{bridge_meun_3}}</span>
                    </div>
                    <div class="mypage_meun_3_img">
                        <img width="35" height="35"  v-bind:src="mypage_meun_3_img"/>
                    </div>
                    <span>받은 요청</span>
                </div>

                
                <div class="mypage_meun_5" v-on:click="type_click(5)">
                    <div class="mypage_meun_5_top">
                        <span id="bridget" v-if="bridge_meun_4 > 0">{{bridge_meun_4}}</span>
                    </div>
                    <div class="mypage_meun_5_img">
                        <img width="35" height="35"  v-bind:src="mypage_meun_5_img"/>
                    </div>
                    <span>재능 교환중</span>
                </div>

            </div>

            <div class="mypage_content_div">
                
                <MyProfile v-if="type == 1"/>
                <InputRequest v-if="type == 3" />
                <TalentRequest v-if="type == 4" />
                <MatchedTalent v-if="type == 5" :bridge = "bridge_meun_4_list"/>
            </div>

            
        </div>

    
    </div>
</template>


<script>
    import {Server_IP} from '../../../server/serverIP'

    export default {
        data() {
            return {
                bridge_meun_3 : 0,
                bridge_meun_4 : 0,
                bridge_meun_4_list : [],
                type : 1,
                mypage_meun_1_img : require('../../../assets/img/user_on.png'),
                mypage_meun_3_img :  require('../../../assets/img/receiv_off.png'),
                mypage_meun_4_img :  require('../../../assets/img/sending_off.png'),
                mypage_meun_5_img :  require('../../../assets/img/exchange_off.png')
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);
            /*

            <span id="type1" v-on:click="type_click(1)">내 프로필</span>
            <span id="type2" v-on:click="type_click(2)">나의 요청</span>            
            <span id="type3" v-on:click="type_click(3)">받은 요청</span>
            <span id="type4" v-on:click="type_click(4)">재능 교환중</span>

            
        
        
            */

            if(!localStorage.getItem('user_id')) {

                this.$router.push('/')
            }

            this.$http.get(`${Server_IP}/bridge/${localStorage.getItem('user_id')}`,{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if(data.status == 0) {
                            this.bridge_meun_3 = data.result.request_count[0].count;
                            this.bridge_meun_4 = data.result.message_count.length;
                            this.bridge_meun_4_list = data.result.message_count;
                        } else if(data.status == 1) {
                            alert("서버 오류");
                        } 
                        else {

                        }
                    }, error => {
                        console.log(error);
                    });

           
        },
        watch : {
        },
        mounted() {
         
                $('#bridge').css('color', "#ffffff");
        },

        beforeDestroy() {
        
        },
        methods: {
            type_click(type_number) {
                $(`.mypage_meun_${this.type} span`).css('color', "#7E7B7B");
                $(`.mypage_meun_${type_number} span`).css('color', "#F87A65");
                $('#bridge').css('color', "#ffffff");
                $('#bridget').css('color', "#ffffff");
                
                
                if(this.type == 1) {
                   this.mypage_meun_1_img =  require('../../../assets/img/user_off.png');  
                } else if(this.type == 3) {
                    
                   this.mypage_meun_3_img =  require('../../../assets/img/receiv_off.png');  
                } else if(this.type == 4) {
                    
                   this.mypage_meun_4_img =  require('../../../assets/img/sending_off.png');  
                } else if(this.type == 5) {
                    
                   this.mypage_meun_5_img =  require('../../../assets/img/exchange_off.png');  
                }

                if(type_number == 1) {
                   this.mypage_meun_1_img =  require('../../../assets/img/user_on.png'); 
                } else if(type_number == 3) {
                   this.mypage_meun_3_img =  require('../../../assets/img/receiv_on.png');  
                } else if(type_number == 4) {
                   this.mypage_meun_4_img =  require('../../../assets/img/sending_on.png');  
                } else if(type_number == 5) {
                   this.mypage_meun_5_img =  require('../../../assets/img/exchange_on.png');  
                }   

                


                this.type = type_number

               
            }
        }
    }
</script>


<style>


.mypage{
    
    width : 1280px;
    height : auto;
    margin: 0 auto;
    margin-top : 60px;

    font-family: "Noto Sans KR","Apple Gothic","돋움",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
}



.mypage_title {
    width : 1280px;
    height: 120px;
    border-bottom : 2px solid #A39696;
}


.mypage_content_div {
    width: 1024px;
    
    margin: 0 auto;
}

.mypage_div {
    width: 625px;
    
    margin: 0 auto;
    height: 100px;
}



.mypage_meun_1 {
    float: left;
    width : 156px;
    height: 80px;
    text-align : center;
    line-height : 70px;
    cursor: pointer;
    color : #F87A65;
}

.mypage_meun_1 span {
    font-size : 16px;
    font-weight: 500;
}


.mypage_meun_1_img {
    width: 100%;
    height: 35px;
    margin-bottom : 7px;
}


.mypage_meun_3 {
    float: left;
    width : 156px;
    height: 80px;
    text-align : center;
    line-height : 70px;
    cursor: pointer;
}

.mypage_meun_3 span {
    font-size : 16px;
    font-weight: 500;
    color : #7E7B7B;
}

.mypage_meun_3_img {
    width: 100%;
    height: 35px;
    margin-bottom : 7px;
}

.mypage_meun_4 {
    float: left;
    width : 156px;
    height: 80px;
    text-align : center;
    line-height : 70px;
    cursor: pointer;
}

.mypage_meun_4 span {
    font-size : 16px;
    font-weight: 500;
    color : #7E7B7B;
}

.mypage_meun_4_img {
    width: 100%;
    height: 35px;
    margin-bottom : 7px;
}

.mypage_meun_5 {
    float: left;
    width : 156px;
    height: 80px;
    text-align : center;
    line-height : 70px;
    cursor: pointer;
}

.mypage_meun_5 span {
    font-size : 16px;
    font-weight: 500;
    color : #7E7B7B;
}

.mypage_meun_5_img {
    width: 100%;
    height: 35px;
    margin-bottom : 7px;
}



.mypage_meun_4_top {
    
    visibility: hidden;
    width: 120px;
    height: 5px;
    text-align : right;
    position: relative;
    z-index: 10;
}

.mypage_meun_4_top span {
    border-radius : 15px;
    font-size : 12px;
    color : #ffffff;
    padding-left : 5px;
    padding-right : 5px;
    background-color : red;
}

.mypage_meun_1_top {
    
    visibility: hidden;
    width: 120px;
    height: 5px;
    text-align : right;
    position: relative;
    z-index: 10;
}

.mypage_meun_1_top span {
    border-radius : 15px;
    font-size : 12px;
    color : #ffffff;
    padding-left : 5px;
    padding-right : 5px;
    background-color : red;
}

.mypage_meun_3_top {
    
    width: 120px;
    height: 5px;
    text-align : right;
    position: relative;
    z-index: 10;
}

.mypage_meun_3_top span {
    border-radius : 15px;
    font-size : 12px;
    color : #ffffff;
    padding-left : 5px;
    padding-right : 5px;
    background-color : red;
}

.mypage_meun_5_top {
    
    width: 120px;
    height: 5px;
    text-align : right;
    position: relative;
    z-index: 10;
}

.mypage_meun_5_top span {
    border-radius : 15px;
    font-size : 12px;
    color : #ffffff;
    padding-left : 5px;
    padding-right : 5px;
    background-color : red;
}

#bridge {
    color : #ffffff;
}
</style>

