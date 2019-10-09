<template>
    <div class="alertbar">
        <div class="alertbar_title">
            <span style="font-size: 15px; font-weight : bold;">알람 Beta</span>
        </div>

        <div class="alertList" v-for="(results, index) in alertResult" :key="index"
        @click="goType(results.type, results.userAlertId)">
           <div style="width : 100%; height : 25px;">
                <div style="float : left; width : 17%"><span style="font-size : 15px; font-weight : bold;">{{checkType(results.type)}}</span></div>
                <div style="float: left; padding-left : 15px; width : 80%"><span style="font-weight : 500;">{{checkText(results.type, results.name)}}</span></div>
           </div>
           
           <div style="width : 100%;">
               <span style="font-size : 13px; color : gray">{{foo(results.time)}}</span>
            </div>
        </div>

        
    </div>
</template>

<script>
    import {Server_IP} from '../../../server/serverIP'

export default {
    data() {
        return {
            
            alertResult : []
        }
    },
    created() {
        var userId =  localStorage.getItem('user_id');
           
        this.$http.get(`${Server_IP}/alert/user/${userId}`,{
            headers: {
                Authorization: localStorage.getItem('token')
            }})
        .then(response => {
            return response.json();
        }).then(data => {
            if(data.status == 0) {
                this.alertResult = data.result;
                
                
            } else {
                
            }
        }, error => {
            console.log(error);
        });
    },

    methods : {

        goType(type, userAlertId) {

            this.$http.get(`${Server_IP}/alert/check/${userAlertId}`,{
                headers: {
                    Authorization: localStorage.getItem('token')
                }})
            .then(response => {
                return response.json();
            }).then(data => {
                if(data.status == 0) {
                    
                    
                    
                } else {
                    
                }
            }, error => {
                console.log(error);
            });


            return this.$router.push('mypage?type='+type)
        },

         foo(timestamp){



            var date = new Date(timestamp);

            var yyyy = date.getFullYear();
            var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
            var dd  = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      
            var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();


            return yyyy+ "-" + mm + "-" + dd+ "  " + hh+ ":" + min;


        },
        checkType(index) {
                switch(index) {
                    case 1:
                        return "메세지";
                    case 2:
                        return "재능교환";
                    case 3:
                        return "재능교환";
                    default:
                        return "에러";
                }
            },

            checkText(type, name) {
                switch(type) {
                    case 1:
                        return name + "님 에게 메세지가 도착했습니다.";
                    case 2:
                        return name + "님 에게 재능교환 요청이 도착했습니다.";
                    case 3:
                        return name + "님과의 재능교환이 성사되었습니다.";
                    default:
                        return "에러";
                }
            },
    }
}
</script>

<style>
    .alertbar {
        width : 100%;
        height: 100%;
        margin-top : 50px;
    }

    .alertList {
        width : 100%;
        border-bottom: 1px solid #bfbfbf;

        padding : 15px;
    }

    .alertbar_title {
        padding-left : 15px;
        padding-top : 10px;
        padding-bottom : 10px;
        background-color: #fafafa;
        border-bottom: 1px solid #bfbfbf;

    }

</style>
