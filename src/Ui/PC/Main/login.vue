<template v-on:click="exit">

 <div class="login" >

            <div class="login_form">

                <div class="header-top-logo">
                    <img width="140" height="30" src="../../../assets/img/bacoologo.png"/>
                </div>

                <div class="login_from_line">
                </div>

                <div class="login_form_input_email" @keyup.enter="login_click">
                    <input type="text" placeholder="이메일" v-model="email" />
                </div>

                <div class="login_form_input_password" @keyup.enter="login_click">
                    <input type="password" placeholder="비밀번호" v-model="password" />
                </div>

                <div class="login_form_login_btn" @click="login_click" >
                    <span>로그인</span>
                </div>

                <div class="login_form_login_foget">
                    <router-link :to="'/forgot'">
                        <span>비밀번호 찾기</span>
                    
                    </router-link>
                </div>

                <div class="login_form_login_text">
                    <span>아직도 회원이 아니세요?</span>
                </div>

                <div class="login_form_login_signup">
                    <span v-on:click="signup_click" >회원가입</span>
                </div>

            </div>
            
        </div>
  
</template>

<script>
    import Vue from 'vue'
    import {Server_IP} from '../../../server/serverIP'

    let test = new Vue();
    export default {

        data() {
            return {
                email : "",
                password : ""
            }
        },
        
        mounted() {
            window.scrollTo(0, 0);
            
            const exit_login = () => {this.$EventBus.$emit('login_exit',"0" );} 
            $(document).click(function(e){ 
                if(e.target.className =="login"){
                   exit_login();
                } 
                    
            });
        },

        methods : {
            signup_click() {
                this.$EventBus.$emit('signup_open',"0" );
            },

            login_click() {

                if(this.email === "") {
                    alert("이메일을 입력해주세요");
                } else if(this.password === "") {
                    alert("비밀번호를 입력해주세요.");
                } else {
                    this.$http.post(`${Server_IP}/login`, {
                    email: this.email,
                    password : this.password
                },{
                    headers: {
                        Authorization: 'dXNlcjpwYXNzd29yZA=='
                    }})
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        this.$notify({
                            title: '로그인',
                            message: '정상적으로 로그인이 되었습니다.',
                            type: 'success',
                            position: 'top-left'
                        });
                        
                        localStorage.setItem('user_id', data.result.user_id);
                        localStorage.setItem('token', data.result.token);
                        //

                        
                        this.$EventBus.$emit('login_off',"0" );

                        window.location.reload();
                        //this.$router.push('/')
                        
                    } else {
                        //this.$router.push('/')
                        alert("로그인 실패");
                    }
                }, error => {
                    console.log(error);
                });
                }

                
            }
        }
    }
</script>

<style>
.login {
    background : rgba(0,0,0,.5); 
    width : 100%;   
    height: 100%;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
}

.login_form{
    position: absolute;
    top: 30%;
    left: 37%;
    padding: 24px 35px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
}

.login_form_title {
    width : 400px;
    height: 20px;
}

.login_form_title span {
    font-size : 18px;
    font-weight: 700;
}

.login_form_input_email {
    margin-top : 30px;
    width : 400px;
    height: 40px;
}

.login_form_input_email input {

    width : 400px;
    height: 40px;
    padding-left : 10px;
}

.login_form_input_password {
    margin-top : 15px;
    width : 400px;
    height: 40px;
}

.login_form_input_password input {

    width : 400px;
    height: 40px;
    padding-left : 10px;
}

.login_form_login_btn  {
    margin-top : 30px;
    width : 400px;
    background-color : #1C7ED6;
    height: 40px;
    cursor: pointer;
}


.login_form_login_btn span, .login_form_login_signup span {
    font-size : 18px;
    font-weight:500;
    color : #ffffff;
    line-height : 40px;
}

.login_form_login_foget {
    margin-top : 5px;
    float: right;

}

.login_form_login_foget span {
    color : blue;
}

.login_form_login_text {
    
    margin-top : 70px;
    width : 400px;
    text-align : left;
}

.login_form_login_text span {
    
    font-weight:500;
}


.login_form_login_signup{

    float: left;
    width : 400px;
    background-color : #f87a65;
    height: 40px;
    cursor: pointer;
}

.header-top-logo {
    width: 100%;
    height: 50px;

}

.login_from_line{
    width: 100%;
    height: 2px;
    background-color: #3d3d3d;
}
</style>
