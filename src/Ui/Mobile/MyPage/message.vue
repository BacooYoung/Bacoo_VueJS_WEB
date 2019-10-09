<template>
    <div class="message_from">
        <div class="message">
            <div class="exit_btn"><img src="https://i.imgur.com/OQcRDFM.png" alt="" @click="exit"></div>
        
            <div class="message_header">
                <div class="onoff">
                    <div class="ooss" v-if="status === false"></div>
                    <div class="ssoo" v-else></div>
                    <span>{{name.name}} 님과의 대화</span>
                    
                </div>
            </div>
            
            <div id="message_list" class="message_list" ref='messageDisplay' >
                <div class="message_info">
                    <span>재능교환 전 개인정보를 알려주지 마세요.<br/>휴대폰 번호, 주소, 직장 등 개인정보를 입력하지 마세요.</span>
                </div>
                <div v-for="(results , index) in result" :key="results.id">
                    
                    <div class="message_list_text" v-if="results.myId !== myIds">
                        <div class="message_list_text_name">
                            <span>{{results.name}}</span>
                            <span style="font-size : 10px;">{{foo(results.messageTime)}}</span>
                        </div>

                        <div class="message_list_text_box">
                            <div class="message_list_text_box_layout">
                                <span v-html="results.messageText"></span>
                                
                            </div>
                        </div>
                    </div>

                    <div class="message_list_text_me" v-else>
                        <div class="message_list_text_name_me">
                            <span>{{foo(results.messageTime)}}</span>
                        </div>

                        <div class="message_list_text_box_me">
                            <div class="message_list_text_box_me_layout">
                                <span v-html="results.messageText"></span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            
            <div class="message_input">
                <div class="message_input_div">
                    <el-input
                    type="textarea"
                    maxRows = '2'
                    placeholder="Please input"
                    v-model="text">
                    </el-input>
                </div>

                <div class="message_input_btn" @click="add_massage">
                    <span>전송</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {Server_IP} from '../../../server/serverIP'
import io from 'socket.io-client';

export default {
  
    data() {
        return {
            talent_name : "",
            result : [],
            nodata : false,
            myIds : 0,
            youIds : 0,
            text : "",
            status : false,
            loading : false
        }
    },

    props : {
        myId : 0,
        youId : 0,
        name : ""
    },

    updated: function() { 
        var el = document.getElementById("message_list"); 
        el.scrollTop = el.scrollHeight; 
    },

    mounted() {
        const socket = io('https://new.frome.co.kr:2100');


        const exit_add = () => {this.$EventBus.$emit('message_exit',"0");socket.emit('forceDisconnect', "0"); } 
            $(document).click(function(e){ 
                if(e.target.className =="message_from"){
                    exit_add();
                } 
                
        });

        this.myIds = this.myId.myId;
        this.youIds = this.youId.youId;

        socket.emit('init', {myId : this.myId.myId, youId : this.youId.youId});
        socket.on('add_message', this.add_message);
        socket.on('check_status', this.check_status);
        

        this.$http.post(`${Server_IP}/message/matched`, {
            myId : this.myId.myId,
            youId : this.youId.youId
        },{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
            .then(response => {
                return response.json();
            }).then(data => {
                if(data.status == 0) {
                    this.result = data.result;

                    this.result.map( (content, i) => {
                        var contents;
                        contents = content.messageText.replace(/\x20/gi, "&nbsp;");
                        contents= content.messageText.replace(/\x0D\x0A/gi, "<br/>");
                        contents = content.messageText.replace(/\x0D/gi, "<br/>");
                        contents = content.messageText.replace(/\n/gi, "<br/>"); 
                        this.result[i].messageText = contents;
                    });
                    //스크롤 최하단으로 뿌리는거 연구해야함
                } else if(data.status == 1) {
                    this.nodata =true;
                } 
                else {
                    this.result = [];
                    this.check = false;
                }
            }, error => {
                console.log(error);
            });


            


    },
    methods : {

        exit() {
            this.$EventBus.$emit('message_exit',0);
            
        },

        add_message(data) {
            this.result.push({
                messageText : data.text,
                messageTime : new Date(),
                myId : data.myId,
                yourId : data.youId,
            });    
            
            this.status = true;
        },

        check_status(data) {
            this.status = data.status === 'on' ? true : false;
        },

         foo(timestamp){

            var date = new Date(timestamp);


            var yyyy = date.getFullYear();
            var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
            var dd  = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      
            var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();


            return yyyy+ "-" + mm + "-" + dd+ "  " + hh+ ":" + min;

        },


        add_massage() {
            if(this.loading === false) {
                this.loading = true;

                if(this.text !== "") {
                    this.$http.post(`${Server_IP}/message/add`, {
                        myId : this.myId.myId,
                        youId : this.youId.youId,
                        text : this.text,
                        time : new Date()
                    },{
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }})
                        .then(response => {
                            return response.json();
                        }).then(data => {
                            
                            if(data.status == 0) {
                                var contents;
                                contents = this.text.replace(/\x20/gi, "&nbsp;");
                                contents= this.text.replace(/\x0D\x0A/gi, "<br/>");
                                contents = this.text.replace(/\x0D/gi, "<br/>");
                                contents = this.text.replace(/\n/gi, "<br/>"); 
                                this.text = contents;
                                this.result.push({
                                    messageText : this.text,
                                    messageTime : new Date(),
                                    myId : this.myIds,
                                    yourId : this.youIds,
                                });
                                
                                this.text = "";
                                
                                this.loading = false;
                            } else if(data.status == 1) {
                                this.nodata =true;
                                
                                this.loading = false;
                            } 
                        }, error => {
                            console.log(error);
                        });    
                    }
                }
            
            
        }
    }


}
</script>


<style>


    .message_from {
        background : rgba(0,0,0,.5); 
        width : 100%;   
        height: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }

    .message {
        position: absolute;
        width: 90%;
        height: auto;
        top: 10%;
        left: 5%;
        text-align: center;
        background-color: #ffffff;
        border-radius: 10px;
    }

    .message_header {
        width: 100%;
        height: 50px;
        background-color : #F87A65;
        border-top-left-radius : 10px;
        border-top-right-radius : 10px;
        text-align : center;
        color : #ffffff;
        float: left;
    }

    .message_header span {
        line-height: 50px;
        font-size: 16px;
    }

    .message_list {
        width : 100%;
        height: 300px;
        background-color: #ffffff;
        overflow-x: hidden; 
        overflow-y: scroll; 
        float: left;
        padding-bottom: 50px;
    }

    .message_list_text {
        width : 100%;
        height: auto;
        text-align: left;
        float:left;

    }

    .message_list_text_name {
        width : 100%;
        height: 50px;
        padding-left : 20px;
        padding-top : 20px;
        
    }

    .message_list_text_box {
        width : 50%;
        height: auto;
        padding-left : 20px;
        padding-top : 5px;
    }

    .message_list_text_box span {
        min-width: 100px;
        color : #ffffff;
        text-align: left;
    }

    .message_list_text_box_layout {
        padding : 6px;
        height: auto;
        text-align: left;
        border-radius: 5px;
        background-color: #F87A65;
        display:inline-block;
    }

    .message_list_text_box_layout span{
        
        text-align: left;
    }

    .message_list_text_me {
        width : 100%;
        height: auto;
        text-align: right;
        float: left;

    }

    .message_list_text_name_me {
        width : 100%;
        height: 50px;
        padding-right : 20px;
        padding-top : 20px;
        
    }

    .message_list_text_name_me span {
        font-size : 10px;
    }

    .message_list_text_box_me {
        width : 100%;
        height: auto;
        padding-left : 20px;
        padding-top : 5px;
    
        text-align: right;
    }

    .message_list_text_box_me span {
        border-radius: 5px;
        color : #ffffff;
        text-align: left;
        margin-right : 20px;
    }

    .message_list_text_box_me_layout {

        background-color: #5C7CFA;
        padding : 6px;
        height: auto;
        text-align: left;
        border-radius: 5px;
        display:inline-block;
        margin-right : 20px;
    }

    .message_list_text_box_me_layout span {
        
        text-align: left;
    }
  
    .message_input {
        position: relative;
        width : 100%;
        height: auto;
        float: left;
        border-top: 1px solid #3d3d3d;
    }

    .message_input_div {
        float: left;
        width: 80%;
        height: 50px;
    }

    .message_input_div input {
        width: 99%;
        height: 90%;
        border : 1px solid #ffffff;
        padding-left : 20px;
    }

    input:focus {
        outline: none;
    }

    .message_input_btn {
        float: left;
        width : 20%;
        height: 55px;
        background-color: #F87A65;
        text-align: center;
        cursor: pointer;
    }

    .message_input_btn span {
        font-weight: 500;
        font-size: 18px;
        color : #ffffff;
        line-height: 45px;
    }

    .message_info{
        margin: 0 auto;
        margin-top : 10px;
        width: 85%;
        height: 50px;
        border-radius: 15px;
        text-align: center;
        border: 1px solid #3d3d3d;
        padding-top: 3px;
    }

    .message_info span {
        font-weight: 500;
        font-size: 12px;
        color : #000000;
    }

    .el-textarea__inner {
        border: 1px solid #ffffff;
border-bottom-left-radius: 10px;
    }

    .exit_btn {
        position: absolute;
        width : 98%;
        height: 40px;
        text-align: right;
        top : 1%;
    }

    .exit_btn img {
        width : 25px;
        height: 25px;
        float : right;
        font-size : 22px;
    }

    .onoff {
        
        width: 150px;
        margin: 0 auto;
    }

    .onoff span{
        float: left;
    }

    .ooss {
        margin-right : 10px;
        margin-top: 22px;
        float: left;
        width : 8px;
        height: 8px;
        background-color: #ffffff;
        border-radius: 50px;
    }

    .ssoo {
        margin-right : 10px;
        margin-top: 22px;
        float: left;
        width : 8px;
        height: 8px;
        background-color: chartreuse;
        border-radius: 50px;
    }
</style>


