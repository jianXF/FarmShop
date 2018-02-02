	<!--首页商品分类-->
<template>
		<section class="sumkind">
			<p v-for="i in arr">
				<img :src="i.src" />
				<span v-text="i.name"></span>
			</p>
		</section>
</template>
<script>
import src1 from "../../img/list5.png";
import src2 from "../../img/list4.png";
import src3 from "../../img/list1.png";
import src4 from "../../img/list2.png";
import src5 from "../../img/list7.png";
import src6 from "../../img/list3.png";
import src7 from "../../img/list6.png";
import src8 from "../../img/list8.png";
	export default{
		data(){
			return {
				arr:[{
					id:0,
					name:"特价促销",
					src:src1,
				},{
					id:1,
					name:"干果零食",
					src:src2,
				},{
					id:2,
					name:"绿色水果",
					src:src3,
				},{
					id:3,
					name:"有机蔬菜",
					src:src4,
				},{
					id:4,
					name:"优质家禽",
					src:src5,
				},{
					id:5,
					name:"柴米油盐",
					src:src6,
				},{
					id:6,
					name:"手工制品",
					src:src7,
				},{
					id:7,
					name:"当地特产",
					src:src8,
				}]
			}
		}
	}
</script>
	
<style scoped> 
	.sumkind{
		display: flex;
		flex-wrap: wrap;
		padding:0.5rem;
		padding-top: 0;
		background-color: #fbfbfb;
		margin-top: 0.5rem;
	}
	.sumkind>p{
		width: 25%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.sumkind>p>img{
		width:4.5rem;
		margin: 0 auto;
		margin-top: 0.5rem;
	}
	.sumkind>p>span{
		margin-top: 0.25rem;
		font-size: 1.3rem;
	}
</style>