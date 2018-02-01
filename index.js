import Vue from "vue";
import "weui";
import "./font/iconfont.css";
import "./template/base.css";
import $ from "jquery";
import "jquery.cookie";
//路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//outer

//tabchildren


//引用个人信息的模块


//状态管理
import Vuex from 'vuex';
Vue.use(Vuex);

//配置路由
var router = new VueRouter({
    routes: [{
        path: "/totaltab",
        component: totaltab,
        children: [{
            path: 'wechat',
            component: wechat
        }]
    }, {
        path: "/dialog",
        component: dialog
    }]
})

//配置状态
var store = new Vuex.Store({
    state:{
        myId:""
    }
})

new Vue({
    el: "#app",
    template: `
        <div id="box">
            <router-view></router-view>
        </div> 
    `,
    router,
    store
})