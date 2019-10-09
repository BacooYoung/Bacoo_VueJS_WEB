<template>
    <div class="matched_talent_list_info">
        <div class="matched_talent_list_info_name">
            <span>{{result.name}}</span>
        </div>

        <div class="matched_talent_list_info_say">
             <span class="matched_talent_list_info_say_2" v-html="comment" v-if="notcm==false" @click="open_memo">  </span>
             
             <div v-if="notcm" class="matched_talent_list_info_say_no" @click="open_memo">
                <span >상대방에 대하여 간단하게 메모를 하여 쉽게 알아볼수 있게 해보세요!</span>
                <div class="matched_talent_list_info_say_no_img">
                <img src="https://i.imgur.com/qLfhndo.png" />
                    
                </div>
             </div>

        </div>

        <div class="matched_talent_list_info_status" @click="open_message">
            <div class="matched_talent_top">
                <span id="bridge" v-if="newbridge">new</span>
            </div>
            <span>대화하기</span>
        </div>
    </div>

    
</template>

<script>
  export default {

        data() {
            return {
                list_click : false,
                notcm : false,
                newbridge : false,
                comment : ""
            }
        },
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            this.$EventBus.$on('memo_reload', this.memo_reload);


           if(this.result.comment == null ) {
               this.notcm = true;
           } else {
               this.notcm = false;
           }

           this.comment = this.result.comment;

           this.bridge.map( (content , i) => {
                if(content.myId === this.result.yourId) {
                    this.newbridge = true;
                }
            });
        },
        props : {
            result : "",
            bridge : ""
        },

        watch : {

        },
        mounted() {

        },

        beforeDestroy() {
        
        },
        methods: {
           open_message() {
                this.newbridge = false;
                this.$EventBus.$emit('open_message', {myId:this.result.myId, youId : this.result.yourId, name: this.result.name});
             },

            open_memo() {
                
                this.$EventBus.$emit('open_memo', {matchedId:this.result.matchedId, notcm : this.notcm, comment : this.result.comment});
            },

            memo_reload(data) {
                if(this.result.matchedId === data.matchedId) {
                    this.comment = data.comment;
                    
                }
            }
        }
    }
</script>

<style>

.matched_talent_list_info {

    margin-right : 30px;
    margin-top : 50px;
    float: left;
    width: 92%;
    
    height: 220px;
    border : 1px solid #ced4da;
    border-radius: 5px;
    box-shadow : 0 1px 1px 1px rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12);
}

.matched_talent_list_info_name {
    margin-top : 5px;
    width: 100%;
    text-align : center; 

}

.matched_talent_list_info_name span {
    font-size : 16px;
    font-weight: 700;
}

.matched_talent_list_info_say {
    width : 100%;
    margin-top : 35px;
    height: 70px;
    padding-left : 15px;
    padding-right : 15px;
    margin-bottom : 35px;
    
}

.matched_talent_list_info_say_no {
    
    width : 100%; 
    color: #9B9696;
    font-size: 12px;
    font-weight: 500;
    margin : 0 auto;
    text-align: center;
}

.matched_talent_list_info_say_no_img{
    
    width : 100%; 
    height: 30px;
}

.matched_talent_list_info_say_no img {
    width : 25px;
    height: 25px;
    margin : 0 auto;
    text-align: center;
    margin-top : 20px;
}

.matched_talent_list_info_say_2{
    
    width : 100%; 
    line-height: 1em;
    text-align: center;
    height: 6em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap:break-word; 
    font-size: 12px;
    color : black;
    font-weight: 500;
}

.matched_talent_list_info_status {
    margin-top : 50px;
    width: 101%;
    height: 40px;
    background-color: #f87a65;
    text-align: center;
    margin-left : -1px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.matched_talent_list_info_status span {
    line-height: 38px;
    font-size : 16px;
    color : white;
}


.matched_talent_top {

    width: 60%;
    margin-top: -15px;
    float: right;
    height: 7px;
    text-align : right;
    position: absolute;
    z-index: 10;
}

.matched_talent_top span {

    border-radius : 15px;
    font-size : 12px;
    color : #ffffff;
    padding-left : 7px;
    padding-right : 7px;
    background-color : red;

}

</style>
