<template>
    <div class="add_request_from">
        <div class="add_request">
            <div class="exit_btn"><img src="https://i.imgur.com/OQcRDFM.png" alt="" @click="exit"></div>
        
            <div class="add_request_name">
                <span>하고싶은말</span>
            </div>

            <div class="add_request_name_input">
                <el-input
                    type="textarea"
                    maxRows = '2'
                    placeholder="Please input"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    v-model="request_say">
                    </el-input>
            </div>

            <div class="add_request_btn" @click="btn_click">
                <span>요청하기</span>
            </div>

        </div>
    </div>
</template>

<script>
    import {Server_IP} from '../../../server/serverIP'
export default {
  
    data() {
            return {
                request_say : "",
                listId : "",
                myId : "",
                youId : ""
            }
    },

    created() {

        if(this.datas.type !== 0) {
            this.location_name = this.datas.location_name;

            this.type = this.datas.type;
        }   

        
        
    },

    mounted() {

        this.listId = this.datas.talentlistId;
        this.myId = localStorage.getItem('user_id');
        this.youId = this.datas.userId;

        const exit_add = () => {this.$EventBus.$emit('add_request_exit',"0");} 
            $(document).click(function(e){ 
                if(e.target.className =="add_request_from"){
                    exit_add();
                } 
                
        });
    },

    props : {
        datas : {}
    },

    methods : {
        exit() {
            this.$EventBus.$emit('add_request_exit',0);
            
        },

        btn_click() {
            if(this.request_say === "") {
                alert("하고싶은말을 입력해주세요.");
            }
            else {
                this.$http.post(`${Server_IP}/request/add`, {
                      talentlistId : this.listId, // 해당 재능 요청글
                      requestuserId : this.myId, // 요청 보낸사람
                      receiveduserId : this.youId, // 요청 받는사람
                      requestText : this.request_say
                    },{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if(data.status == 0) {
                            alert("요청이 완료되었습니다.");
                            this.$EventBus.$emit('add_request_exit',{request_say : this.request_say});
                            
                        } else if(data.status == 1) {
                            alert("서버 오류");
                        } 
                        else {

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


    .add_request_from {
        background : rgba(0,0,0,.5); 
        width : 100%;   
        height: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }

    .add_request {
        position: absolute;
        width: 80%;
        height: 330px;
        padding: 20px 25px;
        top : 20%;
        left : 10%;
        text-align: center;
        background-color: #ffffff;
        border-radius: 5px;
    }

    .add_request_name {
        float:left;
        width: 100%;
        height: 20px;
        text-align: left;
    }

    .add_request_name span {
        font-weight: 700;
    }

    .add_request_name_input {
        float : left;
        width: 100%;
        text-align: left;
        margin-top : 10px;
    }

    .add_request_name_input input {
        
        width: 100%;
        height: 50px;
        padding-left : 10px;
        
    }

    .add_request_level {
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 40px;
    }

    .add_request_level {
        font-weight: 700;
    }

    .add_request_level_input {
        
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 10px;
    }

    .add_request_level input {
        
        width: 100%;
        padding-left : 10px;
        
    }

    .add_request_level_from {
        width: 25%;
        height: 27px;
        border: 1px solid #3d3d3d;
        border-radius: 50px;
        text-align: center;
        float : left;
        margin : 0 auto;
        margin-right: 6%;
        cursor: pointer;
    }

    .add_request_level_from span {
        line-height: 22px;
    }

    .add_request_btn {
        float: left;
        width: 100%;
        height: 35px;
        margin-top: 50px;
        background-color: #5C7CFA;
    }

    .add_request_btn span {
        line-height: 35px;
        height: 35px;
        color : white;
        font-size: 16px;
        cursor: pointer;
    }

    .add_request_btn2 {
        width: 100%;
        height: 50px;
        margin-top: 10px;
        background-color: #5C7CFA;
    }

    .add_request_btn2 span {
        line-height: 50px;
        color : white;
        font-size: 20px;
        cursor: pointer;
    }

    .exit_btn {
        width : 100%;
        height: 40px;
        text-align: right;
    }

    .exit_btn img {
        width : 25px;
        height: 25px;
        float : right;
        font-size : 22px;
    }
</style>


