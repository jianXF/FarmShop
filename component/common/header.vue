<template>
	<header class="scinfo">
		<p class="iconfont icon-store"></p>
		<p>
			<i class="iconfont icon-search"></i>
			<span>点击搜索你需要的商品</span>
		</p>
		<i class="iconfont icon-category"></i>
	</header>
</template>

<script>
</script>

<style scoped>
.scinfo{
	height:2.5rem;
	display: flex;
	background-color: #EE4F4F;
	padding:0.6rem 0rem;
	line-height:2.5rem;
	padding-bottom: 1rem;
}
.scinfo i{
	color: white;
}
.scinfo>p:nth-of-type(1){
	flex:1;
	text-align: center;
	color: white;
	font-size: 2.2rem;
	line-height:3.5rem;
}
.scinfo>p:nth-of-type(2){
	flex: 5;
	border-bottom: 1px solid white;
}
.scinfo>p:nth-of-type(2)>i{
	font-weight: 900;
}
.scinfo>p:nth-of-type(2)>span{
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