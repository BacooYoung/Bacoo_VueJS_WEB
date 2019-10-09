<template>

    <div class="detail_talent_info">

           
                <div class="detail_talent_info_2">
                    <div class="detail_talent_info_2_left">
                        <div class="detail_talent_info_2_left_title" v-if="title.length > 1">
                            <span v-if="edit_mode==false">{{title}}</span>
                            <input v-else type="text" v-model="title"/>
                        </div>
                        <div class="detail_talent_info_2_left_line" v-if="title.length > 1"></div>
                        
                        <div class="detail_talent_info_2_left_content" v-if="title.length > 1">
                            <span v-if="edit_mode==false" v-html="content"></span>
                            <el-input
                                v-else
                                class="input_area"
                                type="textarea"
                                :autosize="{ minRows: 10}"
                                v-model="content_temp">
                            </el-input>
                        </div>

                        <div class="detail_talent_info_2_left_content" v-else>
                            <span v-html="request_text"></span>
                        </div>

                        <div v-if="typed === 'my'"> 
                            <div class="detail_talent_info_2_left_btn" v-if="edit_mode==false">
                                <div class="btn_no" @click="edit_on">
                                    <span >수정하기</span>
                                </div>
                                <div class="btn_ok" @click="edit_delete">
                                    <span>삭제하기</span>
                                </div>
                            </div>

                            <div class="detail_talent_info_2_left_btn" v-else  @click="edit_end">
                                <div class="btn_edit">
                                    <span>수정 완료</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="typed === 'input'"> 
                            <div class="detail_talent_info_2_left_btn" >
                                <div class="btn_no" @click="request_ok">
                                    <span >수락하기</span>
                                </div>
                                <div class="btn_ok" @click="request_no">
                                    <span>거절하기</span>
                                </div>
                            </div>

                        </div>
                        

                    </div>

                    <div class="detail_talent_info_2_right">
                        <div class="detail_talent_info_2_right_name">
                            <span>{{name}}</span>
                        </div>

                        <div class="detail_talent_info_2_right_had">
                            <span>가지고있는 재능</span>
                        </div>

                        <div class="detail_talent_info_2_right_had_list">
                            <div class="had_div_list_detail" v-for="(hadlists_self, index) in hadlist_self" :key="index">
                                <span>{{hadlists_self}}</span>
                            </div>
                        </div>

                        <div class="detail_talent_info_2_right_hope">
                            <span>배우고싶은 재능</span>
                        </div>

                        <div class="detail_talent_info_2_right_hope_list">
                            <div class="hope_div_list_detail" v-for="(wantlists_self, index) in wantlist_self" :key="index">
                                <span>{{wantlists_self}}</span>
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
                content_temp :"",
                request_text : "",
                name : "",
                time : "",
                type : "",
                indexId : 0,
                edit_mode : false,
                
                hadlist_level : [],
                wantlist_level : [],
                hadlist_level_temps : [],
                wantlist_level_temps : [],
                tagslist : [],
                loading : false
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            this.init_data();

            
            this.date = "2017-10-21";
            this.content = this.result.say ?this.result.say :this.result.requestText;
            this.content_temp = this.result.say;
            this.name = this.result.name;
            this.time = this.result.wantTime;
            this.type = this.result.wantType;

            this.content = this.content.replace(/\x20/gi, "&nbsp;");
            this.content = this.content.replace(/\x0D\x0A/gi, "<br/>");
            this.content = this.content.replace(/\x0D/gi, "<br/>");
            this.content = this.content.replace(/\n/gi, "<br/>"); 

            this.result_list = this.result;
            this.indexId = this.indexs;

            if(this.typed === "my") {
                this.title = this.result.title;
                
                const exit_add = () => {this.$EventBus.$emit('add_detail_exit',"0");} 
                $(document).click(function(e){ 
                    if(e.target.className =="detail_talent_info"){
                        exit_add();
                    } 
                    
                });
            } else if(this.typed === "input") {
                this.request_text = this.result.requestText;
                const exit_add = () => {this.$EventBus.$emit('add_input_detail_exit',"0");} 
                $(document).click(function(e){ 
                    if(e.target.className =="detail_talent_info"){
                        exit_add();
                    } 
                    
                });
            }
            
            
           

        },
        props : {
            result : "",
            indexs : "",
            typed : ""
        },

        watch : {

        },
        mounted() {

        },

        beforeDestroy() {
        
        },
        methods: {

            request_ok() {
                if(this.loading === false) {
                     this.loading = true;
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
                        console.log(data);
                        if(data.status == 0) {
                            this.loading = false;
                            
                            alert("완료");
                            this.$EventBus.$emit('add_input_detail_exit',"0");
                            window.location.reload();
                        } else {
                            this.loading = false;
                            
                            alert("실패");
                            
                        }
                    }, error => {
                        console.log(error);
                    });
                } else {
                    alert("처리중");
                }
                
            },

            request_no() {
                
                if(this.loading === false) {
                     this.loading = true;

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
                        this.loading = false;
                        alert("완료");
                        this.$EventBus.$emit('add_input_detail_exit',"0");
                        window.location.reload();
                    } else {
                        this.loading = false;
                        alert("실패");
                        
                    }
                }, error => {
                    console.log(error);
                });
                } else {
                    alert("처리중");
                }
                
            },

            edit_end() {
                
                if(this.loading === false) {
                    this.loading = true;
                    this.edit_mode = false;

                var hadlist_temp = this.hadlist.map( (hadlists, i) => {
                    return hadlists;
                });

                var hadlist_level_temp = this.hadlist_level.map( (hadlists_level, i) => {
                    return hadlists_level;
                });

                var wantlist_temp =  this.wantlist.map( (wantlist, i) => {
                    return wantlist;
                });

                var wantlist_level_temp =  this.wantlist_level.map( (wantlist_level, i) => {
                  
                    return wantlist_level;
                });

                var location_temp = this.location.map( (location, i) => {
                    return location;
                });

                this.$http.put(`${Server_IP}/edit/myrequest/`, {
                    "userId" : this.result_list.userId,
                    "title" : this.title,
                    "hadlist" : this.result_list.hadTalent,
                    "wantlist" : this.result_list.wantTalent,
                    "hadlistlevel" : this.result_list.hadTalentLevel,
                    "wantlistlevel" : this.result_list.wantTalentLevel,
                    "tags" : 0,
                    "type" : this.type,
                    "time" : this.time,
                    "location" : this.result_list.wantLocation,
                    "say" : this.content_temp,
                    "talentlistId" : this.result_list.talentlistId
                    
                },{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        this.loading = false;
                        alert("완료");
                    } else {
                        this.loading = false;
                        alert("실패");
                        
                    }
                }, error => {
                    console.log(error);
                });
                } else {
                    alert('처리중');
                }

                
            },


            edit_on() {
                this.edit_mode = true;
            },

            edit_delete() {
                      

                var tlId =  this.result_list.talentlistId;
          
                this.$http.get(`${Server_IP}/delete/myrequest/${tlId}`,{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if(data.status == 0) {
                            alert("삭제 완료");
                            
                            this.$EventBus.$emit('add_detail_exit',"0");
                            this.$parent.result.splice(this.indexId, 1)
                        } else if(data.status == 1) {
                            alert("삭제 실패");
                        } 
                        else {
                            alert("삭제 실패");
                        }
                    }, error => {
                        console.log(error);
                    });

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

                if(this.result.hadTalent != null) {
                    this.result.hadTalent.split(',').map( (data)=> {
                        this.hadlist.push(data);
                    });

                    this.result.hadTalentLevel.split(',').map( (data)=> {
                        if(data == 1) {
                            this.hadlist_level_temps.push("하");
                            
                        } else if(data == 2) {
                            this.hadlist_level_temps.push("중");

                        } else if(data == 3) {
                            this.hadlist_level_temps.push("상");

                        }
                        this.hadlist_level.push(data);
                    });
                } else {
                    this.hadlist.push("");
                }
                    

                    if(this.result.wantTalent != null) {
                        this.result.wantTalent.split(',').map( (data)=> {
                            this.wantlist.push(data);
                        });

                    
                        this.result.wantTalentLevel.split(',').map( (data)=> {
                            if(data == 1) {
                                this.wantlist_level_temps.push("하");
                                
                            } else if(data == 2) {
                                this.wantlist_level_temps.push("중");

                            } else if(data == 3) {
                                this.wantlist_level_temps.push("상");

                            }
                            this.wantlist_level.push(data);
                        });
                    } else {
                        this.wantlist.push("");
                    }
                    
                    if(this.result.wantLocation != null) {
                        this.result.wantLocation.split(',').map( (data)=> {
                            this.location.push(data);
                        });
                    } else {
                        this.location.push("");
                    }
                
            }
        }
    }
</script>

<style>

.detail_talent_info {
    background : rgba(0,0,0,.5); 
    width : 100%;   
    height: 100%;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
}

.detail_talent_info_1 {
    box-shadow: 3px 3px 6px 0px #aaaaaa; 

    overflow:hidden;
    height:auto;
    width: 900px;
    border : 1px solid #ced4da;
}

.detail_talent_info_1:hover {
    
    border : 1.1px solid #5C7CFA;
    cursor: pointer;
}
.detail_talent_info_2 {
    
    width: 950px;
    height: auto;    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: #ffffff;
    border-radius: 5px;
    padding : 20px;
    padding-top : 50px;
}

.detail_talent_info_1_title {
    float: left;
    width: 600px;
    margin-left : 20px;
    margin-top : 10px;
}

.detail_talent_info_1_want {
    float: left;
    width: 500px;
    height: 40px;
    margin-left : 20px;
    margin-top : 20px;
}

.detail_talent_info_1_want img {
    width: 15px;
    height: 15px;
    float: left;
    margin-top : 5px;
}

.detail_talent_info_1_want span {
    font-size : 12px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.detail_talent_info_1_study {
    float: right;
    width: 480px;
    height: 40px;
    margin-top : 20px;
    margin-right : 20px;
}

.detail_talent_info_1_study span {
    font-size : 12px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
    margin-top : 5px;
}

.detail_talent_info_1_title span {
    font-size : 16px;
    font-weight: 700;
}


.detail_talent_info_1_location {
    font-size : 10px;
    font-weight: 500;
    margin-top : 5px;
    margin-right : 20px;
    color : #3d3d3d;
    float: right;

}

.detail_talent_info_1_location img {
    width: 15px;
    height: 15px;
    float: left;
}

.detail_talent_info_1_location span {
    font-size : 12px;
    color : #3d3d3d;
    font-weight: 700;
    margin-left : 5px;
    margin-right : 10px;
}

.detail_talent_info_2_left {
    width : 600px;
    height: 100%;
    border : 1px solid #adb5bd;
    float :left;
    text-align : center;
    margin : 0 auto;
    
    border-radius : 5px;

}

.detail_talent_info_2_right {
    margin-left : 20px;
    width : 274px;
    height: auto;
    border-radius : 5px;
    border : 1px solid #adb5bd;
    float : left;

}

.detail_talent_info_2_left_title {
    width : 600px;
    margin-bottom: 20px;
    margin-top : 50px;
}

.detail_talent_info_2_left_title input{
    width : 500px;
    height: 40px;
    padding-left : 15px;

}

.detail_talent_info_2_left_title span {
    width : 200px;
    font-size : 20px;
    color : black;
    font-weight: 500;
}

.detail_talent_info_2_left_line {
    background-color : #000000;
    width: 500px;
    height: 1px;
    margin : 0 auto;
    
}

.detail_talent_info_2_left_content {
    width : 500px;
    min-height: 400px;
    padding-bottom : 50px;
    text-align : left;
    font-weight: 500;
    color : #495057;
    overflow:hidden;
    height:auto;
    margin  : 0 auto;
    margin-top : 50px;
    
}

.input_area {
    width: 50;
}


.detail_talent_info_2_left_btn {
    width : 500px;
    height: 50px;
    margin : 0 auto;

}

.btn_no {
    float : left;
    margin : 0 auto;
    width : 220px;
    height: 35px;
    border-radius: 4px;
    background-color: #409EFF;
    cursor: pointer;
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
    margin-left : 50px;
    width : 220px;
    
    border-radius: 4px;
    height: 35px;
    background-color: #409EFF;
    cursor: pointer;
}

.btn_ok span {
    line-height : 32px;
    font-size : 15px;
    color : #ffffff;
    font-weight: 400;
}

.btn_edit {
    margin : 0 auto;
    width : 220px;
    
    border-radius: 4px;
    height: 35px;
    background-color: #409EFF;
    cursor: pointer;
}

.btn_edit span {
    line-height : 32px;
    font-size : 15px;
    color : #ffffff;
    font-weight: 400;
}

.detail_talent_info_2_right_name {
    margin-top:10px;
    width : 100%;
    height: 30px;
    text-align : center;
}

.detail_talent_info_2_right_name span {
    
    line-height : 32px;
    font-size : 18px;
    color : #000000;
    font-weight: 500;
}


.detail_talent_info_2_right_had {
    
    width : 100%;
    overflow: hidden;
    text-align: left;
    height: auto;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}

.detail_talent_info_2_right_had_list {
    line-height : 22px;
    width : 95%;
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

.detail_talent_info_2_right_hope_list {
    line-height : 22px;
    width : 95%;
    overflow: hidden;
    margin-top:10px;
    margin-left: 20px;
    margin-right : 20px;
    color : #ffffff;
    font-size : 12px;
    font-weight : 400;
    letter-spacing : 1px;

}

.detail_talent_info_2_right_type {
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}


.detail_talent_info_2_right_type_list {
    line-height : 22px;
    width : 95%;
    overflow: hidden;
    margin-top:10px;
    margin-left: 20px;
    margin-right : 20px;
    color : blue;

    text-align: left;
    font-size : 14px;
    font-weight : 700;
    letter-spacing : 1px;

}

.detail_talent_info_2_right_loc {
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}


.detail_talent_info_2_right_loc_list {
    line-height : 22px;
    width : 95%;
    overflow: hidden;
    margin-top:10px;
    margin-left: 20px;
    margin-right : 20px;
    color : #ffffff;
    font-size : 12px;
    font-weight : 400;
    letter-spacing : 1px;

}


.detail_talent_info_2_right_tags {
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}


.detail_talent_info_2_right_tags_list {
    line-height : 22px;
    width : 95%;
    overflow: hidden;
    margin-top:10px;
    margin-left: 20px;
    margin-right : 20px;
    color : #ffffff;
    font-size : 12px;
    font-weight : 400;
    letter-spacing : 1px;

}


.detail_talent_info_2_right_time {
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}


.detail_talent_info_2_right_time_list {
    line-height : 22px;
    width : 95%;
    overflow: hidden;
    margin-top:10px;
    margin-left: 20px;
    margin-right : 20px;
    color : #ffffff;
    font-size : 12px;
    font-weight : 400;
    letter-spacing : 1px;

}


.detail_talent_info_2_right_location_list {
    line-height : 22px;
    width : 100%;
    height: 50px;
    margin-left: 20px;
    margin-right : 20px;
    color : #006CFF;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;

}


.had_div_list_detail {
    height: 24px;
    border-radius :50px;
    background-color : #5C7CFA;
    text-align : center;
    float: left;
    margin-right : 5px;
    margin-bottom : 10px;
    padding-left : 10px;
    padding-right: 10px;
}

.hope_div_list_detail {
    height: 24px;
    padding-left : 10px;
    padding-right: 10px;
    border-radius :50px;
    background-color : #DD5D93;
    text-align : center;
    float: left;
    margin-right : 5px;
    margin-bottom : 10px;
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

.detail_talent_info_2_right_hope {
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}


.detail_talent_info_2_right_location {
    width : 100%;
    height: 30px;
    margin-top:10px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}

.detail_talent_info_2_right_my_self {
    width : 100%;
    height: 30px;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}


.detail_talent_info_2_right_my_self_text {
    line-height : 22px;
    width : 100%;
    margin-left: 20px;
    margin-right : 20px;
    margin-bottom : 40px;
    color : #006CFF;
    font-size : 14px;
    font-weight : 500;
    letter-spacing : 1px;

}

</style>
