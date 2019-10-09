
<template>



 <div class="main">

     

     
        <div class="header-content">
            

            <img width="100%" height="100%" src="https://i.imgur.com/xcuRez4.png"/>

        </div>        

      
      
        

          <div class="main-recommend">
            <div class="main-recomment-title" style="margin-left: -60px;">
                <span>온라인으로 배워보세요</span>
                <div class="main-recomment-title-sub">
                    <span>온라인클래스 더보기 +</span>
                </div>
            </div>
          </div>

          <div class="main-recomment-dvi" >
            <div class="main-recomment-content" @click="recomment_go('언어')">
                    <div class="main-recomment-content-img">
                        <img src = "https://i.imgur.com/141Q7f8.jpg"/>
                    </div>

                    <div class="main-recomment-content-text">
                        <span>언어</span>
                    </div>

                    <div class="main-recomment-content-text-sub">
                        <span>자신의 스타일에 맞게 언어를<br></span>
                        <span>배워보세요.</span>
                    </div>
            </div>

            <div class="main-recomment-content" @click="recomment_go('코딩')">
                    <div class="main-recomment-content-img">
                        <img src = "https://i.imgur.com/3tpIs9q.jpg"/>
                    </div>

                    <div class="main-recomment-content-text">
                        <span>코딩</span>
                    </div>

                    <div class="main-recomment-content-text-sub">
                        <span>어렵기만 했던 코딩을 1:1 수업으로 쉽게 배워보세요!</span>
                    </div>
            </div>

            <div class="main-recomment-content" @click="recomment_go('디자인')">
                    <div class="main-recomment-content-img">
                        <img src = "https://i.imgur.com/rw3HHo9.jpg"/>
                    </div>

                    <div class="main-recomment-content-text">
                        <span>디자인</span>
                    </div>

                    <div class="main-recomment-content-text-sub">
                        <span>로고/포스터,<br/>이제 스스로 만들어 보세요!</span>
                    </div>
            </div>

            <div class="main-recomment-content" @click="recomment_go('운동')">
                    <div class="main-recomment-content-img">
                        <img src = "https://i.imgur.com/HCvAObH.jpg"/>
                    </div>

                    <div class="main-recomment-content-text">
                        <span>운동</span>
                    </div>

                    <div class="main-recomment-content-text-sub">
                        <span>비싸서 못했던 개인 PT를<br/>무료로 배워보세요!</span>
                    </div>
            </div>
          </div>


        <div class="main-appad">
            <div class="main-appad-div">

                <img src = "https://i.imgur.com/xcuRez4.png"/>
                <div @click="appgo('ios')" class="main-appad-ios"></div>
                <div @click="appgo('android')" class="main-appad-android"></div>
            </div>
        </div>

          <div class="main-recommend-new-dvi" >

            <div class="main-recommend-new-dvi-content" >
                <div class="main-recommend-new-dvi-content-title" >
                    <span>신규 재능</span>
                    <div class="main-recommend-new-dvi-content-title-more" @click="recomment_go('new')"><span >더 보기</span></div>
                </div>

                <div class="main-recommend-new-dvi-content-list">
                    
                    <div class="main-recommend-new-dvi-content-lists" @click="recomment_go_byId(results.talentlistId)" v-for="(results,index) in main_new_list" :key ="index"> 
                        <div class="test">
                            <div class="main-recommend-new-dvi-content-lists-title">
                                <span>{{results.title}}</span>
                            </div>
                            <div class="main-recommend-new-dvi-content-lists-title2">
                                <span><my-component :date="results.insertTime"/></span>
                            </div>
                        </div>
                        

                        <div class="main-recommend-new-dvi-content-lists-talents"> 
                            <span style="color : blue; font-size : 14px;  font-weight : 400;">{{results.hadTalent}}</span>
                            <span style="color : #3d3d3d; font-size : 14px; font-weight : 500; margin-left :10px;"> 가르쳐 드리고</span>
                            <span style="color : blue; font-size : 14px; margin-left :10px; font-weight : 400;">{{results.wantTalent}}</span>
                            <span style="color : #3d3d3d; font-size : 14px; font-weight : 500;margin-left :10px;"> 배우고 싶습니다.</span>
                        </div>
                    </div>
                     




                </div>

                

            </div>

            <div class="main-recommend-request-dvi-content" >
                <div class="main-recommend-request-dvi-content-title" @click="recomment_go('recommend')">
                    <span>맞춤 재능</span>
                </div>

                <div class="main-recommend-request-dvi-content-nodata" v-if="main_request_status === 10">
                    <span>재능요청을 받기위해선 최초 1회 재능요청이 필요합니다.</span>
                    <div class="main-recommend-request-dvi-content-nodata-btn" @click="gorequest"><span>재능요청 하러가기</span></div>
                </div>
                <div class="main-recommend-request-dvi-content-fail" v-if="main_request_status === 20">
                    <span>원하시는 재능에 대한 추천 데이터가 없습니다. </span>
                </div>

                <div class="main-recommend-request-dvi-content-fail" v-if="!login_check">
                    <span>로그인이 필요한 서비스 입니다.</span>
                </div>

                <div class="main-recommend-request-dvi-content-list" v-if="main_request_status === 0 && login_check">
                    
                    <div class="main-recommend-request-dvi-content-lists"  @click="recomment_go_byId(results.talentlistId)" v-for="(results,index) in main_request_list" :key ="index"> 
                        <div class="main-recommend-request-dvi-content-lists-title">
                            <span>{{results.name}}</span>
                        </div>

                        <div class="main-recommend-request-dvi-content-lists-talents"> 
                            <span style="color : blue; font-size : 14px;  font-weight : 400;">{{results.hadTalent}}</span>
                            <span style="color : #3d3d3d; font-size : 14px; font-weight : 500; margin-left :10px;"> 가르쳐 드리고</span>
                            <span style="color : blue; font-size : 14px; margin-left :10px; font-weight : 400;">{{results.wantTalent}}</span>
                            <span style="color : #3d3d3d; font-size : 14px; font-weight : 500;margin-left :10px;"> 배우고 싶습니다.</span>
                        </div>
                    </div>
                     




                </div>

                

            </div>

          </div>





          <div class = "step">


            <div class ="step_title1">
                <span>모든 1:1 개인레슨을 무료로 해보세요</span>
            </div>
            <div class ="step_title2">
                <span>바꾸 에서는 여러분의 모든 재능을 응원합니다.</span>
            </div>

            <div class="step_content">

                <div class="step_content_div">
                    <div class="step_content_div_img">
                        <img width="150" height="150" src="../../../assets/img/lightbulb.gif"/>
                    </div>
                    <span>1. 배우고 싶은 재능을 찾아보세요!<br/></span>
                    <p>간단한 검색만으로 자신이 원하는 재능을 가지고 있는 사람을 찾을 수 있습니다.</p>
                </div>

                <div class="step_content_div">
                    <div class="step_content_div_img">
                        <img width="150" height="150" src="../../../assets/img/search.gif"/>
                    </div>
                    <span>2. 재능교환 요청을 보내보세요!!<br/></span>
                    <p>자신과 맞는 재능인을 찾았다면 재능교환 요청을 해보세요! 수업은 온/오프라인으로 진행됩니다.</p>
                </div>

                <div class="step_content_div">
                    <div class="step_content_div_img">
                        <img width="150" height="150" src="../../../assets/img/lightbulb.gif"/>
                    </div>
                    <span>3. 재능을 교환하여 재능+재능이라는 경험을 해보세요!<br/></span>
                    <p>서로에게 맞는 수업방식을 의논후, 수업을 진행하여 재능을 공유하세요~!</p>
                </div>

            
            </div>

            

            
        


        </div>

        <div class="footer">
            <div class="footer_div">
                <div class="footer_left">
                    <span>© 바꾸</span>
                    
                    
                </div>
                

                <div class="footer_right">

                    <div class="footer_right_email">
                        <div class="footer_right_sns">
                            <img @click="sns_click(1)" src="../../../assets/img/fb.png" />
                            <img @click="sns_click(2)" src="../../../assets/img/instat.png" />
                            <img @click="sns_click(3)" src="../../../assets/img/kakao.png"/>
                            
                        </div>


                        <span>플러스 친구 : @frome 를 검색해보세요!</span>
                        <span>문의하기 / 제안하기 : cs@frome.co.kr</span>
                    </div>
                </div>
            </div>
            
        </div>
        
      </div>
  
</template>


<script>
var Child = {
  props: ['date'],
  template: '<div>{{this.date_result}}</div>',
  data() {
    return { date_result : 0 }
  },
  methods: {
      checkDate(date) {
            
        }
  },
  created() {
        let dates = new Date(this.date);
        let dates_temp = new Date();

                
        let tz_correction_minutes = (dates_temp.getTime() - dates.getTime())/1000/60/60/24; 

        if(Math.ceil(tz_correction_minutes) === 0) {
            this.date_result = "방금"
        } else {

            this.date_result = Math.ceil(tz_correction_minutes)+"일전";
        }
  }
}
  import {Server_IP} from '../../../server/serverIP'
import fab from 'vue-fab'

    export default {

        components: {
            fab,
            'my-component': Child
        },
      
        data() {
            return {
                login : false,
                dialogFormVisible : false,
                signup : false,
                search_value : "",
                main_new_list : [],
                main_request_list : [],
                login_check : false,
                main_request_status : 0,
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            this.$http.get(`${Server_IP}/main/new/0` ,null)
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        this.main_new_list = data.result;
                  
                        
                    } else if(data.status == 1) {
                        this.main_new_list =[];
                    } 
                    else {
                        this.main_new_list =[];
                    }
                }, error => {
                    console.log(error);
                });

            if(localStorage.getItem('user_id')) {
                this.login_check = true;
                this.$http.get(`${Server_IP}/main/request/${localStorage.getItem('user_id')}` ,null)
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        this.main_request_list = data.result;
                  
                        
                    } else if(data.status == 10) {
                        // 등록된 재능이 없습니다.
                        this.main_request_status = 10;
                    } else if(data.status == 20) {
                        // 등록하신 재능에 맞는 추천재능을 찾지 못했습니다. 
                        this.main_request_status = 20;
                    } 
                    else {
                        this.main_request_list =[];
                    }
                }, error => {
                    console.log(error);
                });  
            } else {

                this.login_check = false;
            }
              
            

        },
        mounted() {
           

        },
        beforeDestroy() {
        
        },
        methods: {
              cache(){
          console.log('Cache Cleared');
      },
      alert(){
          alert('Clicked on alert icon');
      },
            login_click() {
                this.login = true;
            },

            signup_click() {
                this.login = false;
                this.signup = true;
            },

            appgo(type) {
                if(type === 'ios') {
                     window.open("https://itunes.apple.com/kr/app/id1424879430?mt=8", '_blank');
                } else if(type === 'android') {
                    window.open("https://play.google.com/store/apps/details?id=com.frome", '_blank');
                }
            
            },
            recomment_go(name) { 
                this.$router.push('/search?tag='+name);
            }, 

            recomment_go_byId(id) {
                this.$router.push('/search?tag=""&ids='+id);
            },

            search_click() {
                this.$router.push('/search?tag='+this.search_value);
            },

            gorequest() {
                this.$router.push('/talent/request');
            }, 

            sns_click(url) {
                if(url === 1) {
                  
                    window.open("https://www.facebook.com/Thefrome/", '_blank');
                
                } else if(url === 2) {
                    window.open("https://www.instagram.com/dabacoo/", '_blank');

                } else if(url === 3) {
                    window.open("http://pf.kakao.com/_qxfVdC", '_blank');

                }
            },

            
            
        }
    }
</script>


<style scoped>




.main{

    width: 100%;
    margin: 0 auto;

    font-family: "Noto Sans KR","Apple Gothic","돋움",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
}

.main-recommend-request {
    margin: 0 auto;
    width: 1024px;
    height : 50px;
    margin-top: 50px;
    text-align : center;
}

.main-recommend-request span {
    font-weight: 500;
    color : #F87A65;
}

.main-recommend {
    margin: 0 auto;
    width: 900px;
    height : 50px;
    margin-top: 100px;
}

.main-recomment-dvi {
    
    width: 1024px;
    height : 400px;
    margin: 0 auto;
}

.main-recommend span {
    color : black;
    font-size: 26px;
    font-weight: 700;
    float :left;
}

.main-recomment-title-sub span {
    color : #868E96;
    font-size: 14px;
    font-weight: 700;
    float :left;
    margin-left: 10px;
    line-height: 50px;
    
}

.main-recomment-content {
    cursor: pointer;
    width:  235px;
    height: 250px;
    margin-right: 21px;
    float : left;
    border-bottom : 1px solid #A39696;
    border-left : 1px solid #A39696;
    border-right : 1px solid #A39696;
    border-radius : 10px;
    box-shadow : 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.main-recomment-content img {
    width:  234px;
    margin-left : -0.5px;
    padding-right : 0.2px;
    height: 160px;
    
    border-top-left-radius:  9px;
    border-top-right-radius: 9px;
}

.main-recomment-content-text {
    margin-top : 14px;
}

.main-recomment-content-text span{
    font-weight: 700;
    font-size: 15px;
    padding-left : 10px;
}

.main-recomment-content-text-sub {
    
    margin-top : 3px;
    padding-left : 10px;
}

.main-recomment-content-text-sub span {
    
    color: #383838;
    font-weight: 500;
}



.main-recommend-new {
    margin: 0 auto;
    width: 900px;
    height : 50px;
}


.main-recommend-new-dvi {
    
    width: 1200px;
    height : 800px;
    margin: 0 auto;
}

.main-recommend-request-dvi-content-nodata {
    
    width : 550px;
    height: 200px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    border : 1px solid #f2f2f2;
    padding-top : 10px;
}

.main-recommend-request-dvi-content-nodata-btn {
    width : 300px;
    height: 50px;
    background-color : #f87a65;
    text-align : center;
    margin : 0 auto;
    margin-top : 30px;
    
    cursor: pointer;
}


.main-recommend-request-dvi-content-nodata-btn span {
    line-height : 50px;
    color : #ffffff;
    
    font-size : 16px;
    font-weight : 500;
}


.main-recommend-request-dvi-content-fail {
    width : 550px;
    height: 150px;
    line-height: 100px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    border : 1px solid #f2f2f2;
}

.main-recommend-request-dvi-content {
    width : 550px;
    float: right;
    border : 1px solid #f2f2f2;
    box-shadow: 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.main-recommend-request-dvi-content-title {
    cursor: pointer;
    width: 550px;
    margin-left : -1px;
    margin-top : -1px;
    height: 50px;
    float: left;
    text-align: center;
    background-color : #F87A65;
    box-shadow: 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);   
}

.main-recommend-request-dvi-content-title span{
    font-size: 20px;
    font-weight: 500;
    
    color : #ffffff;
    line-height: 50px; 
        
}

.main-recommend-request-dvi-content-lists-talents{
    width: 100%;
    margin-bottom : 15px;
    padding-left : 15px;
    padding-right : 15px;
}

.main-recommend-request-dvi-content-lists {
    
    cursor: pointer;
    border-bottom : 1px solid #5f5f5f;
}

.main-recommend-request-dvi-content-lists:hover {
    background-color: #f3f3f3;
}

.main-recommend-request-dvi-content-lists-title {
    width: 100%;
    padding-top : 10px;
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;

}

.main-recommend-request-dvi-content-list {
    float :left;
    height: 100%;

}

.main-recommend-new-dvi-content {
    width : 550px;
    float: left;
    border : 1px solid #f2f2f2;
    box-shadow: 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.main-recommend-new-dvi-content-title {
    text-align: center;
    padding-left : 45px;
    width: 548px;
    height: 50px;
    float: left;
    background-color : #F87A65;
    box-shadow: 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);   
}

.main-recommend-new-dvi-content-title span{
    font-size: 20px;
    font-weight: 500;
    color : #ffffff;
    line-height: 50px; 
        
}

.main-recommend-new-dvi-content-lists-talents{
    width: 100%;
    margin-bottom : 15px;
    padding-left : 15px;
    padding-right : 15px;
}

.main-recommend-new-dvi-content-lists {
    cursor: pointer;
    border-bottom : 1px solid #5f5f5f;
}

.main-recommend-new-dvi-content-lists-title {
    float: left;
    width: 80%;
    margin-bottom: 10px;
    padding-top : 10px;
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 500;

    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
  
}


.test {
    
    width: 100%;
}

.main-recommend-new-dvi-content-lists-title2 {
    
    float: right;
    text-align: right;
    width: 20%;
    margin-bottom: 10px;
    padding-top : 10px;
    padding-right: 10px;
    line-height: 30px;
    font-size: 11px;
    font-weight: 500;
    color : #5f5f5f;

}


.main-recommend-new-dvi-content-list {
    height: 100%;

}

.main-recommend-new-dvi-content-lists:hover {
    background-color: #f3f3f3;
}

.main-recommend-new span {
    color : black;
    font-size: 26px;
    font-weight: 700;
    float :left;
}

.main-recommend-new-title-sub span {
    color : #868E96;
    font-size: 14px;
    font-weight: 700;
    float :left;
    margin-left: 10px;
    line-height: 50px;
}

.main-recommend-new-content {
    cursor: pointer;
    width:  235px;
    height: 250px;
    margin-right: 21px;
    margin-bottom : 30px;
    float : left;
    border-bottom : 1px solid #A39696;
    border-left : 1px solid #A39696;
    border-right : 1px solid #A39696;
    border-radius : 10px;
    box-shadow : 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.main-recommend-new-content img {
    width:  234px;
    margin-left : -0.5px;
    padding-right : 0.2px;
    height: 160px;
    
    border-top-left-radius:  9px;
    border-top-right-radius: 9px;
}

.main-recommend-new-content-text {
    height : 50px;
    margin-top : 14px;
    text-align : center;
}

.main-recommend-new-content-text span{
    
    max-width: 220px;
    font-weight: 700;
    font-size: 15px;
    display: inline-block; 
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
}

.main-recommend-new-content-text-sub {
    
    margin-top : 3px;
    padding-left : 10px;
}

.main-recommend-new-content-text-sub span {
    color: #383838;
    font-weight: 500;
}





.main-recommend-request {
    margin: 0 auto;
    margin-top : 200px;
    width: 900px;
    height : 50px;
}

.main-recommend-request-dvi {
    
    width: 1024px;
    height : 500px;
    margin: 0 auto;
}

.main-recommend-request span {
    color : black;
    font-size: 26px;
    font-weight: 700;
    float :left;
}

.main-recommend-request-title-sub span {
    color : #868E96;
    font-size: 14px;
    font-weight: 700;
    float :left;
    margin-left: 10px;
    line-height: 50px;
}

.main-recommend-request-content {
    cursor: pointer;
    width:  235px;
    height: 250px;
    margin-right: 21px;
    margin-bottom : 30px;
    float : left;
    border-bottom : 1px solid #A39696;
    border-left : 1px solid #A39696;
    border-right : 1px solid #A39696;
    border-radius : 10px;
    box-shadow : 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.main-recommend-request-content img {
    width:  234px;
    margin-left : -0.5px;
    padding-right : 0.2px;
    height: 160px;
    
    border-top-left-radius:  9px;
    border-top-right-radius: 9px;
}

.main-recommend-request-content-text {
    height : 50px;
    margin-top : 14px;
    text-align : center;
}

.main-recommend-request-content-text span{
    max-width: 220px;
    font-weight: 700;
    font-size: 15px;
    display: inline-block; 
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
}

.main-recommend-request-content-text-sub {
    
    margin-top : 3px;
    padding-left : 10px;
}

.main-recommend-request-content-text-sub span {
    color: #383838;
    font-weight: 500;
}


.step {
    margin : 0 auto;
    margin-top : 300px;
    width : 1280px;
    height: auto;
    text-align: center;
    border-bottom:3px solid #707070;
}

.step_title1 {
    width : 1280px;
    font-weight: 700;
    font-size: 50px;
    color : #5C7CFA;
}


.step_title2 {
    width : 1280px;
    font-weight: 700;
    font-size: 30px;
    color : #7D7979;
    padding-bottom: 10px;
    margin-top: 10px;
}



.header-content {
    width : 100%;
    height: 400px;
    
    margin: 0 auto;
    margin-top : 50px;
}

.header-content2  {
    width: 650px;
    float: left;
    
    height: 30px;
}

.header-content-text1 {
    text-align: center;
    color: white;
    font-size: 2em;
    font-weight: 400;
    padding-top: 50px;
}

.header-content-text2 {
    height: 50px;
    text-align: center;
    color: white;
    font-size: 2em;
    font-weight: 400;
}

#search_bar {
    position: absolute;
    width: 99%;
    height: 40px;
    border-radius: 30px;
    padding-left: 60px;
    z-index: 1;
}

#search_bar2 {
    
    position: absolute;
    width: 650px;
    height: 30px;
    line-height : 30px;
    z-index: 1;
    margin-top : 10px;
}

#header-content-search {
    position: relative;
    margin: 0 auto;
    margin-top: 10px;
    width: 800px;
}

.header-content-search-img {
    line-height: 38px;
    margin-left: 15px;
    width : 22px;
    height: 22px;
    z-index: 2;
    position: absolute;
}


#header-content-search img{
    
    width : 22px;
    height: 22px;
}

.header-content-search-img2 {
    line-height: 38px;
    width : 15px;
    height: 15px;
    z-index: 2;
    margin-top : 3px;
    margin-left: 620px;
    position: absolute;
}

.header-content-search-img2 img{
    
    width : 20px;
    height: 20px;
}


.step_content {
    margin : 0 auto;
    margin-top : 200px;
    width: 1280px;
    height : 500px;
    float : left;
}

.step_content_div {
    margin : 0 auto;
    margin-left : 80px;
    width : 320px;
    height : 300px;
    float : left;
}



.step_content_div span {
   font-size : 14px;
    font-weight: 700;
}

.step_content_div p {
    margin-top : 10px;
   font-size : 14px;
    font-weight: 400;
    color : #868E96;
}

.step_content_div_img { 
    width : 100%;
}


.main-recommend-new-content-had-title {
    padding-left : 10px;
    margin-top : 10px;
    font-weight: 500;
}

.main-recommend-new-content-had-list {
    padding-left : 10px;
    margin-top : 10px;
}

.main-recommend-new-content-had-list span {
    color : blue;
}

.main-recommend-new-content-want-title {
    padding-left : 10px;
    margin-top : 30px;
    font-weight: 500;
}

.main-recommend-new-content-want-list {
    padding-left : 10px;
    margin-top : 10px;
}

.main-recommend-new-content-want-list span {
    color : blue;
}


.main-recomment-title-more {
    margin-top : 5px;
    font-size : 15px;
    color : #f87a65;
    float :right;
    font-weight: 700;
    cursor: pointer;
}



.main-recommend-request-content-had-title {
    padding-left : 10px;
    margin-top : 10px;
    font-weight: 500;
}

.main-recommend-request-content-had-list {
    padding-left : 10px;
    margin-top : 10px;
}

.main-recommend-request-content-had-list span {
    color : blue;
}

.main-recommend-request-content-want-title {
    padding-left : 10px;
    margin-top : 30px;
    font-weight: 500;
}

.main-recommend-request-content-want-list {
    padding-left : 10px;
    margin-top : 10px;
}

.main-recommend-request-content-want-list span {
    color : blue;
}


.main-recommend-request-content-fail {
    width: 1028px;
    height: 150px;
    border : 1px solid #eddede;
    text-align : center;
}

.main-recommend-request-content-fail span {
    line-height : 120px;
    color : #000000;
    font-size : 14px;
    font-weight : 500;
}


.main-recommend-request-content-nodata {
    width: 1028px;
    height: 200px;
    border : 1px solid #eddede;
    text-align : center;
}

.main-recommend-request-content-nodata span {
    line-height : 100px;
    color : #000000;
    font-size : 14px;
    font-weight : 500;
}

.main-recommend-request-content-nodata-btn {
    width : 300px;
    height: 50px;
    background-color : #f87a65;
    text-align : center;
    margin : 0 auto;
    cursor: pointer;
}


.main-recommend-request-content-nodata-btn span {
    line-height : 50px;
    color : #ffffff;
    
    font-size : 16px;
    font-weight : 500;
}

.footer {
    float : left;
    width : 100%;
    height: 130px;
    background-color : #5d5d5d;
    text-align : center;
}

.footer_div {
    width : 1024px;
    height: 130px;
    margin : 0 auto;
}


.footer_left{
    float: left;
     width : 512px;
     height : 120px;
}

.footer_left span {
    float: left;
    line-height : 120px;
    color : #ffffff;
}

.footer_right{
    float: right;
     height : 120px;
}

.footer_right_email{
    
     width : 300px;
     height : 50px;
     margin : 0 auto;
}

.footer_right_email span {
    float: left;
    margin-top : 10px;
    color : #ffffff;
    font-weight: 500;
}

.footer_right_sns {
    width : 250px;
    height: 50px;

}

.footer_right_sns img {
    float: left;
    width : 30px;
    height: 30px;
    margin-left : 30px;
    margin-top : 10px;
    border-radius : 30px;
    cursor: pointer;
    
}

.main-recommend-new-dvi-content-title-more {
    float: right;
    margin-right : 15px;
    cursor: pointer;
}

.main-appad {
    width : 100%;
    height: 500px;
    background-color: "#5C7CFA";
}

.main-appad-div {
    width : 1200px;
    height: 500px;
    margin : 0 auto;
}

.main-appad img {
    margin-top : -50px;
    margin-bottom: 50px;
    width : 1200px;
    height: 470px;
    
    border : 0.7px solid #bfbfbf;
}

.main-appad-android {
    width : 150px;
    height:  50px;
    position: absolute;
    top : 1130px;
    left: 55%;
    cursor: pointer;
}

.main-appad-ios {
    width : 150px;
    cursor: pointer;
    height:  50px;
    position: absolute;
    top : 1130px;
    left: 40%;
}

.main-recommend-new-dvi-content-title-more span {
    font-size : 16px;
}


    @media ( max-width: 1280px ) {

        .main{
            width : 1280px;
        }

        
    }

</style>
