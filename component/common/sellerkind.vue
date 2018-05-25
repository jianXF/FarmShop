<template>
	<div class="sellerkind">
		<nav>
			<p>入住商家</p>
			<a href="#/sellerlist">MORE<i class="iconfont icon-more"></i></a>
		</nav>
		<ul>
			<a v-for="i in seller"  @click="clickSellerinfo(i)">
				<img :src="i.img"  />
				<!-- <p v-text="i.sellerTitle"></p> -->
			</a>
		</ul>
	</div>
</template>

<script>
	import src from "../../img/user.jpg";
	import $ from "jquery";
	export default{
		data(){
			return {
				seller:[]
			}
		},
		async mounted(){
			const _this= this;
            await $.ajax({
				url:"http://localhost:2014/sellerAll",
				type:"GET",
				data:{
					limit:6
				},
				success:function(data){
					_this.seller = data;
				}
            });
		},
		methods:{
			clickSellerinfo(i){
				this.$router.push({path:'/sellerinfo',query:{sellerId:i.sellerId}});
			}
		}
	}
</script>

<style scoped>
.sellerkind{
	background-color: white;
	margin-top: 0.5rem;
}
.sellerkind>nav{
	border-left: 0.4rem solid #FF350E;
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
.sellerkind>nav>a{
	font-size: 1.4rem;
	color: #B3B4B8;
}
.sellerkind>ul{
	border-left:1px solid #d2d2d2;
	border-top:1px solid #d2d2d2;
	display: flex;
	margin: 0.5rem;
	flex-wrap: wrap;
}
.sellerkind>ul>a{
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
.sellerkind>ul>a img{
	flex: 1;
	width: 3rem;
	height:3rem;
	margin: auto;
}
.sellerkind>ul>a p{
	flex: 2;
	font-size: 1.2rem;
	color:black;
	width:3rem;
	white-space: pre;
	overflow: hidden;
	text-overflow: ellipsis;	
}
</style>