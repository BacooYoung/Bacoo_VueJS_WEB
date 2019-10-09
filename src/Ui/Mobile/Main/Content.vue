<template>


    <div class="main">

        <div class="header-content">
                    
            <div class = "header-content-text1">
                <span>원하는 재능을 검색해 보세요!</span>
            </div>

            <div class = "header-content-text2">
                <span>누구나 쉽게 재능을 교환할 수 있습니다!</span>
            </div>

            <div id = "header-content-search2"  class="input-group input-group-lg">
            <div class="header-content-search2-img">
                <img src='https://i.imgur.com/Ulpp2Bb.png' />
            </div>
            <input id="search_bar" v-model="search_value"  type="search" placeholder="" class="form-control" v-on:keyup.enter.passive="search_click" />
        
            </div>


        </div>  


        <div class="main-recommend">
            <div class="main-recomment-title">
                <span>추천 재능</span>
                <div class="main-recomment-title-sub">
                    <span>바꾸 에서 추천하는 재능입니다.</span>
                </div>
            </div>
        </div>

        <div class="center" style="float:left;">
            <div class="main-recomment-content" @click="recomment_go('언어')">
                <div class="main-recomment-content_div">
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
            </div>

            <div class="main-recomment-content" @click="recomment_go('코딩')">
                <div class="main-recomment-content_div">
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
            </div>

            <div class="main-recomment-content" @click="recomment_go('디자인')">
                <div class="main-recomment-content_div">
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
            </div>

            <div class="main-recomment-content" @click="recomment_go('운동')">
                <div class="main-recomment-content_div">
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

        </div>  


        <div class="main-appad" @click="appgo()">
            <img src = "https://i.imgur.com/GaxNwHl.png"/>
        </div>

        <div class="main-recommend">
            <div class="main-recomment-title">
                <span>신규 재능</span>
                <div class="main-recomment-title-sub">
                    <span>최근 등록된 재능입니다.</span>
                </div>
                <div class="main-recomment-title-more" @click="recomment_go('new')">
                    더보기..
                </div>
            </div>
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
                    <span style="color : blue; font-size : 11px;  font-weight : 400;">{{results.hadTalent}}</span>
                    <span style="color : #3d3d3d; font-size : 11px; font-weight : 500; margin-left :10px;"> 가르쳐 드리고</span>
                    <span style="color : blue; font-size : 11px; margin-left :10px; font-weight : 400;">{{results.wantTalent}}</span>
                    <span style="color : #3d3d3d; font-size : 11px; font-weight : 500;margin-left :10px;"> 배우고 싶습니다.</span>
                </div>
            </div>
        </div>





        
       
        
        

        <div class="main-recommend-request-dvi-content-list" v-if="main_request_status === 0 && login_check">
            
            <div class="main-recommend-request-dvi-content-lists"  @click="recomment_go_byId(results.talentlistId)" v-for="(results,index) in main_request_list" :key ="index"> 
                <div class="main-recommend-request-dvi-content-lists-title">
                    <span>{{results.title}}</span>
                </div>

                <div class="main-recommend-request-dvi-content-lists-talents"> 
                    <span style="color : blue; font-size : 11px;  font-weight : 400;">{{results.hadTalent}}</span>
                    <span style="color : #3d3d3d; font-size : 11px; font-weight : 500; margin-left :10px;"> 가르쳐 드리고</span>
                    <span style="color : blue; font-size : 11px; margin-left :10px; font-weight : 400;">{{results.wantTalent}}</span>
                    <span style="color : #3d3d3d; font-size : 11px; font-weight : 500;margin-left :10px;"> 배우고 싶습니다.</span>
                </div>
            </div>
                




        </div>


        
        <div class="footer">

            <div class="footer_sns">
                <div class="footer_sns_info">
                    <img @click="sns_click(1)" src="../../../assets/img/fb.png" />
                    <img @click="sns_click(2)" src="../../../assets/img/instat.png" />
                    <img @click="sns_click(3)" src="../../../assets/img/kakao.png"/>
                    
                </div>
            </div>

            <div class="footer_top">
                <div class="footer_top_info">
                    <span>플러스친구 : @frome 를 검색해보세요!</span>
                    <span>문의하기 : cs@frome.co.kr</span>
                </div>
            </div>

            <div class="footer_bottom">
                <span>© 바꾸</span>
            </div>

            
        </div>


    </div>
  
</template>


<script>

    import MobileDetect from 'mobile-detect';

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

    export default {
        components: {
            'my-component': Child
        },
      
        data() {
            return {
                login : false,
                signup : false,
                search_value : "",
                main_new_list : [],
                main_request_list : [],
                hadlist : [],
                wantlist : [],
                hadlist_level : [],
                wantlist_level : [],
                hadlist_level_temps : [],
                wantlist_level_temps : [],
                login_check : false,
                main_request_status : 0
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);


            this.$EventBus.$emit('header_check',this.search_value );

                 $( document ).ready(function() {
                
                    $('.center').slick({
                        centerMode: true,
                        arrows: false,
                        centerPadding: '60px',
                        slidesToShow: 1,
                        
                        });

                });
                


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

        updated() {
            this.$nextTick(function () {
                


            })
        },
        mounted() {


        },
        beforeDestroy() {
        
        },
        methods: {

            recomment_go(name) { 
                this.$router.push('/search?tag='+name);
            }, 

            appgo() {
                const md = new  MobileDetect(window.navigator.userAgent);

                if(md.is('iPhone')) {
                   window.open("https://itunes.apple.com/kr/app/id1424879430?mt=8", '_blank');
                } else {
                    window.open("market://details?id=com.frome", '_blank');
                }
                console.log(md);
                //window.open("https://www.facebook.com/Thefrome/", '_blank');
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
                  
                    window.open("https://www.facebook.com/dabacoo/", '_blank');
                
                } else if(url === 2) {
                    window.open("https://www.instagram.com/dabacoo/", '_blank');

                } else if(url === 3) {
                    window.open("http://pf.kakao.com/_qxfVdC", '_blank');

                }
            }
            
            
        }
    }
</script>

<style>
</style>


<style scoped>




.main{

    width: 100%;
    height : auto;
    margin: 0 auto;

    font-family: "Noto Sans KR","Apple Gothic","돋움",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
}

.center {
    width : 100%;
    height :300px;
}

.main-new-content {
    
    padding-left : 20px;
    padding-right : 20px;
    margin-bottom : 100px;
}

.main-new-content_div {
    height: auto;
    margin-bottom : 10px;
    border-bottom : 1px solid #A39696;
    border-left : 1px solid #A39696;
    border-right : 1px solid #A39696;
    border-radius : 6px;
    box-shadow : 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.main-new-content-name {

    width : 100%;
    height: 50px;
    border-top-left-radius:  5px;
    border-top-right-radius: 5px;
    text-align : center;
    margin-top : 1px;
    padding-top : 5px;
}

.main-new-content-name span {
    
    text-overflow: ellipsis;
    width : 80%;
    display: inline-block; 
    white-space: nowrap; 
    overflow: hidden;
}

.main-new-content-hadlist{
    margin-left: 10px;
}

.main-new-content-hadlist-div{
    margin-top : 10px;
    color : blue;
    margin-left: 10px;
}

.main-new-content-wantlist{
    margin-top : 30px;
    margin-left: 10px;
}

.main-new-content-wantlist-div{
    margin-top : 10px;
    color : blue;
    margin-left: 10px;
    margin-bottom : 30px;
}

.main-new-content-lalist{
    margin-top : 30px;
    margin-left: 10px;
    margin-bottom : 150px;
}

.main-new-content-lalist-div{
    margin-top : 10px;
    color : blue;
    margin-left: 10px;
}


.main-recomment-content {
    height: 245px;
    padding-left : 20px;
    padding-right : 20px;
}

.main-recomment-content_div {
    
    border-bottom : 1px solid #A39696;
    border-left : 1px solid #A39696;
    border-right : 1px solid #A39696;
    border-radius : 6px;
    box-shadow : 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.main-recomment-content-img img {
    width : 100%;
    height: 150px;
    border-top-left-radius:  5px;
    border-top-right-radius: 5px;
}

.main-recomment-content-text {
    font-weight: 700;
    font-size: 12px;
    margin-top : 15px;
}

.main-recomment-content-text span{
    font-weight: 700;
    font-size: 13px;
    padding-left : 10px;
}


.main-recomment-content-text-sub {
    
    color: #3d3d3d;
    font-weight: 500;
    height : 40px;
    margin-top : 3px;
    font-size: 10px;
    margin-top : 3px;
    padding-left : 10px;
    margin-bottom : 10px;
}


.main-recomment-content-text-sub span {
    
    color: #383838;
    font-weight: 500;
}

.main-recommend {
    float: left;
    margin-left: 5%;
    width: 90%;
    height : 40px;
    margin-top: 50px;
}

.main-recommends {
    
    float: left;
    margin-left: 5%;
    width: 90%;
    margin-top: 150px;
}

.main-recommends span {
    color : black;
    font-size: 18px;
    font-weight: 700;
    float :left;
}

.main-recomment-dvi {
    
    width: 100%;
    height : 500px;
    margin-left: 13%;
}

.main-recommend span {
    color : black;
    font-size: 18px;
    font-weight: 700;
    float :left;
}

.main-recomment-title-sub span {
    color : #868E96;
    font-size: 10px;
    font-weight: 700;
    float :left;
    margin-left: 10px;
    line-height: 35px;
}

.main-recomment-title-more {
    margin-top : 5px;
    color : #f87a65;
    float :right;
}



.header-content {
    width : 100%;
    height: 150px;
    padding-left: 5%;
    padding-right: 5%;
    margin-top : 50px;
    background-color : #f87a65;
}

.header-content-title{
    width : 100%;
    text-align : center;
}

.header-content-title{
    color : #ffffff;
    font-size : 16px;
}


#header-content-search2 {
    position: relative;
    padding-top: 10px;
    width: 100%;
}

.header-content-search2-img-div{
    width : 30px;
    height: 30px;
    float : left;
    border-left : 1px solid #707070;
}

.header-content-search2-img {
    line-height: 25px;
    width : 100%;
    text-align : left;
    padding-left :10px;
    height: 22px;
    z-index: 2;
    position: absolute;
}


#header-content-search2 img{
    
    width : 22px;
    height: 22px;
}

#search_bar {
    position: absolute;
    width: 100%;
    height: 30px;
    border-radius: 4px;
    padding-left: 40px;
    z-index: 1;
}


.header-content-text1 {
    text-align: center;
    color: white;
    font-size: 1.3em;
    font-weight: 400;
    padding-top: 20px;
}

.header-content-text2 {
    height: 40px;
    text-align: center;
    color: white;
    padding-top: 5px;
    font-size: 1.3em;
    font-weight: 400;
}

.main-recommend-request-content-nodata {
    margin-left : 20px;
    margin-right : 20px;
    height: 130px;
    border : 1px solid #eddede;
    text-align : center;
    margin-bottom  : 150px;
}

.main-recommend-request-content-nodata span {
    line-height : 60px;
    color : #000000;
    font-size : 14px;
    font-weight : 500;
}


.main-recommend-request-content-nodata-btn {
    width : 130px;
    height: 40px;
    background-color : #f87a65;
    text-align : center;
    margin : 0 auto;
    cursor: pointer;
}


.main-recommend-request-content-nodata-btn span {
    line-height : 40px;
    color : #ffffff;
    
    font-size : 12px;
    font-weight : 500;
}

.main-recommend-request-content-fail{
    
    margin-left : 20px;
    margin-right : 20px;
    height: 50px;
    border : 1px solid #eddede;
    text-align : center;
    line-height : 40px;
    margin-bottom  : 150px;
}



.footer {
    float : left;
    width : 100%;
    height: 170px;
    background-color : #5d5d5d;
    text-align : center;
}

footer_sns{
    width : 100%;
    height: 50px;
    float: left;
    margin-left : 20px;
    text-align : center;
}

.footer_sns_info {
    text-align : center;
    width : 100%;
    height: 50px;
    margin : 0 auto;
    
}

.footer_sns_info span {
    color : #ffffff;
}

.footer_sns_info img {
    width : 30px;
    height: 30px;
    margin-left : 15px;
    margin-right : 15px;
    margin-top : 10px;
    border-radius : 30px;
    cursor: pointer;
}

.footer_top {
    width : 100%;
    height: 50px;
    float: left;
    margin-left : 20px;
}

.footer_top span {
    width : 100%;
    color : #ffffff;
    float: left;
    text-align: left;
    margin-bottom : 10px;
    font-size : 12px;
    margin-top : 10px;
}


.footer_bottom {
    width : 100%;
    float: left;
    margin-left : 20px;
    margin-top :40px;
}

.footer_bottom span {

    color : #f87a65;
    float: left;
}



.main-recommend-new-dvi-content-lists-talents{
    width: 100%;
    margin-bottom : 15px;
    padding-left : 15px;
    padding-right : 15px;
}

.main-recommend-new-dvi-content-lists {
    cursor: pointer;
    border-bottom : 1px solid #ced4da;
}

.main-recommend-new-dvi-content-lists-title {
    float: left;
    width: 80%;
    padding-top : 10px;
    margin-bottom: 5px;
    padding-left: 15px;
    line-height: 30px;
    font-size: 12px;
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
    width : 100%;
    float: left;
    height: 100%;
    border-bottom: 1px solid #495057;
    border-top: 1px solid #495057;

}

.main-recommend-new-dvi-content-lists:hover {
    background-color: #f3f3f3;
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
    
    margin-bottom : 100px;
    cursor: pointer;
}


.main-recommend-request-dvi-content-nodata-btn span {
    line-height : 50px;
    color : #ffffff;
    
    font-size : 16px;
    font-weight : 500;
}


.main-recommend-request-dvi-content-fail {
    float:left;
    width : 95%;
    margin : 10px;
    height: 150px;
    line-height: 100px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    border : 1px solid #f2f2f2;
    margin-bottom : 100px;
}

.main-recommend-request-dvi-content {
    width : 550px;
    float: right;
    border : 1px solid #f2f2f2;
}

.main-recommend-request-dvi-content-title {
    width: 550px;
    margin-left : -1px;
    margin-top : -1px;
    height: 50px;
    float: left;
    text-align: center;
    background-color : #F87A65;
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
    border-bottom : 1px solid #ced4da;
}

.main-recommend-request-dvi-content-lists:hover {
    background-color: #f3f3f3;
}

.main-recommend-request-dvi-content-lists-title {
    width: 100%;
    padding-top : 10px;
    padding-left: 15px;
    line-height: 30px;
    font-size: 13px;
    font-weight: 500;

}

.main-recommend-request-dvi-content-list {
    width : 100%;
    float: left;
    height: 100%;
    border-bottom: 1px solid #495057;
    border-top: 1px solid #495057;

    margin-bottom : 100px;
}



.main-appad {
    width : 100%;
    margin : 0 auto;
    background-color: "#5C7CFA";
}

.main-appad img {
    margin-top : 30px;
    margin-bottom: 50px;
    width : 100%;
    height: 300px;
}

.main-appad-android {
    width : 200px;
    height:  50px;
    position: absolute;
    top : 1110px;
    left: 420px;
    cursor: pointer;
}

.main-appad-ios {
    width : 200px;
    cursor: pointer;
    height:  50px;
    position: absolute;
    top : 1110px;
    left: 220px;
}

</style>
