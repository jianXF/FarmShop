<template>
	<ul class="goodlist">
		<li v-for="i in goodsArr">
			<a  @click="goodsinfo(i.goodsId)"><img :src="i.imgLogo.split(';')[0]"/></a>
			<p v-text="i.title"></p>
			<p>
				<span class="bao" v-if="i.delivery=='0.00'">包邮</span>
				<span class='delivery' v-if="i.delivery!='0.00'">快递{{i.delivery}}</span>
				<span class="place" v-text="i.address"></span>
			</p>
			<p>
				<span v-text="i.isBargain==0?'￥'+i.price_o:'￥'+i.price_n"></span>
				<span v-text="i.isBargain==0?'':'￥'+i.price_o"></span>
				<span v-if="i.isBargain==0">{{i.sellnum}}人付款</span>
			</p>
			
		</li>
	</ul>
</template>

<script scoped>
	import src from "../../img/user.jpg";
	export default{
		props:["goodsArr"],
		data(){
			return {
			}
		},
		methods:{
			goodsinfo(id){
				this.$router.push({path:'/goodsinfo',query:{goodsId:id}});
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
	height: 12rem;
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
	font-size: 1.6rem;
	color:#EE4F4F;
	
}
.goodlist>li>p:nth-of-type(3)>span:nth-of-type(2){
	font-size: 1rem;
	color:#A0A0A0;
	text-decoration: line-through;
	padding-left: 2px;
}
.goodlist>li>p:nth-of-type(3)>span:nth-of-type(3){
	font-size: 1rem;
	color:#A0A0A0;
	float: right;
	padding-left: 6px;
}

.delivery{
	color:#A0A0A0;
}
</style>