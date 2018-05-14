<template>
    <div class="tip">
        <a href="#/totaltab/index"><i class="iconfont icon-store"></i><p>首页</p></a>
		<a  @click="selectTab('/totaltab/shopcar')"><i class="iconfont icon-cart"></i><p>购物车</p></a>
		<a  @click="selectTab('/letterword')"><i class="iconfont icon-comments"></i><p>我的反馈</p></a>
		<a  @click="selectTab('/collet')"><i class="iconfont icon-favorites"></i><p>我的收藏</p></a>
    </div>
</template>
<script>
    //import xheader from "../common/xheader.vue"
	import Vue from "vue";
	import Vant from 'vant';
	import { Dialog } from 'vant';
    export default{
   		 methods:{
   		 	selectTab(href){
					if(sessionStorage.getItem('userId')){
						this.$router.push({path:href});
					}else{
						Dialog.confirm({
						title: '是否登陆',
						message: '只有登陆才能操作此功能'
						}).then(() => {
							this.$router.push({path:'/login'});
						}).catch(() => {
						});
					}
			}
				
            }
    }
</script>
<style scoped>
.tips a{
	height:3rem;
	line-height: 3rem;
	width:10rem;
	display: flex;
}
.tips a>i{
	width: 30%;
	text-align: center;
}
.tips a>p{
	width: 70%;
	border-bottom: 1px solid #f3f2f2;
}
</style>