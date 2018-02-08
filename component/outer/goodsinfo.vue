<template>
    <div class="goodsinfo">
    	<div class="back" :style="{display: tipsbool==true?'block':'none'}" @click="changeHide"></div>
		<div class="tips" :style="{display: tipsbool==true?'block':'none'}">
			<a href="#/totaltab/shouye"><i class="iconfont icon-store"></i><p>首页</p></a>
			<a href="#/totaltab/classify"><i class="iconfont icon-cart"></i><p>分类</p></a>
			<a href="#/letterword"><i class="iconfont icon-comments"></i><p>我的反馈</p></a>
			<a href="#/collet"><i class="iconfont icon-favorites"></i><p>我的收藏</p></a>
		</div>
        <header>
        	<i class="iconfont icon-back"></i>
        	<p :class="xtab==1?'p_c':''" @click="changeXtab(1)">宝贝</p>
        	<p :class="xtab==2?'p_c':''" @click="changeXtab(2)">商品参数</p>
        	<p :class="xtab==3?'p_c':''" @click="changeXtab(3)">评价</p>
        	<i class="iconfont icon-category" @click="changetips"></i>
        </header>
        <div class="list1">
				<xbanner />
				<div class="detil">
					<p>
						asdasd啊空结束跨境圣诞快乐拉跨境电商来看卡好的来看
					</p>
					<h4><span>34.45</span><i>原价 : 53.23</i></h4>
					<p>
						<span>快递 : <i>23.23</i></span>
						<span>月销<i>2342</i>笔</span>
						<span>四川成都</span>
					</p>
				</div>
        </div>
    </div>
  
</template>

<script>
    import xbanner from "../common/banner1.vue"
    export default{
        components:{
            xbanner
        },
        data(){
        	return {
        		xtab:1,
        		tipsbool:false
        	}
        },
        methods:{
        	//选择选项卡，显示不用信息
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
.goodsinfo>header{
	position: fixed;	
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	background-color: #fbfbfb;
	height: 4.1rem;
	line-height: 4.1rem;
}
.goodsinfo>header>i{
	width: 20%;
	line-height: 4.6rem;
	font-size: 2.5rem;
	text-align: center;
}
.goodsinfo>header>p{
	width: 30%;
	font-size: 1.6rem;
	text-align: center;
	
}
.goodsinfo>header>.p_c{
	border-bottom:2px solid #EE4F4F ;
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
.list1{
	padding-top:4.1rem;
}
.list1>.detil{
	background-color: white;
	padding: 0 1.5rem;
}
.list1>.detil>p:first-of-type{
	letter-spacing: 1px;
	line-height: 2rem;
	font-size: 1.5rem;
	color:black;
}
.list1>.detil>h4{
	height: 2.5rem;
	line-height: 2.5rem;
}
.list1>.detil>h4>span{
	font-size: 2rem;
	color: #EE4F4F;
}
.list1>.detil>h4>i{
	font-size: 1.2rem;
	margin-left: 1rem;
	text-decoration: line-through;
}
.list1>.detil>p:last-of-type{
	display: flex;
	justify-content: space-between;
	height:2rem;
	line-height: 2rem;
}

</style>