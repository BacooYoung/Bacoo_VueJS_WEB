<template>
    <div class="request_content">
            <Add_Talent_m v-if="add_talent" :datas = "data"/>
            <Add_Location_m v-if="add_location" :datas = "location_data"/>

            <div class="request_content_title">
                <span>제목</span>
                <el-input placeholder="제목을 입력해 주세요." class="request_content_title_input" v-model="title"></el-input>

            </div>


            <div class="request_content_had">
                <span>나의 재능</span>
                
                <div class="edit">
                    <p @click="add_talent_open(1)">+ 재능 추가</p>
                </div>

                <div class="request_content_had_list">
                    
                    <div class="list_had" v-for="(hadlists, index) in hadlist" v-bind:key ="index" v-if="hadlist[0] != '' || add_had">
                        <span @click="talent_click(hadlists,hadlist_level_temps[index],index,1)">{{hadlists}} - ({{hadlist_level_temps[index]}})</span>
                    </div>

                    <div class="list_had" v-if="hadlist[0] == '' || hadlist == null">
                        <span>아직 등록된 재능이 없습니다!</span>
                    </div>
                    <div class="list_had" v-if="hadlist[0] == ''  || hadlist == null">
                        <span>재능 추가 버튼을 통해 재능을 등록해보세요!</span>
                    </div>


                    

                </div>
            </div>

            <div class="request_content_want">
                <span>원하는 재능</span>

                <div class="edit">
                    <p @click="add_talent_open(2)">+ 재능 추가</p>
                </div>

                <div class="request_content_want_list">
                    
                   <div class="list_wnat"  v-for="(wantlists, index) in wantlist" v-bind:key ="index" v-if="wantlist[0] != '' || add_want">
                        <span @click="talent_click(wantlists,wantlist_level_temps[index],index,2)">{{wantlists}} ({{wantlist_level_temps[index]}})</span>
                    </div>

                    <div class="list_wnat"  v-if="wantlist[0] == '' || wantlist == null">
                        <span>원하시는 재능을 선택해주세요</span>
                    </div>

                    

                </div>
            </div>

            <div class="request_content_stydy_type">
                <span>원하는 수업 방식</span>

                <div class="request_content_stydy_type_list">
                    
                    <div class="list_stydy_type_on" v-bind:style="list_stydy_type_on" @click="type_click(1)">
                        <span v-bind:style="list_stydy_type_on_span">온라인</span>
                    </div>

                    <div class="list_stydy_type_off"  v-bind:style="list_stydy_type_off" @click="type_click(2)">
                        <span v-bind:style="list_stydy_type_off_span">오프라인</span>
                    </div>



                </div>
            </div>

            <div class="request_content_time" v-if="type == 1">
                <span>원하는 시간</span>
            </div>

            <div v-if="type == 1"> 
                <el-time-select
                    class="el-time-select"
                        placeholder="Start Time"
                        v-model="startTime" 
                        :picker-options="{
                        start: '06:00',
                        step: '00:15',
                        end: '24:00'
                        }">
                    </el-time-select>
                    <el-time-select
                    class="el-time-select"
                        placeholder="End Time"
                        v-model="endTime"
                        :picker-options="{
                        start: '06:00',
                        step: '00:15',
                        end: '24:00',
                        minTime: startTime
                        }">
                    </el-time-select>
               
            </div>

            <div class="request_content_location" v-if="type == 2">
                <span>원하는 장소</span>
                <div class="edit">
                    <p @click="add_location_open">+ 장소 추가</p>
                </div>
                <div class="request_content_location_list">
                    
                    <div class="list_location" v-for="locations in location" v-bind:key ="locations" v-if="location[0] != '' || add_location" >
                        <span @click="location_click(locations,index,1)">{{locations}}</span>
                   </div>

                    <div class="list_location"  v-if="location[0] == '' " >
                        <span>원하시는 장소를 등록해주세요.</span>
                    </div>

                    

                </div>
            </div>

            <div class="request_content_tags">
                <span class="request_content_tags_span">태그</span>
                <div class="request_content_tags_img_div">
                    <el-tooltip class="item" effect="dark" content="재능과 관련된 태그로 설정하시면 많은 재능인들이 볼수있어요!" placement="top">
                        <img width="15" height="15" src="https://i.imgur.com/ylTBTMu.png"/>
                    </el-tooltip>
                    
                </div>
                <el-tag
                    :key="tag"
                    v-for="tag in tagelist"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="mini"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>


            <div class="request_content_say">
                <span>간단한 한줄 자기소개</span>

                <textarea name="content" v-model="say"  class="request_content_say_input"  >
                </textarea>
            </div>

            <div class="request_content_done" @click="request_click">
                <span>요청하기</span>

            </div>

            <div style="color: red; margin-top: 37px; height: 30px;float: left; width: 100%; font-size: 12px; font-weight:500;">* 재능요청후 재능교환 요청이 들어오면 메일로 알려드립니다!</div>

        </div>
</template>

<script>
 import {Server_IP} from '../../../server/serverIP'
    export default {

         data() {
            return {
                search_val : "",
                type : 0,
                list_stydy_type_on : {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                },
                list_stydy_type_on_span : {
                    "color" : "#939393"
                },
                list_stydy_type_off : {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                },
                list_stydy_type_off_span : {
                    "color" : "#939393"
                },
                title : "",
                hadlist : [],
                wantlist : [],
                hadlist_level : [],
                wantlist_level : [],
                hadlist_level_temps : [],
                wantlist_level_temps : [],
                time : "",
                location : [],
                say : "",
                userinfoId : 0,
                add_talent : false,
                click_type : 0,
                add_had : false,
                userId : "",
                add_want : false,
                add_location : false,
                startTime: '',
                endTime: '',
                tagelist: [],
                inputVisible: false,
                inputValue: '',
                data : {
                    index : 0,
                    talent_name : "",
                    talent_level : 0,
                    type : 0
                },
                location_data : {

                    index : 0,
                    location_name : "",
                    type : 0
                },
                loading : false
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);
           
            this.$EventBus.$on('add_talent_exit',this.add_talent_exit );
            this.$EventBus.$on('add_location_exit',this.add_location_exit );

            this.$EventBus.$emit('header_check');
                
            var userId =  localStorage.getItem('user_id');

            this.$http.get(`${Server_IP}/userinfo/${userId}`,{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }})
            .then(response => {
                return response.json();
            }).then(data => {
                if(data.status == 0) {

                    if(data.result[0].hadTalent != null) {
                        data.result[0].hadTalent.split(',').map( (data)=> {
                            this.hadlist.push(data);
                        });

                        data.result[0].hadTalentLevel.split(',').map( (data)=> {
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
                    

                    if(data.result[0].wantTalent != null) {
                        data.result[0].wantTalent.split(',').map( (data)=> {
                            this.wantlist.push(data);
                        });

                    
                        data.result[0].wantTalentLevel.split(',').map( (data)=> {
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
                    
                    if(data.result[0].wantLocation != null) {
                        data.result[0].wantLocation.split(',').map( (data)=> {
                            this.location.push(data);
                        });
                    } else {
                        this.location.push("");
                    }
                    
                    

                    this.type = data.result[0].wantType;
                    this.type_click(this.type);
                    if(data.result[0].wantTime != "null") {
                        this.time = data.result[0].wantTime;
                    }
                    this.userinfoId = data.result[0].userinfoId;
                    this.userId = data.result[0].userId;
                    
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

            talent_click(name, level,index,type) {
                this.data.talent_name = name;
                this.data.talent_level = level;
                this.data.index = index;
                this.data.type = type;
                this.add_talent = true; 
            },
            location_click(name,index,type) {
                this.location_data.location_name = name;
                this.location_data.index = index;
                this.location_data.type = type;
                this.add_location = true; 
            },

              handleClose(tag) {
                    this.tagelist.splice(this.tagelist.indexOf(tag), 1);
                },

                showInput() {
                    this.inputVisible = true;
                    this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                    });
                },

                handleInputConfirm() {
                    let inputValue = this.inputValue;
                    if (inputValue) {
                    this.tagelist.push(inputValue);
                    }
                    this.inputVisible = false;
                    this.inputValue = '';
                },
            
            
            add_location_exit(data) {
                
                if(data != 0) {
                    this.add_location = true;
                    if(this.location[0] == '') {
                        this.location = [];
                    }
                    this.location.push(data.location_name);
                }

                this.add_location = false;
            },

            add_talent_exit(data) {
                if(data != 0) {
                    
                    if(this.click_type == 1) {
                        this.add_had = true;
                        if(this.hadlist[0] == '') {
                            this.hadlist = [];
                            this.hadlist_level = [];
                        }
                        if(data.talent_level == 1) {
                            this.hadlist_level_temps.push("하");
                            
                        } else if(data.talent_level == 2) {
                            this.hadlist_level_temps.push("중");

                        } else if(data.talent_level == 3) {
                            this.hadlist_level_temps.push("상");

                        }

                        this.hadlist_level.push(data.talent_level);
                        this.hadlist.push(data.talent_name);
                    } else if(this.click_type == 2) {
                        
                        this.add_want = true;
                        if(this.wantlist[0] == '') {
                            this.wantlist = [];
                            this.wantlist_level = [];
                        }
                        if(data.talent_level == 1) {
                            this.wantlist_level_temps.push("하");
                            
                        } else if(data.talent_level == 2) {
                            this.wantlist_level_temps.push("중");

                        } else if(data.talent_level == 3) {
                            this.wantlist_level_temps.push("상");

                        }
                        this.wantlist.push(data.talent_name);
                        this.wantlist_level.push(data.talent_level);
                    }
                }
                this.add_talent = false; 
            },

            add_talent_open(type) {
                
               this.click_type = type;
               this.add_talent = true; 
               this.data.type = 0;
            },
            add_location_open() {
               this.add_location = true; 
               this.location_data.type = 0;
            },


            request_click() {

                
                if(this.loading === false) {
                    this.loading = true;
                    if(this.title === "") {
                    alert("제목을 입력해주세요.");
                            this.loading = false;
                } else if(this.hadlist[0] === '') {

                    alert("자신의 재능을 입력해주세요.");
                            this.loading = false;
                } else if(this.wantlist[0] == '') {

                    alert("원하는 재능을 입력해주세요.");
                            this.loading = false;
                } else if(this.say === "") {

                    alert("하고싶은말을 입력해주세요.");
                            this.loading = false;
                } else {
                    var taglist_temp = this.tagelist.map ( (taglists,i) => {
                        return tagelist;
                    })


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
                    this.$http.post(`${Server_IP}/addrequesttalent/`, {
                        "userId" : this.userId,
                        "userinfoId" : this.userinfoId,
                        "title" : this.title,
                        "hadlist" : hadlist_temp,
                        "wantlist" : wantlist_temp,
                        "hadlistlevel" : hadlist_level_temp,
                        "wantlistlevel" : wantlist_level_temp,
                        "tags" : taglist_temp,
                        "type" : this.type,
                        "time" : this.startTime +","+this.endTime,
                        "location" : location_temp,
                        "say" : this.say,
                        
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
                            this.$router.push('/');
                            window.location.reload();
                        } else {
                            this.loading = false;
                            
                            alert("실패");
                            
                        }
                    }, error => {
                        console.log(error);
                    });
                }
            }else {
                alert("처리중입니다.");
            }

                 

                
            },

            type_click(type) {
                if(type == 1) {

                    this.list_stydy_type_off = {
                        "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                    }
                    this.list_stydy_type_off_span = {
                        "color" : "#939393"
                    }

                    this.list_stydy_type_on = {
                        "background-color" : "#5C7CFA"
                    }
                    this.list_stydy_type_on_span = {
                        "color" : "#ffffff"
                    }

                    this.type = 1;

                } else if(type ==2) {

                    this.list_stydy_type_on = {
                        "background-color" : "#ffffff",
                        "border" : "1px solid #707070"
                    }
                    this.list_stydy_type_on_span = {
                        "color" : "#939393"
                    }

                    this.list_stydy_type_off = {
                        "background-color" : "#5C7CFA"
                    }
                    this.list_stydy_type_off_span = {
                        "color" : "#ffffff"
                    }

                    
                    this.type = 2;

                } 
            }
        }
    }
</script>

<style>

.request_content {
    width: 90%;
    margin-top : 50px;
    padding-left : 20px;
}

.request_content_title {
    width: 90%;
    height: 35px;
}

.request_content_title span {
    width: 90%;
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_title_input {
    
    margin-top : 5px;
    width: 100%;
    height: 100%;
}

.request_content_name {
    width: 90%;
    margin-top : 20px;
    height: 100%;
}

.request_content_name span {
    width: 90%;
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_name_input {
    
    margin-top : 5px;
    width: 100%;
    height: 25px;
    border : 1px solid #333;
    padding-left : 10px;
}

.request_content_had {
    width: 100%;
    height: 25px;
    margin-top : 80px;
}

.request_content_had span {
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_had_list {
    
    float: left;
    width: 100%;
    margin-bottom : 50px;
}

.list_had {
    float: left;
    min-width: 45px;
    height: 25px;
    border-radius :50px;
    background-color : #5C7CFA;
    text-align : center;
    margin-right : 5px;
    margin-bottom : 10px;
    padding-left :10px;
    padding-right :10px;

}

.list_had span {
    
    line-height : 25px;
    font-size : 14px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}


.list_input {
    
    float: left;
    width : 75px;
    height: 27px;
    border-radius :50px;
    background-color : #ffffff;
    border : 1px solid #707070;
    text-align : center;
    margin-bottom : 20px;
    margin-right : 5px;
}

.list_input input {
    float: left;
    border-right : 1px solid #707070;
    border-radius :50px;
    height: 25px;
    border : 1px solid #ffffff;
}


.form-control {
    border-color : #ffffff
}



.request_content_want {
    width: 90%;
    height: 35px;
}

.request_content_want span {
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_want_list {
    
    margin-top : 7px;
    float: left;
    width : 100%;
    margin-bottom : 50px;
}


.list_wnat {
    float: left;
    min-width: 45px;
    height: 25px;
    border-radius :50px;
    background-color : #DD5D93;
    text-align : center;
    margin-right : 5px;
    margin-bottom : 10px;
    padding-left :10px;
    padding-right :10px;

}

.list_wnat span {
    
    line-height : 25px;
    font-size : 14px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}


.request_content_location {
    width : 90%;
    height: 35px;
    margin-top : 100px;
}

.request_content_location span {
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_location_list {
    
    float: left;
    width : 100%;
    height: 100%;
    margin-top : 7px;
    margin-bottom : 50px;
}


.list_location {
    float: left;
    width : 75px;
    height: 27px;
    border-radius :50px;
    background-color : #5C7CFA;
    text-align : center;
    margin-bottom : 20px;
    margin-right : 5px;
}

.list_location span {
    
    width : 75px;
    line-height : 27px;
    font-size : 14px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.edit p {
    margin-left : 25px;
    float: left;
    font-size : 12px;
    color : #FF0000;
    font-weight: 500;
    line-height : 35px;
    cursor: pointer;
}

.edit {
    width : 50%;
    float: left;
}




.request_content_stydy_type {
    width : 90%;
    height: 35px;
    margin-top : 100px;
}

.request_content_stydy_type span {
    width : 90%;
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_stydy_type_list {
    
    float: left;
    width : 100%;
    height: 100%;
    margin-top : 7px;
    margin-bottom : 50px;
}


.list_stydy_type_on {
    float: left;
    width : 75px;
    height: 27px;
    border-radius :50px;
    background-color : #5C7CFA;
    text-align : center;
    margin-bottom : 20px;
    margin-right : 5px;
}

.list_stydy_type_on span {
    
    width : 75px;
    line-height : 27px;
    font-size : 14px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.list_stydy_type_off {
    float: left;
    width : 80px;
    height: 27px;
    border-radius :50px;
    border : 1px solid #707070;
    text-align : center;
    margin-bottom : 20px;
    margin-right : 5px;
}

.list_stydy_type_off span {
    
    width : 80px;
    line-height : 27px;
    font-size : 14px;
    color : #939393;
    font-weight: 500;
    letter-spacing : 1px;
}

.request_content_say {
    float : left;
    width :90%;
    margin-top : 100px;
}


.request_content_say span {
    width :90%;
    height : 50px;
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_say_input {
    
    width : 100%;
    height : 100px;
    padding-left :2%;
    padding-top : 2%;
    border : 1px solid #707070;
}



.request_content_time {
    width : 100%;
    margin-top : 100px;
}

.request_content_time span {
    width : 100%;
    float: left;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}

.request_content_time_list {
    
    float: left;
    width : 100%;
    height: 100%;
    margin-top : 7px;
    margin-bottom : 50px;
}

.list_input2 {
    
    float: left;
    width : 100%;
    height: 35px;
    background-color : #ffffff;
    border : 1px solid #707070;
    text-align : center;
    margin-bottom : 20px;
    margin-right : 5px;
}

.list_input2 input {
    float: left;
    height: 32px;
    border : 1px solid #ffffff;
}


.request_content_done {
    float : left;
    width : 90%;
    height: 40px;
    margin-top : 80px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    border-radius: 5px;
    text-align : center;
    cursor: pointer;
}

.request_content_done span {
    width : 100%;
    float: left;
    font-size : 18px;
    color : #ffffff;
    font-weight: 400;
    line-height : 40px;
}

.el-time-select {
    margin-top : 10px;
}

.el-tag {
    margin-right : 10px;
}

.el-tag + .el-tag {
    margin-bottom : 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 25px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }

  
.request_content_tags {
    float : left;
    width : 100%;
    margin-top : 50px;
}

.request_content_tags_img_div {
    width: 80%;
    height: 50px;
    float: left;
}


.request_content_tags_span {
    float: left;
    width : 15%;
    font-size : 18px;
    color : black;
    font-weight: 500;
    line-height : 35px;
}
</style>
