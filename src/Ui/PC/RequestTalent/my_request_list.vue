<template>
    <div class="my_request_info_detail">

        <div class="my_request_info_name">
            <span>{{name}}</span>
        </div>

        <div class="my_request_info_had">
             <span>나의 재능</span>
        </div>

        <div class="my_request_info_had_list">
             <div class="had_div" v-for="(hadlists, index) in hadlist" :key="index" >
                <span>{{hadlists}}</span>
            </div>
        </div>

        <div class="my_request_info_want">
             <span>원하는 재능</span>
        </div>

        <div class="my_request_info_want_list">
             <div class="want_div" v-for="(wantlists, index) in wantlist" :key="index" >
                <span>{{wantlists}}</span>
            </div>
        </div>

        <div class="my_request_info_status">
            <span class="my_request_info_status_span" :data-index="index" @click="detail">자세히 보기</span>
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
                type : "",
                result_list : "",
                indexId : 0
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            
            this.init_data();

            this.title = this.result.title;
            this.date = "2017-10-21";
            this.content = this.result.say;
            this.name = this.result.name;
            this.time = this.result.wantTime;
            this.type = this.result.wantType;

            this.content = this.content.replace(/\x20/gi, "&nbsp;");
            this.content = this.content.replace(/\x0D\x0A/gi, "<br/>");
            this.content = this.content.replace(/\x0D/gi, "<br/>");
            this.content = this.content.replace(/\n/gi, "<br/>"); 

            this.result_list = this.result;

            this.indexId = this.indexs;
           ;

        },
        props : {
            result : "",
            index : 0
        },

        watch : {

        },
        mounted() {

        },

        beforeDestroy() {
        
        },
        methods: {
            remove(e) {
            },

            detail (e) {
                
                var index = e.target.getAttribute('data-index');
                this.$EventBus.$emit('add_detail_open', {result_list:this.result_list, indexId : this.index});
            },

            list_open() {
                this.list_click = false;
            },

            init_data() {

                
                this.result.hadTalent.split(',').map( (data,i)=> {
                    if(i > 2) {
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
                    if(i > 2) {
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

.my_request_info_detail {
    margin-left: 30px;
    margin-top : 50px;
    float: left;
    width: 220px;
    
    height: 240px;
    border : 1px solid #ced4da;
    border-radius: 5px;
    box-shadow : 0 1px 1px 1px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
   
}


.my_request_info_name {
    margin-top : 10px;
    width: 100%;
    text-align : left; 
    margin-left : 20px;

}

.my_request_info_name span {
    font-size : 16px;
    font-weight: 700;
}

.my_request_info_had {
    width : 100%;
    margin-top : 25px;
    padding-left : 20px;
    padding-right : 15px;
    
}

.my_request_info_had span{
    font-size: 14px;
    font-weight: 500;
    color : #9F9F9F;
}


.my_request_info_want {
    width : 100%;
    margin-top : 25px;
    padding-left : 20px;
    padding-right : 15px;
    
}

.my_request_info_want span{
    font-size: 14px;
    font-weight: 500;
    color : #9F9F9F;
}

.my_request_info_status {
    cursor: pointer;
    margin-top : 62px;
    width: 220.3px;
    height: 35px;
    margin-left : -1px;
    margin-bottom : 15px;
    text-align: center;
    border-top : 1px solid #D9D4D4;
    background-color: #409EFF;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.my_request_info_status_span {
    line-height: 35px;
    font-size : 16px;
    color : #ffffff;
}



.my_request_info_had_list {
    float: left;
    width: 500px;
    height: 40px;
    margin-left : 15px;
    margin-top : 5px;
}


.my_request_info_had_list span {
    font-size : 12px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.my_request_info_want_list {
    float: left;
    width: 200px;
    height: 40px;
    margin-left : 15px;
    margin-top : 5px;
}


.my_request_info_want_list span {
    font-size : 12px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}



.had_div {
    float: left;
    padding-left : 4px;
    padding-right : 4px;
    height: 22px;
    border-radius :50px;
    background-color : #5C7CFA;
    text-align : center;
    margin-bottom : 20px;
    margin-right : 5px;
}

.had_div span {
    
    padding-left : 5px;
    padding-right : 5px;
    line-height : 22px;
    font-size : 10px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}

.want_div {
    float: left;
    padding-left : 3px;
    padding-right : 3px;
    height: 22px;
    border-radius :50px;
    background-color : #DD5D93;
    text-align : center;
    margin-bottom : 20px;
    margin-right : 5px;
}

.want_div span {
    
    width : 40px;
    height: 22px;
    padding-left : 5px;
    padding-right : 5px;
    line-height : 22px;
    font-size : 10px;
    color : #ffffff;
    font-weight: 400;
    letter-spacing : 1px;
}
</style>
