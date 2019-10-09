import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';


import ElementUI from 'element-ui'
require('./assets/css/index.css');
import locale from 'element-ui/lib/locale/lang/en'

import VueResourceNProgress from 'vue-resource-nprogress';

import NProgress from 'nprogress'


import App from './App.vue'
import store from './store'

import MobileDetect from 'mobile-detect';

Vue.component("fab", () => import('vue-fab'));


    /* 데스크탑 */
    
  Vue.component("Header", () => import('./Ui/Header.vue'));
  Vue.component("Footer", () => import('./Ui/Footer.vue'));
  Vue.component("FeedBack", () => import('./Ui/PC/Main/feedback.vue'));
  
  Vue.component("Content", () => import('./Ui/PC/Main/Content.vue'));
  Vue.component("Login",  () => import('./Ui/PC/Main/login.vue'));
  Vue.component("Signup", () => import('./Ui/PC/Main/signup.vue'));
  Vue.component("Search",  () => import('./Ui/PC/Search/search.vue'));
  Vue.component("Search_List", () => import('./Ui/PC/Search/search_list.vue'));
  Vue.component("Request_Talent", () => import('./Ui/PC/RequestTalent/request_talent.vue'));
  Vue.component("Request_Talent_List", () => import('./Ui/PC/RequestTalent/request_talent_list.vue'));
  Vue.component("MyPage", () => import('./Ui/PC/MyPage/mypage.vue'));
  Vue.component("MyProfile", () => import('./Ui/PC/MyPage/myprofile.vue'));
  Vue.component("InputRequest",  () => import('./Ui/PC/MyPage/input_request.vue'));
  Vue.component("InputRequest_List",  () => import('./Ui/PC/MyPage/input_request_list.vue'));
  Vue.component("MyRequest", () => import('./Ui/PC/RequestTalent/my_request.vue'));
  Vue.component("MyRequestList", () => import('./Ui/PC/RequestTalent/my_request_list.vue'));
  Vue.component("TalentRequest", () => import('./Ui/PC/MyPage/talent_request.vue'));
  Vue.component("TalentRequestList",  () => import('./Ui/PC/MyPage/talent_request_list.vue'));
  Vue.component("MatchedTalent", () => import('./Ui/PC/MyPage/matched_talent.vue'));
  Vue.component("MatchedTalentList", () => import('./Ui/PC/MyPage/matched_talent_list.vue'));
  Vue.component("Detail_Talent",  () => import('./Ui/PC/RequestTalent/detail_talent.vue'));
  Vue.component("Add_Talent",  () => import('./Ui/PC/MyPage/add_talent.vue'));
  Vue.component("Add_Location", () => import('./Ui/PC/MyPage/add_location.vue'));
  Vue.component("Message", () => import('./Ui/PC/MyPage/message.vue'));
  Vue.component("Add_Request", () => import('./Ui/PC/Search/add_request.vue'));
  Vue.component("Add_Memo", () => import('./Ui/PC/MyPage/add_memo.vue'));

  Vue.component("Forgot", () => import('./Ui/PC/Main/fogot.vue'));
    
  Vue.component("Header_m",  () => import('./Ui/Header_m.vue'));
  Vue.component("Content_m", () => import('./Ui/Mobile/Main/Content.vue'));
  Vue.component("Search_m", () => import('./Ui/Mobile/Search/search.vue'));
  Vue.component("Search_List_m", () => import('./Ui/Mobile/Search/search_list.vue'));
  Vue.component("Login_m", () => import('./Ui/Mobile/Main/login.vue'));
  Vue.component("Signup_m",  () => import('./Ui/Mobile/Main/signup.vue'));
  Vue.component("FeedBack_m", () => import('./Ui/Mobile/Main/feedback.vue'));
  
  Vue.component("SearchBar_m", () => import('./Ui/Mobile/Main/searchbar.vue'));
  Vue.component("Request_Talent_m", () => import('./Ui/Mobile/RequestTalent/request_talent.vue'));
  Vue.component("Request_Talent_List_m", () => import('./Ui/Mobile/RequestTalent/request_talent_list.vue'));
  Vue.component("MyPage_m", () => import('./Ui/Mobile/MyPage/mypage.vue'));
  Vue.component("MyProfile_m", () => import('./Ui/Mobile/MyPage/myprofile.vue'));
  Vue.component("InputRequest_m", () => import('./Ui/Mobile/MyPage/input_request.vue'));
  Vue.component("InputRequest_List_m",  () => import('./Ui/Mobile/MyPage/input_request_list.vue'));
  Vue.component("MyRequest_m",  () => import('./Ui/Mobile/RequestTalent/my_request.vue'));
  Vue.component("MyRequestList_m", () => import('./Ui/Mobile/RequestTalent/my_request_list.vue'));
  Vue.component("Add_Talent_m", () => import('./Ui/Mobile/MyPage/add_talent.vue'));
  Vue.component("Add_Location_m", () => import('./Ui/Mobile/MyPage/add_location.vue'));
  Vue.component("TalentRequest_m",  () => import('./Ui/Mobile/MyPage/talent_request.vue'));
  Vue.component("TalentRequestList_m", () => import('./Ui/Mobile/MyPage/talent_request_list.vue'));
  Vue.component("MatchedTalent_m", () => import('./Ui/Mobile/MyPage/matched_talent.vue'));
  Vue.component("MatchedTalentList_m", () => import('./Ui/Mobile/MyPage/matched_talent_list.vue'));
  Vue.component("Message_m", () => import('./Ui/Mobile/MyPage/message.vue'));
  Vue.component("Add_Request_m", () => import('./Ui/Mobile/Search/add_request.vue'));
  Vue.component("Add_Memo_m", () => import('./Ui/Mobile/MyPage/add_memo.vue'));

  Vue.component("Forgot", () => import('./Ui/Mobile/Main/forgot.vue'));
  


global.jQuery = require('jquery');

import 'slick-carousel';
var $ = global.jQuery;
window.$ = $;

window.NProgress = NProgress;

require('nprogress/nprogress.css')



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueResourceNProgress);
Vue.use(ElementUI, { locale });

Vue.component('clip-loader',() => import('vue-spinner/src/ClipLoader.vue'));


const md = new MobileDetect(window.navigator.userAgent);

var routes = "";
  if(md.phone()) {

    routes = [
      { path : '', component : () => import('./Ui/Mobile/Main/Content.vue')},
      { path : '/forgot', component : () => import('./Ui/Mobile/Main/forgot.vue')},   
      { path : '/search', component : () => import('./Ui/Mobile/Search/search.vue')},
      { path : '/login', component: () => import('./Ui/Mobile/Main/login.vue') },
      { path : '/signup', component: () => import('./Ui/Mobile/Main/signup.vue') },
      { path : '/talent/request', component: () => import('./Ui/Mobile/RequestTalent/request_talent.vue') },
      { path : '/alert', component: () => import('./Ui/Mobile/Main/alertbar.vue') },
      { path : '/mypage', component:  () => import('./Ui/Mobile/MyPage/mypage.vue') }
    ];  
    
    localStorage.setItem("type", 'mobile');

   
   
  }
  else {
    routes = [
      { path : '', component : () => import('./Ui/PC/Main/Content.vue')},
      { path : '/forgot', component : () => import('./Ui/PC/Main/fogot.vue')},
      { path : '/search', component : () => import('./Ui/PC/Search/search.vue')},
      { path : '/talent/request', component: () => import('./Ui/PC/RequestTalent/request_talent.vue') },
      { path : '/mypage', component: () => import('./Ui/PC/MyPage/mypage.vue') }
    ];  
    
    localStorage.setItem("type", 'pc');
}




const router = new VueRouter({
  routes,
  
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
});


Vue.prototype.$EventBus = new Vue();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
