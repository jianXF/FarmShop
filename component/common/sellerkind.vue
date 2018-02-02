<template>
	<div class="sellerkind">
		<nav>
			<p>入住商家</p>
			<span>更多<i class="iconfont icon-more"></i></span>
		</nav>
		<ul>
			<li v-for="i in seller">
				<img :src="i.src"  />
				<p v-text="i.name"></p>
			</li>
		</ul>
	</div>
</template>

<script>
	import src from "../../img/user.jpg";
	export default{
		data(){
			return {
				seller:[{
					id:0,
					name:"手机宽带",
					src:src
				},{
					id:0,
					name:"手机宽带",
					src:src
				},{
					id:0,
					name:"手机宽带",
					src:src
				},{
					id:0,
					name:"手机宽带",
					src:src
				},{
					id:0,
					name:"手机宽带",
					src:src
				},{
					id:0,
					name:"手机宽带",
					src:src
				}]
			}
		}
	}
</script>

<style scoped>
.sellerkind{
	background-color: white;
	margin-top: 0.5rem;
	border-top: 1px solid #d2d2d2;
}
.sellerkind>nav{
	border-left: 0.4rem solid dodgerblue;
	height: 3rem;
	line-height: 3rem;
	display: flex;
	padding:0px 0.8rem;
	justify-content: space-between;
}
.sellerkind>nav>p{
	font-size: 1.5rem;
	font-weight: 800;
	color: black;
}
.sellerkind>nav>span{
	font-size: 1.4rem;
}
.sellerkind>ul{
	border-left:1px solid #d2d2d2;
	border-top:1px solid #d2d2d2;
	display: flex;
	margin: 0.5rem;
	flex-wrap: wrap;
}
.sellerkind>ul>li{
	border-right:1px solid #d2d2d2;
	border-bottom:1px solid #d2d2d2;
	text-align: center;
	display: flex;
	height:5rem;
	box-sizing: border-box;
	padding:0.5rem 0.5rem 0.5rem 1rem ;
	line-height: 4rem;
	width:33.3%;
}
.sellerkind>ul>li img{
	flex: 1;
	width: 3rem;
	height:3rem;
	margin: auto;
}
.sellerkind>ul>li p{
	flex: 2;
	font-size: 1.2rem;
	color:black;
	width:3rem;
	white-space: pre;
	overflow: hidden;
	text-overflow: ellipsis;	
}
</style>