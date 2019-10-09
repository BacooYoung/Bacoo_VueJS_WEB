<template>
  <div class="input_request_info">
                <div class="input_request_info_1" v-on:click="list_open">
                    
                    <div class="input_request_info_1_title">
                        <span>{{name}}</span>
                    </div>

                     
                    <div class="input_request_info_1_want">

                        <div class="want_div" v-for="(hadlists, index) in hadlist" :key="index" >
                            <span>{{hadlists}}</span>
                        </div>
                        
                    </div>

                    <div class="input_request_info_1_study">
                         <div class="study_div" v-for="(wantlists, index) in wantlist" :key="index" >
                            <span>{{wantlists}}</span>
                        </div>
                    </div>

                </div>

                <div class="input_request_info_2" v-if="list_click">
                    <div class="input_request_info_2_left">
                        
                        <div class="input_request_info_2_left_content">
                            <span v-html="content"></span>
                        </div>
                        

                        <div class="user_info_btn" @click="info_click">
                            <span>프로필 확인</span>
                        </div>

                        <div class="user_info_div" v-if="info">
                            <div class="input_request_info_2_right_name">
                                <span>{{name}}</span>
                            </div>

                            <div class="input_request_info_2_right_had">
                                <span>가지고있는 재능</span>
                            </div>

                            <div class="input_request_info_2_right_had_list">
                               <div class="had_div_list" v-for="(hadlists_self, index) in hadlist_self" :key="index">
                                    <span>{{hadlists_self}}</span>
                                </div>
                                

                            </div>

                            
                            <div class="input_request_info_2_right_hope">
                                <span>배우고싶은 재능</span>
                            </div>

                            <div class="input_request_info_2_right_hope_list">
                               <div class="input_request_info_2_right_hope_list">
                                    <div class="hope_div_list" v-for="(wantlists_self, index) in wantlist_self" :key="index">
                                        <span>{{wantlists_self}}</span>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div class="input_request_info_2_left_btn">
                            <div class="btn_no" @click="request_ok">
                                <span >수락하기</span>
                            </div>
                            <div class="btn_ok" @click="request_no">
                                <span>거절하기</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
</template>

<script>

    import {Server_IP} from '../../../server/serverIP'
  export default {

        data() {
            return {
                list_click : false,
                title : "",
                date : "",
                hadlist : [],
                wantlist : [],
                location : [],
                hadlist_self : [],
                wantlist_self : [],
                location_self : [],
                hadlist_count : 0,
                wantlist_count : 0,
                location_count : 0,
                content : "",
                name : "",
                time : "",
                type : "",
                info : false
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            
            this.init_data();

            this.date = "2017-10-21";
            this.content = this.result.requestText;
            this.name = this.result.name;
            this.time = this.result.wantTime;
            this.type = this.result.wantType;

            this.content = this.content.replace(/\x20/gi, "&nbsp;");
            this.content = this.content.replace(/\x0D\x0A/gi, "<br/>");
            this.content = this.content.replace(/\x0D/gi, "<br/>");
            this.content = this.content.replace(/\n/gi, "<br/>"); 


           
        },
        props : {
            result : ""
        },

        watch : {

        },
        mounted() {

        },

        beforeDestroy() {
        
        },
        methods: {

            request_ok() {
                this.$http.post(`${Server_IP}/request/talent/status`, {
                    "requesttalentId" : this.result.requesttalentId,
                    "myId" : this.result.receiveduserId,
                    "youId" : this.result.requestuserId,
                    "type" : "ok"
                    
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
                        this.$EventBus.$emit('add_input_detail_exit',"0");
                    } else {
                        alert("실패");
                        
                    }
                }, error => {
                    console.log(error);
                });
            },

            request_no() {
                this.$http.post(`${Server_IP}/request/talent/status`, {
                    "requesttalentId" : this.result.requesttalentId,
                    "myId" : this.result.receiveduserId,
                    "youId" : this.result.requestuserId,
                    "type" : "no"
                
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
                        this.$EventBus.$emit('add_input_detail_exit',"0");
                    } else {
                        alert("실패");
                        
                    }
                }, error => {
                    console.log(error);
                });
            },
            info_click() {
                this.info = !this.info;
            },


            list_open() {
                this.list_click = !this.list_click;
            },

            init_data() {
                this.result.hadTalent.split(',').map( (data,i)=> {
                    if(i > 4) {
                        this.hadlist_count += 1;

                        if(i ==  this.result.hadTalent.split(',').length-1) {
                            this.hadlist.push("+ "+this.hadlist_count);
                        }
                    }  
                    
                    else {
                        
                        this.hadlist.push(data);
                    }

                    this.hadlist_self.push(data);
                });
                this.result.wantTalent.split(',').map( (data,i)=> {
                    if(i > 4) {
                        this.wantlist_count += 1;

                        if(i ==  this.result.wantTalent.split(',').length-1) {
                            this.wantlist.push("+ "+this.wantlist_count);
                        }
                    } else {
                        this.wantlist.push(data);
                        

                    }

                    
                    this.wantlist_self.push(data);
                });
                
                this.result.wantLocation.split(',').map( (data,i)=> {
                    if(i > 4) {

                    } else {
                        this.location.push(data);

                    }

                    this.location_self.push(data);
                });
                
            }
        }
    }
</script>

<style>

.input_request_info {
    margin-top: 20px;
    float: left;
    width: 98%;
   
}


.input_request_info_1 {

    border : 1px solid #ced4da;
    box-shadow: 3px 3px 6px 0px #aaaaaa; 
    overflow: hidden;
    height: auto;
    width: 99%;
}

.input_request_info_2 {
    
    width: 99%;
    height : 100%;
    margin-top : 10px;
}

.input_request_info_1_title {
    float: left;
    width: 56%;
    height : 100%;
    margin-left : 15px;
    margin-top : 10px;
}

.input_request_info_1_want {
    float: left;
    width: 45%;
    overflow: hidden;
    height: auto;
    margin-left : 10px;
    margin-top : 20px;
}

.input_request_info_1_want span {
    font-size : 10px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;

}

.input_request_info_1_study {
    float: right;
    max-width: 45%;

    overflow: hidden;
    height: auto;
    margin-top : 20px;
    margin-right : 10px;
}

.input_request_info_1_study span {
    font-size : 10px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.input_request_info_1_title span {
    font-size : 12px;
    font-weight: 700;
}


.input_request_info_1_location {
    overflow: hidden;
    height: auto;
    font-size : 10px;
    font-weight: 500;
    margin-top : 13px;
    margin-right : 5px;
    color : #746C6C;
    float: right;

}


.input_request_info_1_location span {
    font-size : 11px;
    color : #006CFF;
    font-weight: 500;
    margin-left : 5px;
    margin-right : 10px;
}

.input_request_info_2_left {
    width : 100%;
    height: 100%;
    border : 1px solid #adb5bd;
    float :left;
    text-align : center;
    margin : 0 auto;
    box-shadow: 3px 3px 6px 0px #aaaaaa; 
}

.user_info_div {
    margin-left : 7%;
    margin-top : 30px;
    width: 87%;
    height: 100%;
    border-radius : 5px;
    border : 1px solid #adb5bd;

}

.input_request_info_2_left_title {
    text-align: center;
    margin-bottom: 20px;
    margin-top : 50px;
    margin-left : 10%;
    margin-right : 10%;
}

.input_request_info_2_left_title span {
    font-size : 16px;
    color : black;
    font-weight: 500;
}

.input_request_info_2_left_line {
    background-color : #000000;
    width : 80%;
    height: 1px;
    margin : 0 auto;
    
}

.input_request_info_2_left_content {
    margin-top : 100px;
    margin-left : 10%;
    width : 80%;
    padding-bottom : 150px;
    text-align : left;
    font-weight: 500;
    color : #495057;
}

.user_info_btn {
    
    margin-left : 30%;
    margin-right : 30%;
    height: 30px;
    border-bottom: 1px solid #3d3d3d;
}

.user_info_btn span {
    color : #0031FF;
}

.want_div {
    height: 22px;
    border-radius :50px;
    background-color : #5C7CFA;
    text-align : center;
    margin-bottom: 10px;
    float: left;
    margin-right : 5px;
    padding-left : 10px;
    padding-right : 10px;
}

.study_div {
    height: 22px;
    border-radius :50px;
    background-color : #DD5D93;
    text-align : center;
    margin-bottom: 10px;
    float: left;
    margin-right : 5px;
    padding-left : 10px;
    padding-right : 10px;
}

.input_request_info_2_left_btn {
    width : 100%;
    height: 50px;
    margin-top : 150px;
}

.btns {
    margin : 0 auto;
    width : 220px;
    
    height: 35px;
    background-color : #0031FF;
}

.btns span {
    line-height : 32px;
    font-size : 15px;
    color : #ffffff;
    font-weight: 400;
}

.input_request_info_2_right_name {
    margin-top:10px;
    width : 100%;
    height: 30px;
    text-align : center;
}

.input_request_info_2_right_name span {
    
    line-height : 32px;
    font-size : 18px;
    color : #000000;
    font-weight: 500;
}

.input_request_info_2_right_had {
    
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}

.input_request_info_2_right_had_list {
    line-height : 22px;
    width : 100%;
    overflow: hidden;
    margin-top:10px;
    height: auto;
    margin-left: 20px;
    margin-right : 20px;
    color : #ffffff;
    font-size : 12px;
    font-weight : 400;
    letter-spacing : 1px;

}


.input_request_info_2_right_hope {
    width : 100%;
    overflow: hidden;
    height: auto;
    margin-top:30px;
    text-align: left;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}


.input_request_info_2_right_hope_list {
    line-height : 22px;
    width : 100%;
    overflow: hidden;
    margin-top:10px;
    height: auto;
    margin-left: 10px;
    margin-right : 20px;
    color : #ffffff;
    font-size : 12px;
    font-weight : 400;
    letter-spacing : 1px;

}

.input_request_info_2_right_location_list {
    line-height : 22px;
    margin-top: 15px;
    margin-left : 5%;
    margin-bottom: 40px;
    text-align: left;
    font-size : 14px;
    height: 100%;
    color : #006CFF;
    font-weight : 500;
    letter-spacing : 1px;
}

.input_request_info_2_right_myinfo_list {
    line-height : 22px;
    margin-top: 15px;
    margin-left : 5%;
    margin-bottom: 40px;
    text-align: left;
    font-size : 14px;
    height: 100%;
    color : #006CFF;
    font-weight : 500;
    letter-spacing : 1px;
}



.had_div_list {
    min-width: 45px;
    height: 22px;
    border-radius :50px;
    background-color : #5C7CFA;
    text-align : center;
    float: left;
    margin-right : 5px;
    margin-bottom : 10px;
    padding-left :10px;
    padding-right :10px;
    
}

.hope_div_list {
    min-width: 45px;
    height: 22px;
    border-radius :50px;
    background-color : #dd5d93;
    text-align : center;
    float: left;
    margin-right : 5px;
    margin-bottom : 10px;
    padding-left :10px;
    padding-right :10px;
}

.location_div_list {
    width : 53px;
    height: 24px;
    border-radius :50px;
    background-color : #82c91e;
    text-align : center;
    float: left;
    margin-right : 5px;
    margin-bottom : 10px;
}


.input_request_info_2_right_location {
    text-align: left;
    margin-top : 100px;
    margin-left : 5%;
    color : #000000;
    font-weight: 400;
}

.input_request_info_2_right_myinfo{
    
    text-align: left;
    margin-left : 5%;
    color : #000000;
    font-weight: 400;
}


.input_request_info_2_right_my_self {
    width : 100%;
    height: 30px;
    margin-top:30px;
    text-align: left;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}


.input_request_info_2_right_my_self_text {
    line-height : 22px;
    width : 100%;
    text-align: left;
    margin-left: 20px;
    margin-right : 20px;
    margin-bottom : 40px;
    color : #006CFF;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;

}



.input_request_info_2_left_btn {
    width : 100%;
    height: 50px;
    margin : 0 auto;
    margin-left : 5%;
    margin-top : 100px;

}

.btn_no {
    float : left;
    margin : 0 auto;
    width : 40%;
    height: 35px;
    background-color : #0031FF;
}

.btn_no span {
    line-height : 32px;
    font-size : 15px;
    color : #ffffff;
    font-weight: 400;
}

.btn_ok {
    float : left;
    margin : 0 auto;
    margin-left : 30px;
    width : 40%;
    
    height: 35px;
    background-color : #0031FF;
}

.btn_ok span {
    line-height : 32px;
    font-size : 15px;
    color : #ffffff;
    font-weight: 400;
}

</style>
