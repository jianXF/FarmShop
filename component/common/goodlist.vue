<template>
	<ul class="goodlist">
		<li v-for="i in goods">
			<a href="#/goodsinfo"><img :src="i.src"/></a>
			<p v-text="i.name"></p>
			<p>
				<span class="bao" v-if="i.bool==0">包邮</span>
				<span class="place" v-text="i.place"></span>
			</p>
			<p>
				<span >￥{{i.price}}</span>
				<span>{{i.price}}人付款</span>
			</p>
			
		</li>
	</ul>
</template>

<script>
	import src from "../../img/user.jpg";
	export default{
		data(){
			return {
				goods:[{
					id:0,
					name:"手机宽捡垃圾发了基拉对方带里撒地方",
					src:src,
					price:"2",
					bool:1,
					place:"重庆"
				},{
					id:1,
					name:"手机宽捡垃圾发了基拉对方带",
					src:src,
					price:"232",
					bool:0,
					place:"云岚"
				},{
					id:2,
					name:"手机宽捡垃圾发了基拉对方带",
					src:src,
					price:"2234",
					bool:0,
					place:"上海"
				},{
					id:2,
					name:"手机宽捡垃圾发了基拉对方带",
					src:src,
					price:"2234",
					bool:0,
					place:"上海"
				},{
					id:2,
					name:"手机宽捡垃圾发了基拉对方带",
					src:src,
					price:"2234",
					bool:0,
					place:"上海"
				},{
					id:2,
					name:"手机宽捡垃圾发了基拉对方带",
					src:src,
					price:"2234",
					bool:0,
					place:"上海"
				}]
			}
		}
	}
</script>

<style>
.goodlist{
	display: flex;
	width: 100%;
	justify-content: space-between;
	flex-wrap: wrap;
}
.goodlist>li{
	width: 49.5%;
	list-style: none;
	background-color: white;
	box-sizing: border-box;
	padding:1rem;
	margin-top: 3px;
}
.goodlist>li img{
	width: 100%;
}
.goodlist>li>p:nth-of-type(1){
	width: 100%;
	white-space: pre;
	overflow: hidden;
	font-size: 1.4rem;
	color:black;
	line-height: 2rem;
}
.goodlist>li>p:nth-of-type(2){
	line-height: 1.2rem;
	padding:2px 0;
}
.goodlist>li>p:nth-of-type(2)>.bao{
	float: left;
	border: 1px solid #FC0000;
	border-radius: 10%;
	color:#FC0000;
}
.goodlist>li>p:nth-of-type(2)>.place{
	float: right;
	color: #A0A0A0;
}
.goodlist>li>p:nth-of-type(3){
	clear: both;
	line-height: 2.2rem;
}
.goodlist>li>p:nth-of-type(3)>span:nth-of-type(1){
	font-size: 1.8rem;
	color:#EE4F4F;
	
}
.goodlist>li>p:nth-of-type(3)>span:nth-of-type(2){
	font-size: 1rem;
	color:#A0A0A0;
	padding-left: 6px;
}
</style>