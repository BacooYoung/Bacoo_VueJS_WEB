<template>

 <div class="signup">

            <div class="signup_form">


                <div class="signup_form_title">
                    <span>회원가입</span>
                </div>

                <div class="login_form_line">
                </div>

                <div class="signup_form_input_email">
                    <input type="email" placeholder="이메일" v-model="email"/>
                </div>

                <div class="signup_form_input_password">
                    <input type="password" placeholder="비밀번호" v-model="password"/>
                </div>

                 <div class="signup_form_input_password_check">
                    <input type="password" placeholder="비밀번호 확인"  v-model="password_check"/>
                </div>

                <div class="signup_form_input_name">
                    <input type="text" placeholder="이름" v-model="name"/>
                </div>

                <div class="signup_form_input_phone">
                    <input type="text" placeholder="핸드폰 번호" v-model="phone"/>
                </div>
                

                <div class="signup_form_signup_btn" v-on:click="signup_go()">
                    <span>회원가입</span>
                </div>


            </div>
            
        </div>
  
</template>

<script>
    
    import {Server_IP} from '../../../server/serverIP'
    export default {
        data() {
            return {
                email : "",
                password : "",
                password_check : "",
                name : "",
                phone : "",
                loading : false

            }
        },
        
        mounted() {
            const exit_signup = () => {this.$EventBus.$emit('signup_exit',"0" );} 
            $(document).click(function(e){ 
                if(e.target.className =="signup"){
                   exit_signup();
                } 
                    
            });
            this.$EventBus.$emit('header_check',this.search_value );
        },

        methods : {
            signup_click() {
                this.$EventBus.$emit('signup_open',"0" );
            },

            signup_go () {
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if(this.loading === false) {
                    this.loading = true;
                    if(this.email == "") {
                        alert("이메일을 입력해주세요.");
                            this.loading = false;
                    } else if (this.email.match(regExp) == null) {
                        alert("이메일 주소를 확인해주세요.");
                            this.loading = false;
                    } else if(this.password == "") {
                        alert("비밀번호를 입력해주세요.");
                            this.loading = false;
                    } else if(this.password_check == "") {
                        alert("비밀번호 확인을 입력해주세요.");
                            this.loading = false;
                    } else if(this.password != this.password_check) {
                        alert("비밀번호가 서로 일치하지않습니다.");
                            this.loading = false;
                    } else if(this.name == "") {
                        alert("이름을 입력해주세요.");
                            this.loading = false;
                    } else if(this.phone == "") {
                        alert("핸드폰 번호를 입력해주세요.");
                            this.loading = false;
                    } else {
                        this.$http.post(`${Server_IP}/signup`, {
                        email: this.email,
                        password : this.password,
                        name : this.name,
                        phone : this.phone
                        })
                        .then(response => {
                            return response.json();
                        }).then(data => {
                            if(data.status == 0) {
                                
                                
                                alert("회원가입 성공");

                            this.loading = false;
                                this.$router.push('/login');
                                window.location.reload();
                            } else if(data.status == 5) {
                                
                                
                            this.loading = false;
                                
                                alert("이미 존재하는 아이디 입니다.");
                            } else {
                                
                            this.loading = false;
                                //this.$router.push('/')
                                alert("회원가입 실패");
                            }
                        }, error => {
                            this.loading = false;
                            console.log(error);
                        });
                    }
                }
            }
        }
    }
</script>

<style>
.signup {
    background : rgba(0,0,0,.5); 
    width : 100%;   
    height: 100%;
    margin-top : 80px;
}

.signup_form{
    position: absolute;
    width : 100%;   
    height : 100%;   
    padding: 24px 35px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
}

.signup_form_title {
    width : 100%;   
    height: 20px;
    margin-top : 10px;
}

.signup_form_title span {
    font-size : 22px;
    font-weight: 700;
}

.login_form_line {
    
    width : 100%;   
    height: 1px;
    background-color: #3d3d3d;
    margin-top : 20px;
}

.signup_form_input_email {
    margin-top : 50px;
    width : 100%;   
    height: 40px;
}

.signup_form_input_email input {

    width : 100%;   
    height: 40px;
    padding-left : 10px;
}

.signup_form_input_password {
    margin-top : 15px;
    width : 100%;   
    height: 40px;
}

.signup_form_input_password input {

    width : 100%;   
    height: 40px;
    padding-left : 10px;
}

.signup_form_input_password_check {
    margin-top : 15px;
    width : 100%;   
    height: 40px;
}

.signup_form_input_password_check input {

    width : 100%;   
    height: 40px;
    padding-left : 10px;
}

.signup_form_input_name {
    margin-top : 15px;
    width : 100%;   
    height: 40px;
}

.signup_form_input_name input {

    width : 100%;   
    height: 40px;
    padding-left : 10px;
}

.signup_form_input_phone {
    margin-top : 15px;
    width : 100%;   
    height: 40px;
}

.signup_form_input_phone input {

    width : 100%;   
    height: 40px;
    padding-left : 10px;
}


.signup_form_signup_btn  {
    margin-top : 30px;
    width : 100%;   
    background-color : #1C7ED6;
    height: 40px;
}


.signup_form_signup_btn span, .signup_form_signup_signup span {
    font-size : 18px;
    font-weight:500;
    color : #ffffff;
    line-height : 40px;
}

.signup_form_signup_foget {
    margin-top : 5px;
    float: right;

}

.signup_form_signup_foget span {
    color : blue;
}

.signup_form_signup_text {
    
    margin-top : 70px;
    width : 100%;   
    text-align : left;
}

.signup_form_signup_text span {
    
    font-weight:500;
}


.signup_form_signup_signup{

    float: left;
    width : 100%;   
    background-color : #1C7ED6;
    height: 40px;
}
</style>
