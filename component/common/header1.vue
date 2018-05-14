<template>
	<header class="cminfo">
		<p v-text="message"></p>
		<!--<i class="iconfont icon-category"></i>-->
	</header>
</template>

<script>
	export default{
		props:["message"]
	}
</script>

<style scoped>
.cminfo{
	height:4.1rem;
	background-color: #EE4F4F;
	line-height:4.1rem;
	position: fixed;
	top:0;
	left:0;
	width: 100%;
	z-index: 100;
	
}
.cminfo>p{
	text-align: center;
	font-size: 2rem;
	color:white;
}
.cminfo>i{
	position: absolute;
	right: 1rem;
	top:0rem;
	font-size: 2.5rem;
	line-height:4.6rem;
	color:white;
}
</style>