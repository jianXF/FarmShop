<template>
    <div style="background-color: #F6F6F6;padding-bottom: 3.8rem;">
    	<xheader :message="title"/>
		<div class="myhead">
			<img  :src="src" />
			<p>asdkasdaks</p>
		</div>
		<div class="order">
			<p><span>全部订单</span><a href="#/orderpage">查看全部订单<i class="iconfont icon-more"></i></a></p>
			<section>
				<a v-for="i in arr">
					<i :class="i.icon"></i>
					<span v-text="i.name"></span>
					<em>0</em>
				</a>
			</section>
		</div>
		<div class="list">
			<a href="#/mineinfo"><span><i class="iconfont icon-set" style="background-color: #41B9FC;"></i>设置</span><span >修改信息<i class="iconfont icon-more"></i></span></a>
			<a href="#/collet"><span><i class="iconfont icon-favorites" style="background-color: #FCBA19;"></i>我的收藏</span><span >商品收藏/店铺收藏<i class="iconfont icon-more"></i></span></a>
			<a href="#/addresslist"><span><i class="iconfont icon-auto" style="background-color: #71A1FD;"></i>收货地址</span><span >添加/修改<i class="iconfont icon-more"></i></span></a>
			<a href="#/letterword"><span><i class="iconfont icon-comments" style="background-color: #43CA5E;"></i>我的反馈</span><span >投诉/留言<i class="iconfont icon-more"></i></span></a>
			<a href="#/orderpage"><span><i class="iconfont icon-refresh" style="background-color: #3FC1FF;"></i>注销登录</span><span ><i class="iconfont icon-more"></i></span></a>
			
		</div>
    </div>
</template>

<script>
	import src from "../../img/user.jpg";
    import xheader from "../common/header1.vue"
    export default{
        components:{
            xheader
        },
        data(){
        	return {
        		title:"我的",
        		src:src,
        		arr:[{
        			id:0,
        			name:"待付款",
        			icon:"iconfont icon-box",
        			bool:false
        		},{
        			id:1,
        			name:"待发货",
        			icon:"iconfont icon-productfeatures",
        			bool:false
        		},{
        			id:2,
        			name:"待收货",
        			icon:"iconfont icon-similarproduct",
        			bool:false
        		},{
        			id:3,
        			name:"待评价",
        			icon:"iconfont icon-edit",
        			bool:false
        		}]
        	}
        }
    }
</script>
<style scoped>
.myhead{
	height:6rem;
	line-height:6rem;
	display: flex;
	padding:1rem 2rem;
	padding-top:5.2rem;
	border-bottom: 1px solid #D0D0D0;
	background-color: white;
	
}
.myhead>img{
	width:6.5rem;
	border-radius: 50%;
	border:1px solid #EE4F4F;
}
.myhead>p{
	font-size: 2rem;
	margin-left:2rem;
	color:#EE4F4F;
}
.order{
	margin-top:1rem;
	background-color: white;
	
}
.order>p{
	line-height: 3.5rem;
	height:3.5rem;
	display: flex;
	justify-content: space-between;
	padding:0 0.8rem;
	border-bottom: 1px solid #f1f1f1;
}
.order>p>span:first-of-type{
	font-size: 1.5rem;
	color: black;
}

.order>p>a{
	font-size: 1.2rem;
}
.order>p>a>.icon-more{
	padding-left:0.4rem;
	color:#52545E;
}
.order>section{
	display: flex;
	justify-content: space-around;
	padding:2rem 0;
	border-bottom: 1px solid #f1f1f1;
}
.order>section>a{
	display: flex;
	flex-direction: column;
	position: relative;
}
.order>section>a>i{
	font-size: 3rem;
}
.order>section>a>span{
	margin-top:0.5rem;
}
.order>section>a>em{
	color:white;
	position: absolute;
	top:-0.5rem;
	right: -0.2rem;
	z-index: 1;
	border-radius: 50%;
	width: 1.2rem;
	height: 1.2rem;
	font-style: normal;
	text-align: center;
	padding:0.2rem;
	line-height: 1.2rem;
	font-size: 1.4rem;
	background-color: #EE4F4F;
	
}
.list{
	margin-top:1rem;
	background-color: white;
	
}
.list>a{
	line-height: 4.5rem;
	height:4.5rem;
	display: flex;
	justify-content: space-between;
	padding:0 0.8rem;
	border-bottom: 1px solid #f1f1f1;
}
.list>a>span:first-of-type{
	font-size: 1.5rem;
	color: black;
	margin-left:0.5rem;
}
.list>a>span:first-of-type>i{
	color:white;
	box-sizing: border-box;
	padding:0.5rem;
	border-radius: 10%;
	margin-right:1rem;
}
.list>a>span:last-of-type{
	font-size: 1.2rem;
}
.list>a>span:last-of-type>.icon-more{
	padding-left:0.4rem;
	color:#52545E;
}
</style>