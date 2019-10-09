<template>
  <div class="myprofile_content">
            <div class="myprofile_content_name">
                <span>이메일</span>

                <el-input disabled="disabled" placeholder="제목을 입력해주세요."  class="myprofile_content_name_input" v-model="email"></el-input>
            </div>

            <div class="myprofile_content_name">
                <span>이름</span>

                <el-input disabled="disabled" placeholder="이름을 입력해주세요."  class="myprofile_content_name_input" v-model="name"></el-input>
            </div>

            <div class="myprofile_content_name">
                <span>성별</span>

                <div>
                    <el-radio v-model="gender" label="1" border>남자</el-radio>
                    <el-radio v-model="gender" label="2" border>여자</el-radio>
                </div>
            </div>

            <div class="myprofile_content_name">
                <span>생년월일</span>

                
                <el-date-picker
                    v-model="birthday"
                    type="date"
                    placeholder="Pick a day">
                </el-date-picker>
            </div>

            <div class="myprofile_content_name">
                <span>간단한 자기소개</span>

                <el-input  placeholder="간단한 자기소개를 입력해주세요."  class="myprofile_content_name_input" v-model="aboutme"></el-input>
            </div>



            <div class="myprofile_content_done" @click="myprofile_click">
                <span>저장하기</span>

            </div>

        </div>
</template>


<script>
    import {Server_IP} from '../../../server/serverIP'
    export default {

        data() {
            return {
                email : "",
                aboutme : "",
                search_val : "",
                name : "",
                gender  : "",
                birthday : "",
                result : []

            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

                
            var userId =  localStorage.getItem('user_id');

            this.$http.get(`${Server_IP}/userinfo/${userId}`,{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
            .then(response => {
                return response.json();
            }).then(data => {
                if(data.status == 0) {
                    this.email = data.result[0].email;
                    this.aboutme = data.result[0].aboutMe;
                    this.name = data.result[0].name;
                    this.gender = data.result[0].gender;
                    this.birthday = data.result[0].birthday;
                    this.result = data.result[0];
                    
                    
                } else {
                    
                }
            }, error => {
                console.log(error);
            });
                

            

           
        },
        watch : {
        },
        mounted() {
         
        },

        beforeDestroy() {
        
        },
        methods: {

            

            myprofile_click() {

                this.$http.post(`${Server_IP}/user/info/`, {
                    "userinfoId" : this.result.userinfoId,
                    "hadlist" : this.result.hadTalent,
                    "wantlist" : this.result.wantTalent,
                    "hadlistlevel" : this.result.hadTalentLevel,
                    "wantlistlevel" : this.result.wantTalentLevel,
                    "type" : this.result.wantType,
                    "time" : this.result.wantTime,
                    "location" : this.result.wantLocation,
                    "say" : this.aboutme,
                    "gender" : this.gender,
                    "birthday" : this.birthday

                    
                    
                },{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        alert("완료");
                        window.location.reload();
                    } else {
                        alert("실패");
                        
                    }
                }, error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>

</style>


<style scoped>


.myprofile_content {
    width : 900px;
    margin-top : 30px;
    margin : 0 auto;
    margin-bottom: 100px;
}


.myprofile_content_name {
    width : 1028;
    height: 35px;
    margin-top : 50px;
}

.myprofile_content_name span {
    width : 1028px;
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.myprofile_content_name_input {
    
    
    float: left;
    width : 400px;
    height: 100%;
}


.myprofile_content_done {
    width : 200px;
    height: 40px;
    margin-top : 60px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    text-align : center;
    cursor: pointer;
}

.myprofile_content_done span {
    width : 200px;
    float: left;
    font-size : 18px;
    color : #ffffff;
    font-weight: 400;
    line-height : 40px;
}


</style>

