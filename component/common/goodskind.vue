	<!--首页商品分类-->
<template>
		<section class="sumkind">
				<a  @click="clickGoodslistB(bran.isBargain)" >
					<img :src="bran.src" />
				<span v-text="bran.name"></span>
				</a>
				<a @click="clickGoodslistO(i.kindId)" v-for="i in arr">
					<img :src="i.src" />
				<span v-text="i.name"></span>
				</a>
		</section>
</template>
<script>
import $ from "jquery";
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
				srcArr:[src2,src3,src4,src5,src6,src7,src8],
				arr:[],
				//特价促销
				bran:{
					isBargain:1,
					src:src1,
					name:'特价促销'
				}
			}
		},
		async mounted(){
			const _this =this;
			await $.ajax({
                url:"http://localhost:2014/findAll/goods_kind",
                type:"GET",
                data:{
                },
                success:function(data){
                    for(var i=0;i<data.length;i++){
						data[i].src=_this.srcArr[i];
					}
					_this.arr = data;

                }
            });
		},
		methods:{
			clickGoodslistB(){
				this.$router.push({path:'/goodslist',query:{type:'isBargain',value:1}});
			},
			clickGoodslistO(id){
				this.$router.push({path:'/goodslist',query:{type:'oId',value:id}});
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
	}
	.sumkind>a{
		width: 25%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.sumkind>a img{
		width:4.5rem;
		margin: 0 auto;
		margin-top: 0.5rem;
	}
	.sumkind>a span{
		margin-top: 0.25rem;
		font-size: 1.3rem;
	}
</style>