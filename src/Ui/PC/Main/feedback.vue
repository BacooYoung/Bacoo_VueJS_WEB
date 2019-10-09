<template>
    <div class="feedback_from">
        <div class="feedback">

            <div class="feedback_name">
                <span>의견</span>
            </div>

            <div class="feedback_name_input">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 10}"
                    placeholder="자유롭게 적어주세요!"
                    v-model="text">
                </el-input>
            </div>

            <div class="feedback_btn" @click="btn_click">
                <span>피드백 보내기</span>
                
            </div>

        </div>
    </div>
</template>

<script>
    import {Server_IP} from '../../../server/serverIP'
export default {
  
    data() {
            return {
                text : "",
                type : 0,
            }
    },

    created() {

        
        
    },

    mounted() {

        const exit_add = () => {this.$EventBus.$emit('feedback_exit',"0");} 
            $(document).click(function(e){ 
                if(e.target.className =="feedback_from"){
                    exit_add();
                } 
                
        });

    },

    props : {
        datas : {}
    },
    methods : {

        btn_click() {
            if(this.text === "") {
                alert("텍스트 입력해주세요.");
            }
            else {
                        

            this.$http.post(`${Server_IP}/add/feedback` , {
                    "userId" : localStorage.getItem("user_id") ? localStorage.getItem("user_id")  : "guest",
                    "text" : this.text

                })
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        alert("소중한 의견 감사합니다.");
                        this.$EventBus.$emit('feedback_exit',"0");
                        
                    }, error => {
                        console.log(error);
                    });
                   
                
                
            }
        }


    }
}
</script>


<style>


    .feedback_from {
        background : rgba(0,0,0,.5); 
        width : 100%;   
        height: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }

    .feedback {
        position: absolute;
        width: 400px;
        height: auto;
        padding: 20px 25px;
        top: 30%;
        left: 38%;
        text-align: center;
        background-color: #ffffff;
        border-radius: 5px;
    }

    .feedback_name {
        width: 100%;
        height: 20px;
        text-align: left;
    }

    .feedback_name span {
        font-weight: 700;
    }

    .feedback_name_input {
        
        width: 100%;
        text-align: left;
        margin-top : 10px;
    }

    .feedback_name_input input {
        
        width: 100%;
        height: 30px;
        padding-left : 10px;
        
    }

    .feedback_level {
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 40px;
    }

    .feedback_level {
        font-weight: 700;
    }

    .feedback_level_input {
        
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 10px;
    }

    .feedback_level input {
        
        width: 100%;
        padding-left : 10px;
        
    }

    .feedback_level_from {
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

    .feedback_level_from span {
        line-height: 22px;
    }

    .feedback_btn {
        width: 100%;
        height: 30px;;
        margin-top: 50px;
        background-color: #5C7CFA;
    }

    .feedback_btn span {
        line-height: 30px;
        color : white;
        font-size: 14px;
        cursor: pointer;
    }
</style>


