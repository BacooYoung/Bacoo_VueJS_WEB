<template>
    <div class="add_memo_from">
        <div class="add_memo">
            <div class="add_memo_exit_btn"><img src="https://i.imgur.com/OQcRDFM.png" alt="" @click="exit"></div>
        
            <div class="add_memo_name">
                <span>메모하기</span>
            </div>

            <div class="add_memo_name_input">
                <el-input
                    type="textarea"
                    maxRows = '2'
                    placeholder="Please input"
                    :autosize="{ minRows: 7, maxRows: 7}"
                    v-model="memo_say">
                    </el-input>
            </div>

            <div class="add_memo_btn" @click="btn_click">
                <span>저장하기</span>
            </div>

        </div>
    </div>
</template>

<script>
    import {Server_IP} from '../../../server/serverIP'
export default {
  
    data() {
            return {
                memo_say : "",
                matchedId : ""
            }
    },

    created() {
        this.matchedId = this.datas.memo_list.matchedId;
        this.memo_say = this.datas.memo_list.memo;
        
    },

    mounted() {

        const exit_add = () => {this.$EventBus.$emit('memo_exit',"0");} 
            $(document).click(function(e){ 
                if(e.target.className =="add_memo_from"){
                    exit_add();
                } 
                
        });

     
    },

    props : {
        datas : ""
    },

    methods : {
        exit() {
            this.$EventBus.$emit('memo_exit',0);
            
        },

        btn_click() {
            if(this.memo_say === "") {
                alert("메모를 입력해주세요.");
            }
            else {
                this.$http.post(`${Server_IP}/matchedtalent/comment`, {

                    matchedId :this.matchedId,
                    comment : this.memo_say
                    },{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if(data.status == 0) {
                            alert("메모 작성이 완료되었습니다.");
                            this.$EventBus.$emit('memo_exit',{memo : this.memo_say, matchedId : this.matchedId});
                            
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


    .add_memo_from {
        background : rgba(0,0,0,.5); 
        width : 100%;   
        height: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }

    .add_memo {
        position: absolute;
        width: 500px;
        height: 350px;
        padding: 20px 25px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: #ffffff;
        border-radius: 5px;
    }

    .add_memo_name {
        
        width: 100%;
        height: 20px;
        text-align: left;
    }

    .add_memo_name span {
        font-weight: 700;
    }

    .add_memo_name_input {
        
        width: 100%;
        min-height: 150px;
        text-align: left;
        margin-top : 10px;
    }

    .add_memo_name_input input {
        
        width: 100%;
        height: 30px;
        padding-left : 10px;
        
    }

    .add_memo_level {
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 40px;
    }

    .add_memo_level {
        font-weight: 700;
    }

    .add_memo_level_input {
        
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 10px;
    }

    .add_memo_level input {
        
        width: 100%;
        padding-left : 10px;
        
    }

    .add_memo_level_from {
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

    .add_memo_level_from span {
        line-height: 22px;
    }

    .add_memo_btn {
        width: 100%;
        height: 30px;;
        margin-top: 50px;
        background-color: #5C7CFA;
    }

    .add_memo_btn span {
        line-height: 30px;
        color : white;
        font-size: 14px;
        cursor: pointer;
    }

    .add_memo_exit_btn {
        width : 100%;
        height: 40px;
        text-align: right;
    }

    .add_memo_exit_btn img {
        width : 25px;
        height: 25px;
        float : right;
        font-size : 22px;
    }
</style>


