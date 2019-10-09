<template>
  <div class="fogot">


      
        <div class="fogot_content" v-if="type === 1">

          <div class="forgot_content_fome">
              <span>비밀번호 찾기</span>
              <div class="forgot_content_fome_div">
                  <span>이메일 : </span>
                  <el-input placeholder="이메일을 입력해주세요." v-model="email"></el-input>
              </div>

               
          </div>
            <el-button type="success" @click="go_email()">찾기</el-button>
        </div>

      <div class="fogot_ok" v-else-if="type === 2">
        <span>입력 하신 이메일로 전송했습니다.</span>
      </div>

      <div class="fogot_go" v-else-if="type === 3">
          <span>비밀번호 변경</span>
        <el-input type="password"  placeholder="비밀번호를 입력해주세요." v-model="password"></el-input>
        <el-input type="password" placeholder="비밀번호를 다시 입력해주세요." v-model="passwordcheck"></el-input>
         <el-button type="success" @click="go_pw()">변경 하기</el-button> 
      </div>
  </div>
</template>

<script>
    import {Server_IP} from '../../../server/serverIP'

export default {

    data() {
            return {
                email : "",
                type : 1,
                password : "",
                passwordcheck : "",
                token : ""   
            }
        },

    created() {

     this.$EventBus.$emit('login_exit',"0" );

   
     
    },

    

    methods: {
        go_email() {
            this.$http.post(`${Server_IP}/forgot/`, {
                email: this.email,
            })
            .then(response => {
                return response.json();
            }).then(data => {
                this.type = 2;
            }, error => {
                console.log(error);
            });
        },
        go_pw() {
            this.$http.post(`${Server_IP}/forgot/pw`, {
                email: this.token,
                password : this.password
            })
                .then(response => {
                    return response.json();
                }).then(data => {
                    alert("변경 완료!");
                    this.$router.push('/');
                }, error => {
                    console.log(error);
                });
        }
    }
}
</script>


<style scoped>
    .fogot {
        width : 1024px;
        height: 500px;
        text-align: center;
        margin : 0 auto;
    }

    .fogot_go{
        
        margin : 0 auto;
        margin-top : 300px;
        width : 600px;
        height: 100px;
    }

    .fogot_go span {
        
        font-size: 30px;
        font-weight: 700;
    }

    .el-input, .el-button {
        margin-top : 50px;
    }

    .fogot_content {
        width : 600px;
        height: 100px;
        margin : 0 auto;
        margin-top : 200px;
    }

    .fogot_ok{
        margin : 0 auto;
        margin-top : 300px;
        width : 600px;
        height: 100px;
        font-size: 26px;
        font-weight: 700;
    }

    .forgot_content_fome {
        
        width : 600px;
        height: 100px;
        margin : 0 auto;
    }

    .forgot_content_fome{
        font-size: 30px;
        font-weight: 700;

    }

    .forgot_content_fome_div {
        
        width : 600px;
        height: 100px;
        margin : 0 auto;
        margin-top : 100px;
        float: left;
    }

    .forgot_content_fome_div span {
        
        font-size: 20px;
        font-weight: 600;
        float: left;
    }
</style>
