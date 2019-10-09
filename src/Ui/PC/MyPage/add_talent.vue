<template>
    <div class="add_talent_from">
        <div class="add_talent">

            <div class="add_talent_name">
                <span>재능명  </span>
            </div>

            <div class="add_talent_name_input">
                <input type="text" placeholder="재능명을 입력해주세요." v-model="talent_name"/>
            </div>

            <div class="add_talent_level">
                <span>재능 수준 </span>
            </div>

            <div class="add_talent_level_input">
                <div class="add_talent_level_from" v-bind:style="add_talent_level_3" @click="type_click(3)">
                    <span v-bind:style="add_talent_level_3_span">상</span>
                </div>

                <div class="add_talent_level_from" v-bind:style="add_talent_level_2" @click="type_click(2)">
                    <span v-bind:style="add_talent_level_2_span">중</span>
                </div>

                <div class="add_talent_level_from" v-bind:style="add_talent_level_1" @click="type_click(1)">
                    <span v-bind:style="add_talent_level_1_span">하</span>
                </div>
            </div>

            <div class="add_talent_btn" @click="btn_click">
                <span>추가하기</span>
            </div>

            <div class="delect_talent_btn" @click="delect_btn_click" v-if="this.type !== 0">
                <span>삭제하기</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  
    data() {
        return {
            talent_name : "",
            talent_level : 0,
            type : 0,
            add_talent_level_3 : {
                "background-color" : "#ffffff",
                "border" : "1px solid #707070"
            },
            add_talent_level_3_span : {
                "color" : "#3d3d3d"
            },
            add_talent_level_2 : {
                "background-color" : "#ffffff",
                "border" : "1px solid #707070"
            },
            add_talent_level_2_span : {
                "color" : "#3d3d3d"
            },
            add_talent_level_1 : {
                "background-color" : "#ffffff",
                "border" : "1px solid #707070"
            },
            add_talent_level_1_span : {
                "color" : "#3d3d3d"
            },
        }
    },

    props : {
        datas : {}
    },

    created() {

        if(this.datas.type !== 0) {
            this.talent_name = this.datas.talent_name;

            if(this.datas.talent_level === "하") {
                this.talent_level = 1;
            } else if(this.datas.talent_level === "중") {
            
                this.talent_level = 2;
            } else if(this.datas.talent_level === "상") {
            
                this.talent_level =3 ;
            }
            this.type = this.datas.type;
            this.type_click(this.talent_level);
        }   

        
        
    },

    mounted() {

        const exit_add = () => {this.$EventBus.$emit('add_talent_exit',"0");} 
            $(document).click(function(e){ 
                if(e.target.className =="add_talent_from"){
                    exit_add();
                } 
                
        });

    },
    methods : {

        delect_btn_click() {
            if(this.datas.type === 1) { 
                
            this.$parent.hadlist.splice(this.datas.index, 1);
            this.$parent.hadlist_level.splice(this.datas.index, 1);
            this.$parent.hadlist_level_temps.splice(this.datas.index, 1);
            }
             else {

            this.$parent.wantlist.splice(this.datas.index, 1);
            this.$parent.wantlist_level.splice(this.datas.index, 1);
            this.$parent.wantlist_level_temps.splice(this.datas.index, 1);
            }
                    
            this.$EventBus.$emit('add_talent_exit',"0");
        },

        btn_click() {
            if(this.talent_name === "") {
                alert("재능명을 입력해주세요.");
            }
            else if( this.talent_level == 0) {
                alert("레벨을 선택해주세요.");
            } else {

                if(this.datas.type === 1) {
                    if(this.talent_level === 1) {
                        this.$parent.hadlist_level_temps.splice(this.datas.index, 1, "하");
                    } else if(this.talent_level === 2) {
                    
                        this.$parent.hadlist_level_temps.splice(this.datas.index, 1, "중");
                    } else if(this.talent_level === 3) {
                        this.$parent.hadlist_level_temps.splice(this.datas.index, 1, "상");

                    }

                        
                    this.$parent.hadlist.splice(this.datas.index, 1, this.talent_name);
                    this.$parent.hadlist_level.splice(this.datas.index, 1, this.talent_level);
                    this.$EventBus.$emit('add_talent_exit',"0");
                
                
                } 
                else if(this.datas.type === 2) { 
                    if(this.talent_level === 1) {
                        this.$parent.wantlist_level_temps.splice(this.datas.index, 1, "하");
                    } else if(this.talent_level === 2) {
                    
                        this.$parent.wantlist_level_temps.splice(this.datas.index, 1, "중");
                    } else if(this.talent_level === 3) {
                        this.$parent.wantlist_level_temps.splice(this.datas.index, 1, "상");

                    }

                        
                    this.$parent.wantlist.splice(this.datas.index, 1, this.talent_name);
                    this.$parent.wantlist_level.splice(this.datas.index, 1, this.talent_level);
                    this.$EventBus.$emit('add_talent_exit',"0");
               
                

                } else {
                    this.$EventBus.$emit('add_talent_exit',{talent_name : this.talent_name, talent_level: this.talent_level});
                }
                
               
                
                
                

            }
        },

        type_click(type) {
            if(type == 1) {

                this.add_talent_level_2 = {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                }
                this.add_talent_level_2_span = {
                    "color" : "#3d3d3d"
                }

                this.add_talent_level_3 = {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                }
                this.add_talent_level_3_span = {
                    "color" : "#3d3d3d"
                }

                this.add_talent_level_1 = {
                    "background-color" : "#5C7CFA"
                }
                this.add_talent_level_1_span = {
                    "color" : "#ffffff"
                }

                this.talent_level = 1;

            } else if(type ==2) {

                 this.add_talent_level_3 = {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                }
                this.add_talent_level_3_span = {
                    "color" : "#3d3d3d"
                }

                this.add_talent_level_1 = {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                }
                this.add_talent_level_1_span = {
                    "color" : "#3d3d3d"
                }

                this.add_talent_level_2 = {
                    "background-color" : "#5C7CFA"
                }
                this.add_talent_level_2_span = {
                    "color" : "#ffffff"
                }


                
                this.talent_level = 2;

            } else if(type == 3) {

                 this.add_talent_level_2 = {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                }
                this.add_talent_level_2_span = {
                    "color" : "#3d3d3d"
                }

                this.add_talent_level_1 = {
                    "background-color" : "#ffffff",
                    "border" : "1px solid #707070"
                }
                this.add_talent_level_1_span = {
                    "color" : "#3d3d3d"
                }

                this.add_talent_level_3 = {
                    "background-color" : "#5C7CFA"
                }
                this.add_talent_level_3_span = {
                    "color" : "#ffffff"
                }


                
                this.talent_level = 3;

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
        width: 300px;
        height: auto;
        padding: 20px 25px;
        top: 30%;
        left: 38%;
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
        height: 20px;
        text-align: left;
        margin-top : 10px;
    }

    .add_talent_name_input input {
        
        width: 100%;
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
        height: 30px;;
        margin-top: 50px;
        background-color: #5C7CFA;
    }

    .add_talent_btn span {
        line-height: 30px;
        color : white;
        font-size: 14px;
        cursor: pointer;
    }

    .delect_talent_btn {
        width: 100%;
        height: 30px;
        margin-top: 10px;
        background-color: red;
    }

    .delect_talent_btn span {
        line-height: 30px;
        color : white;
        font-size: 14px;
        cursor: pointer;
    }
</style>


