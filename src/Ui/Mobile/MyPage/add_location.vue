<template>
    <div class="add_talent_from">
        <div class="add_talent">
            <div class="exit_btn"><img src="https://i.imgur.com/OQcRDFM.png" alt="" @click="exit"></div>
        
            <div class="add_talent_name">
                <span>장소명  </span>
            </div>

            <div class="add_talent_name_input">
                <input type="text" placeholder="원하시는 장소를 입력해주세요." v-model="location_name"/>
            </div>

            <div class="add_talent_btn" @click="btn_click">
                <span>추가하기</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  
    data() {
            return {
                location_name : "",
                type : 0,
            }
    },

    created() {

        if(this.datas.type !== 0) {
            this.location_name = this.datas.location_name;

            this.type = this.datas.type;
        }   

        
        
    },

    mounted() {


    },

    props : {
        datas : {}
    },

    methods : {
        exit() {
            this.$EventBus.$emit('add_location_exit',0);
            
        },

        btn_click() {
             if(this.datas.type === 1) {

                        
                this.$parent.location.splice(this.datas.index, 1, this.location_name);
                this.$EventBus.$emit('add_location_exit',"0");
            
            
            } 
            else {
                this.$EventBus.$emit('add_location_exit',{location_name : this.location_name});
                
            }
        }


    }
}
</script>


<style>


    .add_talent_from {
        background : rgba(0,0,0,.5); 
        width : 100%;   
        height: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }

    .add_talent {
        position: absolute;
        width: 80%;
        padding: 20px 25px;
        top : 20%;
        left : 10%;
        text-align: center;
        background-color: #ffffff;
        border-radius: 5px;
    }

    .add_talent_name {
        width: 100%;
        height: 20px;
        text-align: left;
    }

    .add_talent_name span {
        font-weight: 700;
    }

    .add_talent_name_input {
        
        width: 100%;
        height: 50px;
        text-align: left;
        margin-top : 10px;
    }

    .add_talent_name_input input {
        
        width: 100%;
        height: 50px;
        padding-left : 10px;
        
    }

    .add_talent_level {
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 40px;
    }

    .add_talent_level {
        font-weight: 700;
    }

    .add_talent_level_input {
        
        width: 100%;
        height: 20px;
        text-align: left;
        margin-top : 10px;
    }

    .add_talent_level input {
        
        width: 100%;
        padding-left : 10px;
        
    }

    .add_talent_level_from {
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

    .add_talent_level_from span {
        line-height: 22px;
    }

    .add_talent_btn {
        width: 100%;
        height: 50px;;
        margin-top: 50px;
        background-color: #5C7CFA;
    }

    .add_talent_btn span {
        line-height: 50px;
        color : white;
        font-size: 20px;
        cursor: pointer;
    }

    .add_talent_btn2 {
        width: 100%;
        height: 50px;
        margin-top: 10px;
        background-color: #5C7CFA;
    }

    .add_talent_btn2 span {
        line-height: 50px;
        color : white;
        font-size: 20px;
        cursor: pointer;
    }

    .exit_btn {
        width : 100%;
        height: 40px;
        text-align: right;
    }

    .exit_btn img {
        width : 25px;
        height: 25px;
        float : right;
        font-size : 22px;
    }
</style>


