<template>
  <div class="search_list_info">
                <div class="search_list_info_1" v-on:click="list_open">

                    <div class="search_list_info_1_title">
                        <span>{{this.result.title}}</span>
                    </div>

                     <div class="search_list_info_1_location">
                        
                        <span style="color : #7A7A7A">수업 방식 : </span><span style="color : #5C7CFA">{{type}}</span>
                    </div>

                    <div class="search_list_info_1_want">

                        <div class="want_div" v-for="(hadlists, index) in hadlist" :key="index" >
                            <el-tooltip class="item" effect="dark" content="가지고있는 재능입니다" placement="bottom-end">
                                
                                <span>{{hadlists}}</span>
                            </el-tooltip>
                            
                        </div>
                        

                    </div>

                    <div class="search_list_info_1_study">
                            <div class="study_div" v-for="(wantlists, index) in wantlist" :key="index" >
                                <el-tooltip class="item" effect="dark" content="원하는 재능입니다." placement="bottom-end">
                               
                                    <span>{{wantlists}}</span>
                                </el-tooltip>
                                
                            </div>
                    </div>

                </div>

                <div class="search_list_info_2" v-if="list_click">
                    <div class="search_list_info_2_left">
                        <div class="search_list_info_2_left_title">
                           
                        <span>{{this.result.title}}</span>
                            
                        </div>
                        <div class="search_list_info_2_left_line"></div>
                        
                        <div class="search_list_info_2_left_content">
                            
                        <span v-html="this.content"></span>
                        </div>

                        <div class="search_list_info_2_left_btn" @click="request_talent">
                            <div class="btns">
                                <span>재능교환 요청하기</span>
                            </div>
                        </div>

                    </div>

                    <div class="search_list_info_2_right">
                        <div class="search_list_info_2_right_name">
                            <span>{{name}}</span>
                        </div>

                        <div class="search_list_info_2_right_had">
                            <span>가지고있는 재능</span>
                        </div>

                        <div class="search_list_info_2_right_had_list">
                           <div class="had_div_list" v-for="(hadlists_self, index) in hadlist_self" :key="index">
                                <span>{{hadlists_self}}</span>
                            </div>
                        </div>

                        <div class="search_list_info_2_right_hope">
                            <span>배우고싶은 재능</span>
                        </div>

                        <div class="search_list_info_2_right_hope_list">
                             <div class="hope_div_list" v-for="(wantlists_self, index) in wantlist_self" :key="index">
                                <span>{{wantlists_self}}</span>
                            </div>
                        </div>


                        <div class="search_list_info_2_right_location">
                            <span>희망하는 지역</span>
                        </div>

                        <div class="search_list_info_2_right_location_list">

                            <div class="lo_div_list" v-for="(locations_self, index) in location_self" :key="index">
                                <span>{{locations_self}}</span>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
</template>

<script>
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
                type : ""
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

          
            if(this.result.wantType == 1) {
                this.type = "온라인"
            } else {
                this.type = "오프라인"
            }

            this.init_data();

            this.title = this.result.requestTitle;
            this.content = this.result.say;
            this.name = this.result.name;
            this.time = this.result.wantTime;

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

            request_talent () {
                if(Number(this.result.userId) === Number(localStorage.getItem('user_id'))){
                    alert("본인 재능에는 요청을 할수 없습니다.");
                } else if(!localStorage.getItem('user_id')) {
                    alert("로그인후 이용하실수있습니다.");
                } 
                else {
                    this.$EventBus.$emit('open_request', {datas : this.result});
                    
                }
            },
            
            list_open() {
                this.list_click = !this.list_click;
            },

            init_data() {
                this.hadlist = [];
                this.hadlist_self = [];
                this.wantlist = [];
                this.wantlist_self = [];
                this.location = [];
                this.location_self = [];

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

.search_list_info {
    margin-bottom: 20px;
    width: 1024px;
    float: left;
   
}

.search_list_info_1 {
    box-shadow: 3px 3px 6px 0px #aaaaaa; 

    width: 1024px;
    height : 80px;
    border : 1px solid #ced4da;
}

.search_list_info_1:hover {
    
    border : 1.1px solid #5C7CFA;
    cursor: pointer;
}
.search_list_info_2 {
    
    width: 1024px;
    height : 100%;
    margin-top : 10px;
}

.search_list_info_1_title {
    float: left;
    width: 800px;
    margin-left : 20px;
    margin-top : 10px;
}

.search_list_info_1_want {
    float: left;
    width: 500px;
    height: 50px;
    margin-left : 20px;
    margin-top : 10px;
}

.search_list_info_1_want img {
    width: 15px;
    height: 15px;
    float: left;
    margin-top : 5px;
}

.search_list_info_1_want span {
    font-size : 12px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.search_list_info_1_study {
    float: right;
    width: 480px;
    height: 50px;
    margin-top : 10px;
    text-align : right;
    margin-right : 20px;
}

.search_list_info_1_study span {
    font-size : 12px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
    margin-top : 5px;
}

.search_list_info_1_title span {
    font-size : 16px;
    font-weight: 700;
}


.search_list_info_1_location {
    font-size : 10px;
    font-weight: 500;
    margin-top : 5px;
    margin-right : 20px;
    color : #746C6C;
    float: right;

}

.search_list_info_1_location img {
    width: 15px;
    height: 15px;
    float: left;
}

.search_list_info_1_location span {
    font-size : 11px;
    color : #006CFF;
    font-weight: 500;
    margin-left : 5px;
    margin-right : 10px;
}

.search_list_info_2_left {
    width : 730px;
    height: 100%;
    border : 1px solid #adb5bd;
    float :left;
    text-align : center;
    margin : 0 auto;
    border-radius : 5px;

}

.search_list_info_2_right {
    margin-left : 20px;
    width : 274px;
    height: 100%;
    border-radius : 5px;
    border : 1px solid #adb5bd;
    float : left;

}

.search_list_info_2_left_title {
    width : 730px;
    margin-bottom: 20px;
    margin-top : 50px;
}

.search_list_info_2_left_title span {
    width : 200px;
    font-size : 20px;
    color : black;
    font-weight: 500;
}

.search_list_info_2_left_line {
    background-color : #000000;
    width: 630px;
    height: 1px;
    margin : 0 auto;
    
}

.search_list_info_2_left_content {
    margin : 0 auto;
    margin-top : 100px;
    margin-left : 120px;
    width : 500px;
    padding-bottom : 250px;
    text-align : left;
    font-weight: 500;
    color : #495057;
}

.want_div {
    height: 24px;
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
    height: 24px;
    border-radius :50px;
    background-color : #DD5D93;
    text-align : center;
    margin-bottom: 10px;
    float: right;
    margin-right : 5px;
    padding-left : 10px;
    padding-right : 10px;
}

.search_list_info_2_left_btn {
    width : 100%;
    height: 50px;
    cursor: pointer;
    
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

.search_list_info_2_right_name {
    margin-top:10px;
    width : 100%;
    height: 30px;
    text-align : center;
}

.search_list_info_2_right_name span {
    
    line-height : 32px;
    font-size : 18px;
    color : #000000;
    font-weight: 500;
}


.search_list_info_2_right_had {
    
    width : 100%;
    overflow: hidden;
    height: auto;
    text-align: left;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}

.search_list_info_2_right_had_list {
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

.search_list_info_2_right_hope_list {
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

.search_list_info_2_right_location_list {
    line-height : 22px;
    width : 100%;
    height: 50px;
    margin-left: 10px;
    margin-right : 20px;
    color : #006CFF;
    font-size : 14px;
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

.lo_div_list {
    min-width: 45px;
    height: 22px;
    border-radius :50px;
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

.search_list_info_2_right_hope {
    width : 100%;
    overflow: hidden;
    height: auto;
    margin-top:30px;
    text-align: left;
    margin-left: 20px;
    color : #000000;
    font-weight: 700;
}

.search_list_info_2_right_location {
    width : 100%;
    height: 30px;
    margin-top:30px;
    margin-left: 20px;
    color : #000000;
    font-weight: 400;
}
</style>
