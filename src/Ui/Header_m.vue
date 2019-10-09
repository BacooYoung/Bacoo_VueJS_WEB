<template>

<div>
    
    <transition name="fade">
        <SearchBar_m v-if="searchbar"/>
    </transition>

   <nav id="mainNav"  style="width : 100%;  text-align: center; background-color: rgba( 255, 255, 255, 0.5 );" class="navbar navbar-default navbar-custom navbar-fixed-top">
            <!-- Brand and toggle get grouped for better mobile display -->



        <div id="mySidenav" class="sidenav">
            <span class="closebtn" @click="close">&times;</span>
            <span @click="go('')" >홈</span>
            <span @click="go('talent/request')" v-if="login_check">재능요청</span>
            <span @click="go('mypage')" v-if="login_check">마이페이지</span>
            <span @click="go('login')" v-if="login_check == false">로그인</span>
            <span @click="logout" v-if="login_check">로그아웃</span>
        </div>
        

        <div class="header-top"  >

            <div class="header-top-left">
                <img src="https://i.imgur.com/5JujWZj.png" @click="open"/>
            </div>

            <div class="header-top-logo">
                <router-link :to="'/'" ><img width="100" height="25" src="../assets/img/bacoologo.png"  /></router-link>
            </div>
            
            <div class="header-top-menu">
                <div class="navbar-header page-scroll">

                     <div class="header-content-search-img" >
                        <img src='https://i.imgur.com/Ulpp2Bb.png' @click="search_bar_onoff"/>
                    </div>

                    <div class="header-content-alert-img" v-if="login_check">
                        <img src='https://i.imgur.com/mZv1vzz.png' @click="alertGo"/>
                        <div style="
                            position: absolute;
                            width: 17px;
                            height: 17px;
                            background-color: #b2f;
                            right: 13px;
                            line-height : 13px;
                            border-radius: 50px;
                            top: -5px;">
                            <span style="font-size : 12px; color : #fff;">{{alertResult.length}}</span>
                            </div>
                    </div>

               
                
                </div>

            </div>
    
        </div>

    </nav>

</div>
</template>

<script>
    import {Server_IP} from '../server/serverIP'

    export default {
        
        
        data() {
            return {
                search_value : "",
                search : false,
                url : "", 
                login_check : false,
                feedback : false,
                searchbar : false,
                iconSizes: 'small',
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

        },
        created() {
            window.scrollTo(0, 0);

            this.check_login();
                        
            if(this.$route.path == "/") {
                this.search = false;

            } else {
                this.search = true;
                if (this.$route.path == "/search") {
                    this.search_value = this.$route.query.tag;
                }
            }

            this.$EventBus.$on('login_check',this.check_login );
            this.$EventBus.$on('search_check',this.search_bar_off );

            this.$EventBus.$on('feedback_exit',this.feedback_click );
            
            if(this.login_check) {
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
            }
           

            
         },

        updated() {

        },

        mounted() {
             if(this.search == true) {

                $(".header").css({height : "100px"});
            }
        },

        methods : {
        
            feedback_click(){
                this.feedback = !this.feedback;
            },
            logout() {
                localStorage.removeItem("user_id");
                this.$router.push(`/`);
                window.location.reload();
            },

            search_bar_off() {
                this.searchbar = false;
            },
            
            search_bar_onoff() {
                this.searchbar = !this.searchbar;
            },

            go(url) {
                this.$router.push(`/${url}`);
                document.getElementById("mySidenav").style.width = "0px";  
            },

            open() {
                document.getElementById("mySidenav").style.width = "200px";  
            },

            close() {
                document.getElementById("mySidenav").style.width = "0px";  
            },

            logout() {
                localStorage.removeItem("user_id");
                window.location.reload();
            },

            check_login() {
                if(localStorage.getItem('user_id')) {
                this.login_check = true;
             } else {
                 this.login_check = false;
             }
            },

            alertGo() {
                    this.$router.push("/alert", null)
                
            },


            search_click() {

                if(this.search_value == "") {
                    this.search = false;

                } else {
                    this.search = true;
                }


                if(this.search) {
                    this.url = "/search";
                    this.$router.push({ path: '/search', query: { tag: this.search_value }})
                    this.$EventBus.$emit('searchs',this.search_value );
                } else {

                    
                    this.$router.push('/');
                }

                
            }
                
        },

    }
</script>

<style scoped>

</style>

<style>


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
        height : 50px;
        background-color: white;
    }

    
    .header-top {
        width : 100%;
        height: 40px;
        padding-right: 5%;
        padding-top : 3%;
    }

    .header-top-meun-left {
        width : 33%;
        float: left;
        height: 40px;
    }

    .header-top-left img {
        
        width : 25px;
        height: 25px;
    }

    .header-top-left {
        width : 33%;
        height: 30px;
        float : left;
        text-align : left;
        padding-left : 20px;
        padding-top : 1%;
    }

    .header-top-logo {
        width : 33%;
        height: 30px;
        margin: 0 auto;
        text-align : center;
        float : left;
    }

    .header-top-logo span { 
        color : #ffffff;
    }


    
   
    
   #search_bar_2 {
    width: 80%;
    height: 30px;
    border-radius: 0px;
}

    
   
.header-content-search-img-div{
    width : 22px;
    height: 30px;
    float : right;
    border-left : 1px solid #707070;
}
.header-content-search-img  {
    
    width : 100%;
}

.header-content-alert-img  {
    
    width : 75px;
    padding-right : 15px;
    position: relative;
}

.header-content-alert-img img {
    
    float: right;
    width : 25px;
    height: 25px;
}


.header-content-search-img img {
    
    float: right;
    width : 25px;
    height: 25px;
}

    #header-content-search img{
    
    width : 15px;
    height: 15px;
}

.header-top-menu {
    width : 100px;
    float : right;
    position: relative;
}

.sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 10; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #f87a65; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav span {
    padding: 8px 8px 8px 8px;
    text-decoration: none;
    font-size: 25px;
    color: #3d3d3d;
    display: block;
    transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav span:hover {
    color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 36px;
    margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
    transition: margin-left .5s;
    padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
 transform: translateX(10px);
  opacity: 0;
}
</style>
