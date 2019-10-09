<template>
    <div class="searchbar">
        <div class="searchbar_input">
            <el-input
                id="search_bar_2"
                placeholder="원하시는 재능을 검색해보세요!"
                prefix-icon="el-icon-search"
                v-model="search_value"
                @keyup.enter.native="search_click"  >
            </el-input>


            <div class="searchbar_btn" @click="search_click">
                <span>검색</span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            search_value : ""
        }
    },
    created() {
       
    },

    methods : {
        search_click() {

            this.$EventBus.$emit('search_check',0 );
            this.$router.push('/search?tag='+this.search_value);

            this.$EventBus.$emit('searchs',this.search_value );
        }
    }
}
</script>

<style>
    .searchbar {
        width : 100%;
        height: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        background : rgba(0,0,0,.5); 
    }

    .searchbar_input {
        padding-top : 70px;
        width : 100%;
        height: 125px;
        padding-bottom : 15px;
        padding-right : 15px;
        text-align: center;
        background: #fff;
        border-radius: 5px;
    }

    #search_bar_2 {
        float : left;
        width : 90%;
        height: 40px;
        margin-left : 20px;
        line-height: 40px;
        border-radius: 4px;
    }

    .el-input, el-input--prefix {
        
        float : left;
        width : 80%;
        height: 40px;
    }

    .el-input__prefix {
        
        margin-left : 20px;
    }

    .searchbar_btn {
        width :20%;
        padding-left : 15px;
        padding-right : 15px;
        height: 40px;
        float : left;
        background-color:#409EFF;
        border-radius: 4px;
    }

    .searchbar_btn span {
        color : #ffffff;
        font-size: 17px;
        line-height: 40px;
    }

</style>
