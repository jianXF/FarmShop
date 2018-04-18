import Vue from "vue";
import "./font/iconfont.css";
import "./template/base.css";
import $ from "jquery";
import "jquery.cookie";
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);
//路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//最外层模块
import totaltab from "./component/outer/totaltab.vue";
import reg from "./component/outer/reg.vue";
import login from "./component/outer/login.vue";
import goodslist from "./component/outer/goodslist.vue";
import goodsinfo from "./component/outer/goodsinfo.vue";
import orderpage from "./component/outer/orderpage.vue";
import sellerlist from "./component/outer/sellerlist.vue";
import sellerinfo from "./component/outer/sellerinfo.vue";
import mineinfo from "./component/outer/mineinfo.vue";
import collet from "./component/outer/collet.vue";
import letterword from "./component/outer/letterword.vue";
import assessment from "./component/outer/assessment.vue";
import addresslist from "./component/outer/addresslist.vue";
import addressinfo from "./component/outer/addressinfo.vue";
import search from "./component/outer/search.vue";

//totaltab的子模块
import shouye from "./component/totaltab/shouye.vue";
import classify from "./component/totaltab/classify.vue";
import shopcar from "./component/totaltab/shopcar.vue";
import mine from "./component/totaltab/mine.vue";


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
            path:"classify",
            component: classify
        },{
            path:"shopcar",
            component:shopcar
        },{
            path:"mine",
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
    },{
        path:"/search",//搜索页面
        component:search
    },{
        path:"/",
        redirect:"/totaltab/index"
    },]
})

//配置状态
var store = new Vuex.Store({
    state:{
        //设置订单页面是哪五种情况
        selectOrder:2
    	//判断totaltab切换
        //tabId:0
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