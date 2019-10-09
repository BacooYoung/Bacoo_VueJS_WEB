<template>


    <div class="search">

   
        <div class="search_list">
      
            <div class="search_ad">
                <img @click="clickads(1)" v-if="number === 1" v src="../../../assets/img/adNumber1p.png"/>
                <img @click="clickads(2)" v-else-if="number === 2" src="../../../assets/img/adNumber4.png"/>
                <img @click="clickads(3)" v-else-if="number === 3" src="../../../assets/img/fromeM.png"/>
            </div>


            <div class="search_results"  >
                <span>[{{search_val}}] - 검색 결과</span>
                
                <div class="search_results_line"></div>
            </div>

            <clip-loader v-if="check == false && nodata == false" ></clip-loader>
            <Search_List v-if="check" v-for="(results,index) in result" :key ="index" v-bind:result="results" />
            
            <Add_Request v-if="requset" :datas = "result_data"/>

            <div class="pagination" v-if="this.search_val === 'new' && this.check">
                <el-pagination
                background
                    layout="prev, next"
                    :total="result[0].count"
                    @current-change="handleCurrentChange"
                    :current-page="current_page">
                </el-pagination>
            </div>
            

            <div v-if="nodata == true" style="margin-top : 20px; margin-bottom : 50px;">
                <span>검색결과 없음</span>
            </div>


            <div class="main-recommend-request-content-nodata">
                <span>재능요청을 하시면 원하는 재능을 찾을수있습니다.</span>
                <div class="main-recommend-request-content-nodata-btn" @click="gorequest"><span>재능요청 하러가기</span></div>
            </div>
           

       </div>
    </div>
</template>


<script>
    import {Server_IP} from '../../../server/serverIP'
     import Vue from 'vue'
    export default {

        data() {
            return {
                search_val : "",
                ids : "",
                list_click : false,
                result : [],
                check : false,
                nodata : false,
                requset : false,
                number : 0,
                current_page : 1,

                result_data : [],
                data: [],
                number_list  : []
            }
        },

        updated() {
            
            window.scrollTo(0, 0);
        },
        
        created() {
            //Scrolls to top when view is displayed
            window.scrollTo(0, 0);

            this.$EventBus.$on('open_request', this.open_request);
            this.$EventBus.$on('add_request_exit', this.exit_request);
            
            this.number = Math.floor(Math.random() * 3) + 1;

            this.$http.post(`${Server_IP}/add/ads` , {
                    "userId" : localStorage.getItem("user_id") ? localStorage.getItem("user_id")  : "guest",
                    "number" : this.number,
                    "action" : "show",
                    "type" : "pc"

                })
                    .then(response => {
                        return response.json();
                    }).then(data => {

                    }, error => {
                        console.log(error);
                    });


            this.search_val = this.$route.query.tag;
            this.ids = this.$route.query.ids;

            if(!this.ids) {
                if(this.search_val === 'new') {
                    this.$http.get(`${Server_IP}/main/new/0` ,null)
                        .then(response => {
                            return response.json();
                        }).then(data => {
                            if(data.status == 0) {
                            this.result = data.result;
                            this.check = true;

                            
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
                
                }
            
                else if(this.search_val === 'recommend') {
                    this.search_val = "맞춤 추천";
                    if(localStorage.getItem('user_id')) {

                    this.$http.get(`${Server_IP}/main/request/${localStorage.getItem('user_id')}` ,null)
                    .then(response => {
                            return response.json();
                        }).then(data => {
                            if(data.status == 0) {
                            this.result = data.result;
                            this.check = true;
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
                    } else {

                        alert('잘못된 접근입니다.');
                    }

                }
                else {
                    this.$http.post(`${Server_IP}/search/`, {
                
                    main_text: this.search_val,
                    },{
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }})
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if(data.status == 0) {
                            this.result = data.result;
                            this.check = true;
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
                }
            } else {
                
                this.$http.get(`${Server_IP}/search/ids/${this.ids}` ,null)
                    .then(response => {
                            return response.json();
                        }).then(data => {
                            if(data.status == 0) {
                            this.result = data.result;
                            
                            this.search_val = data.result[0].name + "님 재능";
                            this.check = true;
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
            }
            


        },
        updated() {
            this.$nextTick(function () {
            // 모든 화면이 렌더링된 후 실행합니다.
                
            })
        },
        mounted() {
           
            this.$EventBus.$on('searchs',this.inits );
        },

        beforeDestroy() {
        
        },
        methods: {


            handleCurrentChange(number) {
                let result = this.result;
                this.result = [];
                 this.check = false;
                 this.nodata = false;
                if(number === 1) {
                    this.$http.get(`${Server_IP}/main/new/0` ,null)
                        .then(response => {
                            return response.json();
                        }).then(data => {
                            if(data.status == 0) {
                            this.result = data.result;
                            this.check = true;
                            
                        this.current_page = number;
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
                } else {
                    if(this.current_page > number) {
                        let numbers = 0;
                        this.number_list.map((content, i) => {
                            if(content.number === number) {
                                numbers = content.ids;
                            }
                        })

                        this.$http.get(`${Server_IP}/main/new/${numbers}` ,null)
                            .then(response => {
                                return response.json();
                            }).then(data => {
                                if(data.status == 0) {
                                this.current_page = number;
                                    
                                this.result = data.result;
                                this.check = true;
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
                    } else {
                        this.number_list.push({
                            "number" : number,
                            "ids" : result[result.length-1].talentlistId
                        });
                        this.$http.get(`${Server_IP}/main/new/${result[result.length-1].talentlistId}` ,null)
                            .then(response => {
                                return response.json();
                            }).then(data => {
                                if(data.status == 0) {
                                this.current_page = number;
                                    
                                this.result = data.result;
                                this.check = true;
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
                        }
                    
                
                }
                    
            },
            gorequest() {
                this.$router.push('/talent/request');
            }, 
            open_request(data) {
                this.requset = true;

                this.result_data = data.datas;
            },

            exit_request(data) {
                this.requset = false;
            },
            inits(test) {
                if(test !== this.search_val) {
                    this.search_val = test;
                    this.result = [];
                    this.$http.post(`${Server_IP}/search/`, {
                            main_text: test,
                    })
                            .then(response => {
                                return response.json();
                            }).then(data => {
                                if(data.status == 0) {
                                    this.result = data.result;
                                    this.check = true;
                                    this.nodata = false;
                                } else if(data.status == 1) {
                                    this.result = [];
                                    this.nodata = true;
                                    this.check = false;
                                } 
                                else {
                                    this.result = [];
                                    this.check = false;
                                }
                            }, error => {
                                console.log(error);
                            });
                }
            },

            clickads(url) {
                if(url === 1) {
                     this.$http.post(`${Server_IP}/add/ads` , {
                    "userId" : localStorage.getItem("user_id") ? localStorage.getItem("user_id")  : "guest",
                    "number" : 1,
                    "action" : "click",
                    "type" : "pc"

                })
                    .then(response => {
                        return response.json();
                    }).then(data => {

                    }, error => {
                        console.log(error);
                    });
                    
                    window.open("http://www.the-aube.com", '_blank');
                
                } else if(url === 2) {
                     this.$http.post(`${Server_IP}/add/ads` , {
                    "userId" : localStorage.getItem("user_id") ? localStorage.getItem("user_id")  : "guest",
                    "number" : 4,
                    "action" : "click",
                    "type" : "pc"

                })
                    .then(response => {
                        return response.json();
                    }).then(data => {

                    }, error => {
                        console.log(error);
                    });
                    
                    window.open("https://www.jei.com/", '_blank');
                
                } else if(url === 3) {
                     this.$http.post(`${Server_IP}/add/ads` , {
                    "userId" : localStorage.getItem("user_id") ? localStorage.getItem("user_id")  : "guest",
                    "number" : 6,
                    "action" : "click",
                    "type" : "pc"

                })
                    .then(response => {
                        return response.json();
                    }).then(data => {

                    }, error => {
                        console.log(error);
                    });
                
                }
            }
        }
    }
</script>

<style>
.el-pagination .btn-prev .el-icon{
    font-size : 28px;
    padding: 5px;
}
.el-pagination .btn-next .el-icon {
    
    font-size : 28px;
    padding: 5px;
}

.el-pagination button {
    height: 35px;
    padding: 10px;
}

 .el-pagination.is-background .btn-prev {
     margin-right : 50px;
     
 }

 .el-pagination.is-background .btn-next {

     margin-left : 50px;
 }
</style>


<style scoped>
.search{

    width: 1280px;
    position: absolute;
    margin: 0 auto;
    left: 50%; 
    transform: translateX(-50%); 


    font-family: "Noto Sans KR","Apple Gothic","돋움",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
}

.search_list{
    margin : 0 auto;
    width: 1024px;
    margin-top : 80px;

}

.search_ad {
    margin-top : 10px;
    margin-bottom : 30px;
    width: 1024px;
    height: 300px;
    cursor: pointer;
}

.search_ad img {
    width: 100%; 
    height: 300px;
    border : 1px solid #ededed;
}

.search_results {
    width: 1024px;
    height: 40px;
}

.search_results span {
    font-size : 16px;
    font-weight: 700;
    color : black;
}

.search_results_line {
    margin-top : 5px;
    width : 1024px;
    height: 2px;
    background-color : black;
}

.main-recommend-request-content-nodata {
    width: 1028px;
    float: left; 
    margin-bottom : 100px;    
    height: 200px;
    border : 1px solid #eddede;
    text-align : center;
}

.main-recommend-request-content-nodata span {
    line-height : 100px;
    color : #000000;
    font-size : 14px;
    font-weight : 500;
}

.main-recommend-request-content-nodata-btn {
    width : 300px;
    height: 50px;
    background-color : #f87a65;
    text-align : center;
    margin : 0 auto;
    cursor: pointer;
}


.main-recommend-request-content-nodata-btn span {
    line-height : 50px;
    color : #ffffff;
    
    font-size : 16px;
    font-weight : 500;
}

.pagination {
    width : 1024px;
    height: 100px;
    text-align : center;
}



</style>
