import Vue from "vue";
import "weui";
import "./font/iconfont.css";
import "./template/base.css";
import $ from "jquery";
import "jquery.cookie";
//路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//最外层模块
import totaltab from "./component/outer/totaltab";
import reg from "./component/outer/reg";
import login from "./component/outer/login";
import goodslist from "./component/outer/goodslist";
import goodsinfo from "./component/outer/goodsinfo";
import orderpage from "./component/outer/orderpage";
import orderpage from "./component/outer/orderpage";
import sellerlist from "./component/outer/sellerlist";
import sellerinfo from "./component/outer/sellerinfo";
import mineinfo from "./component/outer/mineinfo";
import collet from "./component/outer/collet";
import letterword from "./component/outer/letterword";
import assessment from "./component/outer/assessment";
import addresslist from "./component/outer/addresslist";
import addressinfo from "./component/outer/addressinfo";

//totaltab的子模块
import shouye from "./component/totaltab/shouye";
import classify from "./component/totaltab/classify";
import shopcar from "./component/totaltab/shopcar";
import minme from "./component/totaltab/minme";


//状态管理
import Vuex from 'vuex';
Vue.use(Vuex);

//配置路由
var router = new VueRouter({
    routes: [{
        path: "/totaltab",//选项卡
        component: totaltab,
        children: [{
            path: 'index',
            component: shouye
        },{
            path:"/classify",
            component: classify
        },{
            path:"/shopcar",
            component:shopcar
        },{
            path:"/minme",
            component:mine
        }]
    }, {
        path: "/reg",
        component: reg
    },{
        path:"/login",
        component: login
    },{
        path:"/goodslist",//商品列表页
        component:goodslist
    },{
        path:"/goodsinfo",//商品详情页
        component:goodsinfo
    },{
        path:"/orderpage",//我的订单页（待付款，待发货，待收货。。）
        component:orderpage
    },{
        path:"/sellerlist",//电商列表页
        component:sellerlist
    },{
        path:"/sellerinfo",//电商信息页
        component:sellerinfo
    },{
        path:"/mineinfo",//个人信息页
        component:mineinfo
    },{
        path:"/collet",//收藏页
        component:collet
    },{
        path:"/letterword",//留言(反馈)
        component:letterword
    },{
        path:"/assessment",//查看个人评价
        component:assessment
    },{
        path:"/addresslist",//收货地址列表页
        component:addresslist
    },{
        path:"/addressinfo",//修改添加收货地址
        component:addressinfo
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