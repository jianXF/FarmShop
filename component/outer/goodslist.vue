<!--商品列表页-->
<template>
	<div>
		<div class="back" :style="{display: tipsbool==true?'block':'none'}" @click="changeHide"></div>
		<div class="tips" :style="{display: tipsbool==true?'block':'none'}">
		<a href="#/totaltab/shouye"><i class="iconfont icon-store"></i><p>首页</p></a>
		<a href="#/totaltab/shopcar"><i class="iconfont icon-cart"></i><p>购物车</p></a>
		<a href="#/letterword"><i class="iconfont icon-comments"></i><p>我的反馈</p></a>
		<a href="#/collet"><i class="iconfont icon-favorites"></i><p>我的收藏</p></a>
	</div>
    <div class="goodslist">
        <header>
        	<a href="#/totaltab/index" class="iconfont icon-back"></a>
        	<a href="#/search">
        		<input type="text"/>
        	</a>
        	<p class="iconfont icon-category" @click="changetips"></p>
        </header>
        <nav>
        	<p :class="xtab==1?'font-show':' '" @click="changeXtab(1)">最新</p>
        	<p :class="xtab==2?'font-show':' '" @click="changeXtab(2)">销量</p>
        	<p :class="xtab==3?'font-show':' '" @click="changeXtab(3)">价格<i :class="xtab==3?'iconfont icon-moreunfold i_c':'iconfont icon-moreunfold'"></i></p>
        	<p :class="xtab==4?'font-show':' '" @click="changeXtab(4)">价格<i :class="xtab==4?'iconfont icon-less i_c':'iconfont icon-less'"></i></p>
        </nav>
        <xgoodlist style="padding-top:8.1rem"/>
        <p class="nonegood">亲，已经没有商品了哦</p>
    </div>
	</div>
    
</template>

<script>
    import xgoodlist from "../common/goodlist.vue"
    export default{
        components:{
            xgoodlist
        },
        data(){
        	return {
        		xtab:1,
        		tipsbool:false
        	}
        },
       
        methods:{ 
        	//点击不同的排序方式
        	changeXtab(id){
        		this.xtab=id;
        	},
        	//点击头部右边选择功能
        	changetips(){
        		this.tipsbool=true;
        	},
        	//功能卡显示，点击back隐藏
        	changeHide(){
        		this.tipsbool=false;
        	}
        }
    }
</script>
<style scoped>
.goodslist>header{
	height: 4.1rem;
	line-height:2.5rem;
	display: flex;
	padding: 0.8rem 0.8rem;
	text-align: center;
	background-color: #fbfbfb;
	position: fixed;
	box-sizing: border-box;
	width: 100%;
	top:0;
	left:0;
}
.goodslist>header>a:first-of-type{
	width: 10%;
	font-size: 2.4rem;
	text-align: left;
}
.goodslist>header>a:last-of-type{
	width:80%;
	border-bottom:1px solid #ADADAD;
}
.goodslist>header input{
	outline: none;
	border: 0;
	margin: auto 0;
	font-size: 2rem;
	width: 90%;
	background-color: #fbfbfb;
	margin-top:-1px;
}
.goodslist>header>p{
	width:10%;
	font-size: 2.3rem;
	margin-left: 1rem;
	color: black;
}	
.goodslist>nav{
	top:4.1rem;
	display: flex;
	justify-content: space-around;
	text-align: center;
	position: fixed;
	width: 100%;
	height: 4rem;
	line-height: 4rem;
	background-color:white ;
}
.goodslist>nav>p{
	text-align: center;
	width: 25%;
	font-size: 1.4rem;
	position: relative;
}
.goodslist>nav>p>i{
	font-size: 2rem;
	color: black;
	padding-top:0.2rem;
	position: absolute;
	top:0;
	right: 1rem;
}
.goodslist>nav>p>.i_c{
	color: #EE4F4F;
}
.tips{
	position: fixed;
	top:3rem;
	right: 2px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 10px rgba(0,0,0,0.13);
	z-index: 11;
	background-color: white;
	display: none;
}
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
.back{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0);
	top:0;
	left:0;
	z-index:10;
	display: none;
}
.nonegood{
	height:4rem;
	line-height: 4rem;
	font-size: 1.6rem;
	text-align: center;
}
</style>