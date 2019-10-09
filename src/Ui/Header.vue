<template>

    
    <nav id="mainNav"  style="width : 100%;  text-align: center; background-color: rgba( 255, 255, 255, 0.5 );" class="navbar navbar-default navbar-custom navbar-fixed-top">
            <!-- Brand and toggle get grouped for better mobile display -->
        
       
        <Login v-if="login" />   
        <Signup v-if="signup" />   
        <div class="navbar-header page-scroll">

       <div class="header-top">
 
            <div class="header-top-logo">
                <router-link :to="'/'"><img width="115" height="22" src="../assets/img/bacoologo.png"/></router-link>
            </div>
            <div id = "header-content-searchs"  class="input-group input-group-lg" >
                
                <el-input
                        placeholder="원하시는 재능을 검색해보세요!"
                        prefix-icon="el-icon-search"
                        v-model="search_value"
                        @keyup.enter.native="search_click"  >
                </el-input>
            </div>
            <div class="header-top-menu">
                <div style="float : left;">
                     <router-link :to="'/mypage'" v-if="login_check"><span>마이페이지</span></router-link>
                    <span v-on:click="login_click" v-if="login_check == false">로그인</span>
                    <span v-on:click="logout" v-else>로그아웃</span>
                    <router-link :to="'/talent/request'" v-if="login_check"><span>재능요청</span></router-link>
                </div>
                <!--<router-link :to="'/online'"><span>온라인 클래스</span></router-link>-->
                 <div style="float : right; " v-if="login_check == true">                    
                 

                    <div class = "alert_dropdown">
                        <img  src="../assets/img/alert.png" width="22px" height="22px"/>
                        <div style="position : absolute; right : -10px; top : 5px; width : 17px; height : 17px; border-radius : 50px; text-align : center; background-color : #b2f; line-height : 12px;">
                            <span style="color : #fff; font-size : 10px; margin-right : 6px; margin-top : 2px;">{{alertResult.length}}</span></div>

                        <div class="alert_dropdown_content">
                            <div style="padding-top : 15px; padding-left : 15px; padding-right : 5px; line-height : 20px; border-bottom : 2px solid #bfbfbf; height : 50px;">
                                <div style="float : left;"><span style="font-size : 16px; font-weight : 400; float:left; color : #000; ">알림</span><span style="color : #b2f; font-weight : bold; margin-left : -10px; font-size : 12px; margin-top : 3px;">Beta</span></div>
                               
                            </div>

                            <div>
                                <!-- 틀 -->
                                <div v-for="(results, index) in alertResult" :key="index"
                                class="alert_dropdown_list"
                                @click="goType(results.type, results.userAlertId)"
                                style="border-bottom : 1px solid #bfbfbf; line-height: 35px; padding-bottom : 10px;">
                                    
                                    <div style="width : 100%; display: inline-block; ">
                                        <div style="float : left; width : 90%;  margin-top : 10px; line-height : 20px;">
                                            <div style="width : 100%; height : 20px; ">
                                                <div style=" height : 20px; float : left; line-height : 20px; padding-left : 15px;">
                                                    <div  style="text-align : left;"><span style="font-size : 14px; font-weight : 600;">{{checkType(results.type)}}</span></div>
                                                </div>
                                                <div style="height : 20px; float: left; line-height : 20px; text-align : left;  max-width : 75%; ">
                                                    <span style=" font-size : 13px; font-weight : 400; text-overflow: width : 80%; height : 20px; ">{{checkText(results.type, results.name)}}</span></div>
                                            </div>
                                        </div>
                                       
                                    </div>

                                     <div style="width : 100%; height : 10px;  padding-left : 15px; line-height : 1px;">
                                        <div  style="text-align : left;  float:left; height : 10px;line-height : 1px;"><span style="font-size : 12px; color : #bfbfbf; line-height : 1px;">{{foo(results.time)}}</span></div>
                                    </div>

                                </div>
                                <!-- 틀 -->

                             
                               

                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </div>
       
      </div>
        


    </nav>

    

</template>

<script>
    import {Server_IP} from '../server/serverIP'

    export default {
        
        data() {
            return {
                search : false,
                search_value : "",
                url : "", 
                login : false,
                signup : false,
                feedback : false,
                login_check : false,
                disScroll : false,
                search_bars : false,
                bgColor: '#f87a65',
                position: 'bottom-right',
                fabActions: [
                    {
                        name: 'feedback',
                        tooltip: "피드백 보내기",
                        icon: 'feedback'
                    }
                ],

                alertResult : []
                
            }
        },
        watch : {
            '$route.path': function (id) {
                if(id == "/") {
                    this.search_value = "";
                    this.search_bars = false;
                    $("#header-content-searchs").fadeOut('fast');
                    $(window).scroll(function(event){ this.didScroll = true; });
                    setInterval(function() { if (this.didScroll) { 
                        var lastScrollTop = 50; 
                        var delta = 5; 
                        var navbarHeight = $("#mainNav").outerHeight();

                        var st = $(this).scrollTop(); 

                        if (Math.abs(lastScrollTop - st) <= delta) 
                        return;

                            if (st > 180){ 
                                this.search_bars = true;
                                $("#header-content-searchs").fadeIn(200);
                            } 
                            else { 
                                $("#header-content-searchs").fadeOut('fast');
                            }
                        this.didScroll = false; 
                    }}, 1);
                } else {

                    this.search_bars = true;
                    $("#header-content-searchs").fadeIn(200);
                    $(window).scroll(function(event){ this.didScroll = false; });
                }
            }
        },
        created() {

            if(localStorage.getItem('user_id')) {
                this.login_check = true;
             } else {
                 this.login_check = false;
             }

             var userId =  localStorage.getItem('user_id');
           
           this.$http.get(`${Server_IP}/alert/user/${userId}`,{
                headers: {
                    Authorization: localStorage.getItem('token')
                }})
            .then(response => {
                return response.json();
            }).then(data => {
                if(data.status == 0) {
                    this.alertResult = data.result;
                    
                    
                } else {
                    
                }
            }, error => {
                console.log(error);
            });


            if(this.$route.path === "/") {
                $(window).scroll(function(event){ this.didScroll = true; });
                setInterval(function() { if (this.didScroll) { 
                    var lastScrollTop = 50; 
                    var delta = 5; 
                    var navbarHeight = $("#mainNav").outerHeight();

                    var st = $(this).scrollTop(); 

                    if (Math.abs(lastScrollTop - st) <= delta) 
                    return;

                        if (st > 180){ 
                            this.search_bars = true;
                            $("#header-content-searchs").fadeIn(200);
                        } 
                        else { 
                            $("#header-content-searchs").fadeOut('fast');
                        }
                    this.didScroll = false; 
                }}, 1);
            } else {
               
               
            }
           
                
                
               
                
                
           
           



            this.$EventBus.$on('signup_exit',this.signup_exit );
            this.$EventBus.$on('signup_open',this.signup_open );
            this.$EventBus.$on('login_exit',this.login_exit );

            
            this.$EventBus.$on('login_off',this.login_off );
            this.$EventBus.$on('signup_off',this.signup_off );

            this.$EventBus.$on('feedback_exit',this.feedback_click );
            
        },

        updated() {

        },

        mounted() {
            if(this.$route.path !== "/") {
                $("#header-content-searchs").show(); 
                
            }
        },

        methods : {

              foo(timestamp){



            var date = new Date(timestamp);

            var yyyy = date.getFullYear();
            var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
            var dd  = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      
            var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();


            return yyyy+ "-" + mm + "-" + dd+ "  " + hh+ ":" + min;


        },
        // 타입값을 줘서 마이페이지에서 바로 이동할수있게 해야할듯
        goType(type, userAlertId) {
            this.$http.get(`${Server_IP}/alert/check/${userAlertId}`,{
                headers: {
                    Authorization: localStorage.getItem('token')
                }})
            .then(response => {
                return response.json();
            }).then(data => {
                if(data.status == 0) {
                    
                    
                    
                } else {
                    
                }
            }, error => {
                console.log(error);
            });

            return this.$router.push('mypage?type='+type)
        },

            checkType(index) {
                switch(index) {
                    case 1:
                        return "메세지";
                    case 2:
                        return "재능교환";
                    case 3:
                        return "재능교환";
                    default:
                        return "에러";
                }
            },

            checkText(type, name) {
                switch(type) {
                    case 1:
                        return name + "님 에게 메세지가 도착했습니다.";
                    case 2:
                        return name + "님 에게 재능교환 요청이 도착했습니다.";
                    case 3:
                        return name + "님과의 재능교환이 성사되었습니다.";
                    default:
                        return "에러";
                }
            },


            feedback_click(){
                this.feedback = !this.feedback;
            },
            login_off() {
                this.login_check = true;
                this.login = false; 
            },

            signup_off() {
               this.login_check = false;
               this.signup = false; 
                this.login = true; 
            },

            search_click() {
                //window.location.href = "/search?tag="+this.search_value;
                this.$router.push('/search?tag='+this.search_value);
                this.$EventBus.$emit('searchs',this.search_value );
            },

            search_bar_onoff() {
                this.search_bar = !this.search_bar
            },

            logout() {
                localStorage.removeItem("user_id");
                window.location.reload();
            },

            login_click() {
                this.login = true;
            },

            login_exit () {
               this.login = false; 
            },

            signup_open() {
                this.login = false;
                this.signup = true;
            },

            signup_exit() {
               this.signup = false; 
            }


        }

    }
</script>

<style scoped>

    #mainNav {
        font-family: "Noto Sans KR","Apple Gothic","돋움",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif !important;

        box-shadow : 0 1px 2px 2px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
    }

    .navbar-header{
        width : 100%; 
        float: none; 
        text-align : center; 
    }

    .navbar {
        font-weight: 300;
        height : 60px;
        background-color: white;
    }

    
    .header-top {
        width : 1280px;
        height: 50px;
        margin: 0 auto;
    }

    .header-top-logo {
        float : left;
        width : 160px;
        line-height: 50px;
        color: black;
        font-size: 1.1em;
        font-weight: 700;
    }

    .header-top-logo span {
        
        font-weight: 400;
        font-size: 1.1em;
        color: black;
    }

    .header-top-menu {
        float : right;
        line-height: 50px;
        margin-right: 2%;   
        color: black;
    }

    .header-top-menu span  {
        font-weight: 400;
        font-size: 1.1em;
        float : right;
        color: black;
        margin-right : 15px;
        cursor: pointer;
    }

    
    #header-content-searchs {
        display: none;
        float: left;
        margin: 0 auto;
        text-align: center;
        width: 600px;
        margin-left : 20px;
        margin-top : 10px;
    }


    
    #search_bar {
        position: absolute;
        width: 100%;
        height: 30px;
        margin-top : 12px;
        margin-left : 50px;
        border-radius: 5px;
        padding-left: 40px;
        z-index: 1;
    }

    
    .header-content-searchs-img {
        line-height: 38px;
        margin-top : 8px;
        margin-left : 60px;
        width : 15px;
        height: 15px;
        z-index: 2;
        position: absolute;
    }


    #header-content-searchs img{
        
        width : 20px;
        height: 20px;
    }


    @media ( max-width: 1280px ) {

        .navbar-header{
            width : 1280px;
        }

        .header-top {
            margin-left : 2%;
        }

        
    }

        .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        width: 120px;
        height : 70px;
        padding-top : 10px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-top : 2px solid #b2f;
    }

    .dropdown-content span {
        color: black;
        text-decoration: none;
        text-align : left;
        padding-left : 6px;
        font-size : 10px;
        margin-top : 5px;
    }

    .dropdown-content a {
        text-decoration : none;
    }

    .dropdown {
        position: relative;
        display: inline-block;
        float : right;
    }


    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {background-color: #3e8e41;}


    .alert_dropdown {
        position: relative;
        display: inline-block;
        float : right;
        cursor: pointer;

    }

    .alert_dropdown_content {
        display: none;
        position: absolute;
        background-color: #fff;
        border : 2px solid #bfbfbf;
        width: 450px;
        height : 500px;
        left : -350px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-top : 2px solid #b2f;
        overflow: auto;
    }

    /* Change color of dropdown links on hover */
    .alert_dropdown_content a:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .alert_dropdown:hover .alert_dropdown_content {display: block;}

    .alert_dropdown_list:hover {
        background-color : #fafafa
    }



</style>

<style>

  .navbar-custom .nav li a:hover, .navbar-custom .nav li a:active  {
        color : black;

        opacity : 1;
    }

    .el-input--prefix .el-input__inner  {
        height: 33px;
    }

    .el-input__icon {
        line-height: 33px;
    }


</style>
