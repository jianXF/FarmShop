<template>
    <div id="orderpage">
        <!--右上提示框的背景覆盖-->
    	<div class="back" :style="{display: tipsbool==true?'block':'none'}" @click="changeHide"></div>
    	<!--加入购物车的背景覆盖-->
    	<div class="back1" :style="{display:carbool==true?'block':'none'}" @click="cancalAdd"></div>
		<div class="tips" :style="{display: tipsbool==true?'block':'none'}">
			<a href="#/totaltab/index"><i class="iconfont icon-store"></i><p>首页</p></a>
			<a href="#/totaltab/classify"><i class="iconfont icon-cart"></i><p>分类</p></a>
			<a href="#/letterword"><i class="iconfont icon-comments"></i><p>我的反馈</p></a>
			<a href="#/collet"><i class="iconfont icon-favorites"></i><p>我的收藏</p></a>
		</div>
        <header>
        	<div><a href="#/totaltab/mine" class="iconfont icon-back"></a>
        	<p >我的订单</p></div>
        	<i class="iconfont icon-category" @click="changetips"></i>
        </header>
        <section>
        	<p :class="xtab==1?'p_c':''" @click="changeXtab(1)">全部</p>
        	<p :class="xtab==2?'p_c':''" @click="changeXtab(2)">待付款</p>
        	<p :class="xtab==3?'p_c':''" @click="changeXtab(3)">待发货</p>
        	<p :class="xtab==4?'p_c':''" @click="changeXtab(4)">待收货</p>
        	<p :class="xtab==5?'p_c':''" @click="changeXtab(5)">待评价</p>
        </section>
        <div class="con" :style="{display:xtab=='1'?'block':'none'}">
        		<div class="nothing">
        			<p>您还没有相关的订单</p>
        			<span>可以去看看有哪些想买的</span>
        		</div>
				<div class='list'>
        		<header>
        			<p>
        				<span>是大家分开店铺</span>
        				<i class="iconfont icon-more"></i>
        			</p>
        			<span>卖家已发货</span>
        		</header>
        		<div class="center">
        			<img :src='src' />
        			<div class='title'>
        				<p>
        					笔记本电脑做桌床上用移动可折叠升降宿舍懒人桌子简易学习小书桌
        				</p>
        				<i>
        					技术开发将加快
        				</i>
        			</div>
        			<div class="money">
        				<p>￥435.56</p>
        				<p>X1</p>
        			</div>
        		</div>
        		<footer>
        			<span>确认收货</span>
        		</footer>
        	</div>
        	<div class='list'>
        		<header>
        			<p>
        				<span>是大家分开店铺</span>
        				<i class="iconfont icon-more"></i>
        			</p>
        			<span>卖家已发货</span>
        		</header>
        		<div class="center">
        			<img :src='src' />
        			<div class='title'>
        				<p>
        					笔记本电脑做桌床上用移动可折叠升降宿舍懒人桌子简易学习小书桌
        				</p>
        				<i>
        					技术开发将加快
        				</i>
        			</div>
        			<div class="money">
        				<p>￥435.56</p>
        				<p>X1</p>
        			</div>
        		</div>
        		<footer>
        			<span>确认收货</span>
        		</footer>
        	</div>
        
        </div>
    	<div class="con" :style="{display:xtab=='2'?'block':'none'}">
        		<div class="nothing">
        			<p>您还没有相关的订单</p>
        			<span>可以去看看有哪些想买的</span>
        		</div>        
        </div>
        <div class="con" :style="{display:xtab=='3'?'block':'none'}">
        	<div class='list'>
        		<header>
        			<p>
        				<span>是大家分开店铺</span>
        				<i class="iconfont icon-more"></i>
        			</p>
        			<span>卖家已发货</span>
        		</header>
        		<div class="center">
        			<img :src='src' />
        			<div class='title'>
        				<p>
        					笔记本电脑做桌床上用移动可折叠升降宿舍懒人桌子简易学习小书桌
        				</p>
        				<i>
        					技术开发将加快
        				</i>
        			</div>
        			<div class="money">
        				<p>￥435.56</p>
        				<p>X1</p>
        			</div>
        		</div>
        		<footer>
        			<span>确认收货</span>
        		</footer>
        	</div>      
        </div>
    	<div class="con" :style="{display:xtab=='4'?'block':'none'}">
        		<div class="nothing">
        			<p>您还没有相关的订单</p>
        			<span>可以去看看有哪些想买的</span>
        		</div>        
        </div>
        <div class="con" :style="{display:xtab=='5'?'block':'none'}">
        	<div class='list'>
        		<header>
        			<p>
        				<span>是大家分开店铺</span>
        				<i class="iconfont icon-more"></i>
        			</p>
        			<span>卖家已发货</span>
        		</header>
        		<div class="center">
        			<img :src='src' />
        			<div class='title'>
        				<p>
        					笔记本电脑做桌床上用移动可折叠升降宿舍懒人桌子简易学习小书桌
        				</p>
        				<i>
        					技术开发将加快
        				</i>
        			</div>
        			<div class="money">
        				<p>￥435.56</p>
        				<p>X1</p>
        			</div>
        		</div>
        		<footer>
        			<span>确认收货</span>
        		</footer>
        	</div>      
        </div>
    
    </div>
  
</template>

<script>
	import src from "../../img/user.jpg";
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            //xfooter
        },
        data(){
        	return {
        		src:src,
        		tipsbool:false,//右上角的弹出框控制
        		carbool:false,	//加入购物车选择的弹出框
        		xtab:1,			//选项卡id
        	}
        },
        methods:{
			
        	////选择选项卡，显示不同信息
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
        	},//点击加入购物车，弹出选择数量框及蒙版
	       	showAdd(){
	       		this.carbool=true;
	       	},
	       	//取消添加购物车（点击叉叉）
	       cancalAdd(){
	       	this.carbool=false;
	       }
		},
		mounted(){
			this.xtab=this.$store.state.selectOrder;
			
		}
    }
</script>
<style scoped>
#orderpage>header{
	position: fixed;	
	top: 0;
	left: 0;
	width: 100%;
	z-index:10;
	display: flex;
	background-color: #fbfbfb;
	justify-content: space-between;
	height: 4.1rem;
	line-height: 4.1rem;
}
#orderpage>header>div{
	width:45%;
	display: flex;
}
#orderpage>header>div>a{
	width:30%;
	line-height: 4.6rem;
	font-size: 2.5rem;
	text-align: center;
}
#orderpage>header>i{
	width: 15%;
	line-height: 4.6rem;
	font-size: 2.5rem;
	text-align: center;
	float: right;
}
#orderpage>header>div>p{
	width: 70%;
	font-size: 1.6rem;
	text-align: canter;
	
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
	z-index:11;
	display: none;
}
section{
	position: fixed;	
	top: 4.1rem;
	left: 0;
	width: 100%;
	z-index:10;
	display: flex;
	justify-content: space-around;
	height: 3.5rem;
	line-height: 3.5rem;
	background-color: white;
}
section>p{
	width: 20%;
	font-size: 1.4rem;
	text-align: center;
}
section>.p_c{
	border-bottom:2px solid #EE4F4F ;
	color: #EE4F4F;
}
.con{
	margin-top: 8.1rem;
}
.list{
	margin-top: 0.5rem;
	background-color: white;
}
.list>header{
	padding: 0 1.5rem;
	height: 3rem;
	line-height: 3rem;
	font-size: 1.6rem;
	display: flex;
	justify-content: space-between;
}
.list>header>span{
	color:#EE4F4F
}
.list>.center{
	display: flex;
	justify-content: space-around;
	height: 6.5rem;
	padding: 0.5rem 1rem;
	background-color: #FAFAFA;
}
.list>.center img{
	width:30%;
}
.list>.center>.title{
	padding: 0 1rem;
	
}
.list>.center>.title p{
	color:black;
	font-size: 1.2rem;
	margin-bottom: 2px;
	width:94%;
}
.list>.center>.title i{
	font-size: 1.1rem;
	width:94%;
}
.list>.money{
	text-align: right;
	
}
.list .money>p:nth-of-type(1){
	color: black;
	font-weight: 800;
	text-align: right;
	font-size: 1.3rem;
}
.list .money>p:nth-of-type(2){
	color:#999999;
	text-align: right;
}
.list>footer{
	height: 2rem;
	padding: 0.5rem 1rem;
	display: flex;
	justify-content: flex-end;
}
.list>footer>span{
	line-height:2rem;
	color: #FF9D70;
	font-weight: 800;
	border:1px solid  #FF9D70;/*#D8D8D8*/
	padding: 0 0.5rem;
}
.con>.nothing{
	height:20rem;
}
.con>.nothing>p{
	font-size: 1.7rem;
	color: #686868;
	padding-top:8rem;
	text-align: center;
	margin-bottom: 1rem;
}
.con>.nothing>span{
	font-size: 1.2rem;
	color: #ACACAC;
	display: block;
	text-align: center;
}
</style>