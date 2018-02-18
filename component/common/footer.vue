<template>
    <div>
        <footer class="tablist" style="overflow: hidden;">
            <a v-for="i in arr" @click="selectTab(i.id)" :href="i.href">
                <i :class="i.font" :style="{color:sumId==i.id?'#EE4F4F':'#52545E',fontWeight:sumId==i.id?'700':'500' }"></i>
                <span v-text="i.name" :style="{color:sumId==i.id?'#EE4F4F':'#52545E'}">首页</span>
            </a>
        </footer>
    </div>
</template>
<script>
    //import xheader from "../common/xheader.vue"
    import Vue from "vue";
    export default{
        data(){
        	return{
        		sumId:0,
	        	arr:[{
	        		id:0,
	        		name:"首页",
	        		font:"iconfont icon-store",
	        		href:"#/totaltab/index"
	        	},{
	        		id:1,
	        		name:"分类",
	        		font:"iconfont icon-viewgallery",
	        		href:"#/totaltab/classify"
	        	},{
	        		id:2,
	        		name:"购物车",
	        		font:"iconfont icon-cart",
	        		href:"#/totaltab/shopcar"
	        	},{
	        		id:3,
	        		name:"我的",
	        		font:"iconfont icon-bussinessman",
	        		href:"#/totaltab/mine"
	        	}]
        	}
   		 },
   		 methods:{
   		 	selectTab(id){
   		 		this.sumId=id;
   		 	}
   		 }
   }
</script>
<style scoped>
.tablist{
	z-index: 10;
	background-color: white;
	position:fixed;
	bottom:0px;
	left:0px;
	border-top: 1px solid #F2F3F3;
    display:flex;
    height:3.8rem;
    width:100%;
    padding-top:2px;
    box-shadow: 0px 10px 10px #F3F3F3;
    
}
.tablist>a{
	flex: 1;
	display: flex;
	flex-direction: column;
	text-align: center;
}
.tablist>a>i{
	flex:1;
	font-size: 2rem;
	line-height: 2.25rem;
}
.tablist>a>span{
	flex:1;
	line-height: 1.55rem;
}
</style>