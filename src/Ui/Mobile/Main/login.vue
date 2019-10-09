<template>

 <div class="login">

            <div class="login_form">


                <div class="login_form_title">
                    <span>로그인</span>
                </div>

                <div class="login_form_line">
                </div>

                <div class="login_form_input_email">
                    <input type="text" placeholder="이메일"  v-model="email"/>
                </div>

                <div class="login_form_input_password">
                    <input type="password" placeholder="비밀번호" v-model="password"/>
                </div>

                <div class="login_form_login_btn" @click="login_click">
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
                    <router-link to="/signup"><span>회원가입</span></router-link>
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
        
        created() {

        },
        
        mounted() {
            
            this.$EventBus.$emit('header_check',this.search_value );
        },

        methods : {
            signup_click() {
                this.$EventBus.$emit('signup_open',"0" );
            },

            login_click() {
                this.$http.post(`${Server_IP}/login`, {
                    email: this.email,
                    password : this.password
                })
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        
                        
                        localStorage.setItem('user_id', data.result.user_id);
                        localStorage.setItem('token', data.result.token);
                        this.$EventBus.$emit('login_check',0);
                        this.$router.push('/');
                    } else {
                        //this.$router.push('/')
                        alert("로그인 실패");
                        this.$route.go('/');
                    }
                }, error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>
.login {
    width : 100%;   
    height: 100%;
    margin-top : 80px;
}

.login_form{
    position: absolute;
    width : 100%;   
    height: 100%;
    padding: 24px 35px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
}

.login_form_title {
    width : 100%;   
    height: 20px;
    margin-top : 10px;
}

.login_form_line {
    
    width : 100%;   
    height: 1px;
    background-color: #3d3d3d;
    margin-top : 20px;
}

.login_form_title span {
    font-size : 22px;
    font-weight: 700;
}

.login_form_input_email {
    margin-top : 50px;
    width : 100%;   
    height: 40px;
}

.login_form_input_email input {

    width : 100%;   
    height: 40px;
    padding-left : 10px;
}

.login_form_input_password {
    margin-top : 15px;
    width : 100%;   
    height: 40px;
}

.login_form_input_password input {

    width : 100%;   
    height: 40px;
    padding-left : 10px;
}

.login_form_login_btn  {
    margin-top : 30px;
    width : 100%;   
    background-color : #1C7ED6;
    height: 40px;
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
    width : 100%;   
    text-align : left;
}

.login_form_login_text span {
    
    font-weight:500;
}


.login_form_login_signup{

    float: left;
    width : 100%;   
    background-color : #1C7ED6;
    height: 40px;
    cursor: pointer;
}
</style>
