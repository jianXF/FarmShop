<!--促销商品-->
<template>
	<div class="promotion">
		<nav>
			<p>特价促销</p>
			<span>更多<i class="iconfont icon-more"></i></span>
		</nav>
		<ul>
			<a v-for="i in goods">
				<img :src="i.src"  />
				<h3 v-text="i.name"></h3>
				<p>
					<span >￥{{i.price}}</span>
					<i class="iconfont icon-cart"></i>
				</p>
			</a>
		</ul>
	</div>
</template>

<script>
		import src from "../../img/user.jpg";
	export default{
		data(){
			return {
				goods:[{
					id:0,
					name:"手机宽带",
					src:src,
					price:"22"
				},{
					id:0,
					name:"手机宽带",
					src:src,
					price:"222"
				},{
					id:0,
					name:"手机宽带",
					src:src,
					price:"22.2"
				}]
			}
		}
	}
</script>

<style scoped>
.promotion{
	background-color: white;
	margin-top: 1.5rem;
	border-top: 1px solid #d2d2d2;
	padding-bottom:30rem;
}
.promotion>nav{
	border-left: 0.4rem solid dodgerblue;
	height: 3rem;
	line-height: 3rem;
	display: flex;
	padding:0px 0.8rem;
	justify-content: space-between;
}
.promotion>nav>p{
	font-size: 1.5rem;
	font-weight: 800;
	color: black;
}
.promotion>nav>span{
	font-size: 1.4rem;
}
.promotion>ul{
	display: flex;
	margin: 0.5rem;
	flex-wrap: wrap;
}
.promotion>ul>a{
	text-align: center;
	display: flex;
	flex-direction: column;
	height:5rem;
	box-sizing: border-box;
	padding:0.5rem 0.5rem 0.5rem 1rem ;
	width:33.3%;
	
}

.promotion>ul>a>h3{
	font-weight: 500;
	color: #313D44;
	font-size: 1.2rem;
	line-height: 1.5rem;
	height:1.5rem;
	width:100%;
	white-space: pre;
	overflow: hidden;
	text-overflow: ellipsis;	
}
.promotion>ul>a>p{
	display: flex;
	justify-content: space-between;
}
.promotion>ul>a>p span{
	font-size: 2rem;
	color:#FF0036;
}
.promotion>ul>a>p i{

}
</style>