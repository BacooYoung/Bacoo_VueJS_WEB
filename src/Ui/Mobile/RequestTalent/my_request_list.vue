<template>
  <div class="my_request_info">
                <div class="my_request_info_1" v-on:click="list_open">
                    
                    <div class="my_request_info_1_title">
                        <span>{{title}}</span>
                    </div>

                    
                    <div class="my_request_info_1_want">

                        <div class="want_div" v-for="(hadlists, index) in hadlist" :key="index" >
                            <span>{{hadlists}}</span>
                        </div>
                        
                    </div>

                    <div class="my_request_info_1_study">
                         <div class="study_div" v-for="(wantlists, index) in wantlist" :key="index" >
                            <span>{{wantlists}}</span>
                        </div>
                    </div> 

                </div>

                <div class="my_request_info_2" v-if="list_click">
                    <div class="my_request_info_2_left">
                        <div class="my_request_info_2_left_title">
                            <span  v-if="edit_mode==false">{{title}}</span>
                            <input v-else type="text" v-model="title"/>
                            
                        </div>
                        <div class="my_request_info_2_left_line"></div>
                        
                        <div class="my_request_info_2_left_content">
                            <span v-html="content"  v-if="edit_mode==false"></span>
                            <el-input
                                v-else
                                class="input_area"
                                type="textarea"
                                :autosize="{ minRows: 10}"
                                v-model="content_temp">
                            </el-input>
                        </div>
                        

                        <div class="user_info_btn" @click="info_click">
                            <span>프로필 확인</span>
                        </div>

                        <div class="user_info_div" v-if="info">
                            <div class="my_request_info_2_right_name">
                                <span>{{name}}</span>
                            </div>

                            <div class="my_request_info_2_right_had">
                                <span>가지고있는 재능</span>
                            </div>

                            <div class="my_request_info_2_right_had_list">
                               <div class="had_div_list" v-for="(hadlists_self, index) in hadlist" :key="index">
                                    <span>{{hadlists_self}}</span>
                                </div>
                                

                            </div>

                            
                            <div class="my_request_info_2_right_hope">
                                <span>배우고싶은 재능</span>
                            </div>

                            <div class="my_request_info_2_right_hope_list">
                               <div class="my_request_info_2_right_hope_list">
                                    <div class="hope_div_list" v-for="(wantlists_self, index) in wantlist" :key="index">
                                        <span>{{wantlists_self}}</span>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div class="my_request_info_2_left_btn"  v-if="edit_mode==false">
                            <div class="btn_no" @click="edit_on">
                                <span>수정하기</span>
                            </div>
                            <div class="btn_ok" @click="edit_delete">
                                <span>삭제하기</span>
                            </div>
                        </div>

                        <div class="my_request_info_2_left_btn" v-else  @click="edit_end">
                            <div class="btn_edit">
                                <span>수정 완료</span>
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
                content_temp : "",
                content : "",
                name : "",
                time : "",
                type : "",
                info : false,
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

            this.title = this.result.title;
            this.date = "2017-10-21";
            this.content_temp = this.result.say;
            this.content = this.result.say;
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

            

            edit_delete() {
                      
                if(this.loading === false) {
                     this.loading = true;

                    var tlId =   this.result.talentlistId;
          
                    this.$http.get(`${Server_IP}/delete/myrequest/${tlId}`,{
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }})
                        .then(response => {
                            return response.json();
                        }).then(data => {
                            if(data.status == 0) {
                                alert("삭제 완료");
                                this.loading = false;
                                
                                window.location.reload();

                            } else if(data.status == 1) {
                                alert("삭제 실패");
                                this.loading = false;
                            } 
                            else {
                                 this.loading = false;
                                alert("삭제 실패");
                            }
                        }, error => {
                            console.log(error);
                        });
                    } else {
                        alert('처리중');
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
                    "userId" : this.result.userId,
                    "title" : this.title,
                    "hadlist" : this.result.hadTalent,
                    "wantlist" : this.result.wantTalent,
                    "hadlistlevel" : this.result.hadTalentLevel,
                    "wantlistlevel" : this.result.wantTalentLevel,
                    "tags" : 0,
                    "type" : this.type,
                    "time" : this.time,
                    "location" : this.result.wantLocation,
                    "say" : this.content_temp,
                    "talentlistId" : this.result.talentlistId
                    
                },{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
                .then(response => {
                    return response.json();
                }).then(data => {
                    if(data.status == 0) {
                        alert("완료");
                        
                     this.loading = false;
                        this.content = this.content_temp;
                        this.content = this.content.replace(/\x20/gi, "&nbsp;");
                        this.content = this.content.replace(/\x0D\x0A/gi, "<br/>");
                        this.content = this.content.replace(/\x0D/gi, "<br/>");
                        this.content = this.content.replace(/\n/gi, "<br/>"); 

                    } else {
                        alert("실패");
                        
                    }
                }, error => {
                    console.log(error);
                });
            }else {
                alert('처리중');
            }



                
            },

            edit_on() {
                this.edit_mode = true;
            },
            info_click() {
                this.info = !this.info;
            },


            list_open() {
                this.list_click = !this.list_click;
            },

            init_data() {
                
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

.my_request_info {
    margin-top: 20px;
    float: left;
    width: 100%;
    padding-left : 10px;
    padding-right : 7px;
   
}


.my_request_info_1 {

    border : 1px solid #ced4da;
    box-shadow: 3px 3px 6px 0px #aaaaaa; 
    overflow: hidden;
    height: auto;
    width: 99%;
}

.my_request_info_2 {
    
    width: 99%;
    height : 100%;
    margin-top : 10px;
}

.my_request_info_1_title {
    float: left;
    width: 56%;
    height : 100%;
    margin-left : 15px;
    margin-top : 10px;
}

.my_request_info_1_want {
    float: left;
    width: 45%;
    overflow: hidden;
    height: auto;
    margin-left : 10px;
    margin-top : 20px;
}

.my_request_info_1_want span {
    font-size : 10px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;

}

.my_request_info_1_study {
    float: right;
    max-width: 45%;

    overflow: hidden;
    height: auto;
    margin-top : 20px;
    margin-right : 10px;
}

.my_request_info_1_study span {
    font-size : 10px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.my_request_info_1_title span {
    font-size : 12px;
    font-weight: 700;
}


.my_request_info_1_location {
    overflow: hidden;
    height: auto;
    font-size : 10px;
    font-weight: 500;
    margin-top : 13px;
    margin-right : 5px;
    color : #746C6C;
    float: right;

}


.my_request_info_1_location span {
    font-size : 11px;
    color : #006CFF;
    font-weight: 500;
    margin-left : 5px;
    margin-right : 10px;
}

.my_request_info_2_left {
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

.my_request_info_2_left_title {
    text-align: center;
    margin-bottom: 20px;
    margin-top : 50px;
    margin-left : 10%;
    margin-right : 10%;
}

.my_request_info_2_left_title span {
    font-size : 16px;
    color : black;
    font-weight: 500;
}

.my_request_info_2_left_line {
    background-color : #000000;
    width : 80%;
    height: 1px;
    margin : 0 auto;
    
}

.my_request_info_2_left_content {
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

.my_request_info_2_left_btn {
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

.my_request_info_2_right_name {
    margin-top:10px;
    width : 100%;
    height: 30px;
    text-align : center;
}

.my_request_info_2_right_name span {
    
    line-height : 32px;
    font-size : 18px;
    color : #000000;
    font-weight: 500;
}

.my_request_info_2_right_had {
    
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}

.my_request_info_2_right_had_list {
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


.my_request_info_2_right_hope {
    width : 100%;
    overflow: hidden;
    height: auto;
    margin-top:30px;
    text-align: left;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}


.my_request_info_2_right_hope_list {
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

.my_request_info_2_right_location_list {
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

.my_request_info_2_right_myinfo_list {
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


.my_request_info_2_right_location {
    text-align: left;
    margin-top : 100px;
    margin-left : 5%;
    color : #000000;
    font-weight: 400;
}

.my_request_info_2_right_myinfo{
    
    text-align: left;
    margin-left : 5%;
    color : #000000;
    font-weight: 400;
}


.my_request_info_2_right_my_self {
    width : 100%;
    height: 30px;
    margin-top:30px;
    text-align: left;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}


.my_request_info_2_right_my_self_text {
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



.my_request_info_2_left_btn {
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

.btn_edit {
    width : 90%;
    
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
</style>
