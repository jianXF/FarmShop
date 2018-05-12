<template>
    <div class="classify">
        <xheader />
        <div class="allkind">
	        <ul class="kind">
	        	<li v-for="i in arr" v-text="i.name" :class="i.kindId==xid?'li_c':' '"  @click="changeXid(i.kindId)"></li>
	        </ul>
	        <div class="kind_l"></div>
	        <div class="kind_r">
	        	<ul>
	        		<li v-for="i in childArr">
	        			<a  @click="clickGoodslist(i.kindId)"><p v-text="i.name"></p></a>
	        			
	        		</li>
	        	</ul>
	        </div>
		</div>
    </div>
</template>

<script>
    import xheader from "../common/header.vue";
	import src from "../../img/user.jpg";
	import $ from "jquery";
    export default{
        components:{
            xheader
        },
        data(){
        	return {
				xkind:"干果零食",
				//选择总类的id
        		xid:0,
				xsrc:src,
				//总类数组
				arr:[],
				childArr:[]
        	}
	   },
	   async mounted(){
		   const _this= this;
		   await $.ajax({
                url:"http://localhost:2014/findAll/goods_kind",
                type:"GET",
                data:{
                },
                success:function(data){
                    _this.arr=data;
                    _this.xid=data[0].kindId;
                }
            });
            await $.ajax({
                url:"http://localhost:2014/findChild/goods_kind",
                type:"GET",
                data:{
                    kindId:_this.xid
                },
                success:function(data){ 
                        _this.childArr=data;
                    
                }
            })
	   },
       methods:{
       	//改变选中的商品类型xid
       		async changeXid(id){
				const _this= this;
				this.xid=id;
				await $.ajax({
					url:"http://localhost:2014/findChild/goods_kind",
					type:"GET",
					data:{
						kindId:_this.xid
					},
					success:function(data){ 
							_this.childArr=data;
						
					}
            	})
			},
			clickGoodslist(id){
				this.$router.push({path:'/goodslist',query:{type:'kindId',value:id}});
			}   
       }
    }
</script>
<style scoped>
	.classify{
		padding-bottom:3.8rem ;		
	}
	.allkind{
		display: flex;
		padding-top:4.2rem;
	}
	.kind{
		width:30%;
		display: flex;
		flex-direction: column;
		position: fixed;
		left:0;
		top:4.2rem;
		z-index: 1;
		background-color: white;
		height: 100%;
	}
	.kind>li{
		height:3.5rem;
		line-height: 3.5rem;
		font-size: 1.6rem;
		text-align: center;
		border-bottom:1px solid #F6F6F6;
	}
	.allkind>.kind_l{
		width: 30%;
	}
	.allkind>.kind_r{
		width: 70%;
		box-sizing: border-box;
		padding: 10px 0 5px;
	}

	.kind_r>ul{
		display: flex;
		flex-wrap: wrap;
	}
	.kind_r li{
		width:33%;
		text-align: center;
		margin-top:0.5rem ;
	}
	.kind_r li img{
		width: 6rem;
	}
	.kind_r li p{
		width: 80%;
		margin: 0 auto;
		overflow: hidden;
		white-space: pre;
		text-align: center;		
		line-height: 2rem;
		font-size: 1.4rem;
	}
	.li_c{
		color:#EE4F4F;
		border-left:5px solid #EE4F4F;
	}
</style>