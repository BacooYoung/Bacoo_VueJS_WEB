<template>
  <div id="app">
    <Header v-if="type == 'pc'"/>
    <Header_m v-else />
    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  
  
  name: 'app',
  data () {
    return {
      type: ""
    }
  },

  created() {
    if(localStorage.getItem('type') == 'pc') {
      this.type = "pc";
    } else {
      this.type = "mobile";
    }



  }
}
</script>

<style>

</style>
