<template>
	<header class="scinfo">
		<p class="iconfont icon-store"></p>
		<a href="#/search">
			<i class="iconfont icon-search"></i>
			<span>点击搜索你需要的商品</span>
		</a>
		<!--<i class="iconfont icon-category"></i>-->
	</header>
</template>

<script>
</script>

<style scoped>
.scinfo{
	position: fixed;
	top:0;
	left:0;
	height:2.5rem;
	display: flex;
	background-color: #EE4F4F;
	padding:0.6rem 0rem;
	line-height:2.5rem;
	padding-bottom: 1rem;
	width:100%;
	z-index: 100;
}
.scinfo i{
	color: white;
}
.scinfo>p:nth-of-type(1){
	text-align: center;
	color: white;
	font-size: 2.2rem;
	line-height:3.5rem;
	margin:0  1rem;
}
.scinfo>a{
	margin-left:0.5rem;
	border-bottom: 1px solid white;
	width: 80%;
}
.scinfo>a>i{
	font-weight: 900;
}
.scinfo>a>span{
	color: #fdcfcf;
	font-size: 1.3rem;
	padding-left: 0.8rem;
}
.scinfo>i{
	flex:1;
	line-height:3.5rem;
	text-align: center;
	font-size: 2.6rem;
}
</style>