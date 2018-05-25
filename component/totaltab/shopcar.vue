<template>
    <div class="shopcar">
        <xheader :message="title"/>
        <ul>
			<h3 class="nothing" v-if="goodsList.length==0">
        			<p>您还没有相关的订单</p>
        			<span>可以去看看有哪些想买的</span>
        	</h3>
			<div v-for="i in goodsList" @touchstart="Loop_Sub(i)" @touchend="clearLoop()">
				<p v-if="i.isSell==0 || i.status!=2">该商品已下架，请长按删除</p>
				<p   v-if="i.isSell!=0 && i.status==2" style="textIndent:1rem" @click="clickSellerinfo(i)">
					<i class="iconfont icon-store"></i>
					<span v-text="i.sellerTitle"></span>
					<i  class="iconfont icon-more"></i>
				</p>
				<li >
					<span  @click="changebool(i.carId)" :class="i.bool?'iconfont icon-gou span_c':'iconfont icon-gou'"></span>
					<a @click="clickgoodsinfo(i)"><img :src="i.logo"/></a>
					<div>
						<p v-text="i.title"></p>
						<p>运费{{i.delivery}}</p>
						<p>
							<span>￥{{i.isBargain==0?i.price_o:i.price_n}}</span>
							<span>
								<i class="iconfont icon-add add_p" @click="addNum(i.carId)"></i>
								<input type="text" v-model="i.buyNum" disabled/>
								<i  class="iconfont icon-subtract sub_p" @click="subNum(i.carId)"></i>
							</span>
						</p>
					</div>
				</li>
			</div>
        </ul>
        <div class="sumprice">
        	<span :class="xbool==true?'iconfont icon-gou span_c':'iconfont icon-gou'" @click="changexbool"></span>
        	<div><p>￥{{sumprice}}</p>
        	<p @click="clickOrder">去结算</p></div>
        </div>
    </div>
  
</template>

<script>
	import src from "../../img/user.jpg";
	import xheader from "../common/header1.vue";
	import $ from "jquery";
	import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
    export default{
        components:{
            xheader
        },
        data(){
        	return {
        		title:"购物车",
				xbool:false,
				seletGoods:[],
				sumprice:0,
				Loop:null,
				goodsList:[]
        	}
		},
		async mounted(){
			const _this= this;
            await $.ajax({
				url:"http://localhost:2014/carlistAll",
				type:"GET",
				data:{
                    userId:sessionStorage.getItem("userId")
				},
				success:function(data){
					_this.goodsList = data;
					for(var i of _this.goodsList){
						i.logo=i.imgLogo.split(";")[0];
					}
					console.log(data);
					
				}
            });
		},
        methods:{
			clickOrder(){
				if(this.seletGoods.length==0){
					Toast.fail('请选择需要购买的商品');
				}else if(this.seletGoods.length==1){
					this.$router.push({path:'/order',query:{goodsId:this.seletGoods[0].goodsId+'',xnum:this.seletGoods[0].buyNum+"",carId:this.seletGoods[0].carId+""}});
				}else{
					var goodsId=[];
					var xnum=[];
					var carId=[];
					for(var i of this.seletGoods){
						goodsId.push(i.goodsId);
						xnum.push(i.buyNum);
						carId.push(i.carId);
					}
					this.$router.push({path:'/order',query:{goodsId:goodsId,xnum:xnum,carId:carId}});
				}
				
			},
        	//点击按钮时，改变颜色
        	changebool(carId){
        		for(var i in this.goodsList){
        			if(this.goodsList[i].carId==carId){
						if(this.goodsList[i].isSell==0 ||this.goodsList[i].status!=2){
							Toast(`全选商品中存在已下架商品，请假此商品删除后再全选`);
							return;
						}
						if(this.goodsList[i].stock<this.goodsList[i].buyNum){
							Toast(`库存紧剩${this.goodsList[i].stock}，若想购买，请修改购买数量`);
							return;
						}
						if(!this.goodsList[i].bool){
							this.goodsList[i].bool=true;
							console.log(this.goodsList[i]);
							if(this.goodsList[i].isBargain==0){
								this.sumprice=Number.parseFloat((this.sumprice+Number.parseFloat(this.goodsList[i].price_o*this.goodsList[i].buyNum)).toFixed(2));
							}else{
								this.sumprice=Number.parseFloat((this.sumprice+Number.parseFloat(this.goodsList[i].price_n*this.goodsList[i].buyNum)).toFixed(2));
							}
							this.seletGoods.push({carId:carId,goodsId:this.goodsList[i].goodsId,buyNum:this.goodsList[i].buyNum});
							break;
						}else{
							this.goodsList[i].bool=false;
							if(this.goodsList[i].isBargain==0){
								this.sumprice=Number.parseFloat((this.sumprice-Number.parseFloat(this.goodsList[i].price_o*this.goodsList[i].buyNum)).toFixed(2));
							}else{
								this.sumprice=Number.parseFloat((this.sumprice-Number.parseFloat(this.goodsList[i].price_n*this.goodsList[i].buyNum)).toFixed(2));
							}
							var seletGoods1 = [];
							for(var j of this.seletGoods){
								if(j.carId!=carId){
									seletGoods1.push(j);
								}
							}
							this.seletGoods = seletGoods1;
							break;
						}
        			}
				}
				console.log(this.seletGoods);
        		var bstop=true;
        		for(var i in this.goodsList){
        			if(this.goodsList[i].bool==false){
        				bstop=false;
        			}
        		}
        		if(bstop==true){
        			this.xbool=true;
        		}else{
        			this.xbool=false;
        		}
        	},
        	//点击全选按钮
        	changexbool(){
        		this.xbool=!this.xbool;
        		if(this.xbool==true){
					
        			for(var i in this.goodsList){
						if(this.goodsList[i].isSell==0||this.goodsList[i].status!=2){
							this.xbool=!this.xbool;
							Toast(`全选商品中存在已下架商品，请假此商品删除后再全选`);
							return;
						}
						if(this.goodsList[i].stock<this.goodsList[i].buyNum){
							Toast(`${this.goodsList[i].title}库存紧剩${this.goodsList[i].stock}，若想购买，请修改购买数量`);
							return;
						}
						this.goodsList[i].bool=true;
						if(this.goodsList[i].isBargain==0){
							this.sumprice=Number.parseFloat((this.sumprice+Number.parseFloat(this.goodsList[i].price_o*this.goodsList[i].buyNum)).toFixed(2));
						}else{
							this.sumprice=Number.parseFloat((this.sumprice+Number.parseFloat(this.goodsList[i].price_n*this.goodsList[i].buyNum)).toFixed(2));
						}
						this.seletGoods.push({carId:this.goodsList[i].carId,goodsId:this.goodsList[i].goodsId,buyNum:this.goodsList[i].buyNum});
        			}
        		}else{
					this.seletGoods=[];
					this.sumprice=0;
        			for(var i in this.goodsList){
        				this.goodsList[i].bool=false;
        			}
        		}
        		
        	},
        //点击添加数量按钮
        async addNum(carId){
			const _this =this;
        	for(var i in this.goodsList){
        		if(this.goodsList[i].carId==carId){
					if(this.goodsList[i].isSell==0||this.goodsList[i].status!=2){
							this.xbool=!this.xbool;
							Toast(`该商品已下架`);
							return;
						}
					if(this.goodsList[i].stock<this.goodsList[i].buyNum){
							Toast('库存不足，不能添加');
							return;
						}
					for(var j in this.seletGoods){
						if(this.seletGoods[j].carId==carId){
							if(this.goodsList[i].isBargain==0){
								this.sumprice=Number.parseFloat((this.sumprice+Number.parseFloat(this.goodsList[i].price_o)).toFixed(2));
							}else{
								this.sumprice=Number.parseFloat((this.sumprice+Number.parseFloat(this.goodsList[i].price_n)).toFixed(2));
							}
						}
					}
					await $.ajax({
						url:"http://localhost:2014/updateCart",
						type:"POST",
						data:{
							carId:carId,
							buyNum:_this.goodsList[i].buyNum+1,
							type:'2'
						},
						success:function(data){
							if(data == 'success'){
								_this.goodsList[i].buyNum++;
							}
						}
					});
        		}
			}
        },
         //点击减少数量事件按钮
        async subNum(carId){
			const _this= this;
        	for(var i in this.goodsList){
    			if(this.goodsList[i].carId==carId){
					if(this.goodsList[i].isSell==0||this.goodsList[i].status!=2){
							this.xbool=!this.xbool;
							Toast(`该商品已下架`);
							return;
						}
    				if(this.goodsList[i].buyNum==1){
    					return;
    				}else{
						for(var j in this.seletGoods){
							if(this.seletGoods[j].carId==carId){
								if(this.goodsList[i].isBargain==0){
									this.sumprice=Number.parseFloat((this.sumprice-Number.parseFloat(this.goodsList[i].price_o)).toFixed(2));
								}else{
									this.sumprice=Number.parseFloat((this.sumprice-Number.parseFloat(this.goodsList[i].price_n)).toFixed(2));
								}
							}
					}
						await $.ajax({
							url:"http://localhost:2014/updateCart",
							type:"POST",
							data:{
								carId:carId,
								buyNum:_this.goodsList[i].buyNum-1,
								type:'2'
							},
							success:function(data){
								if(data == 'success'){
									_this.goodsList[i].buyNum--;
								}
							}
						});
    				}
    			}
			}	
		},
		//购物车列表的长按事件，是否删除
		Loop_Sub(val){
			const _this =this;
			clearInterval(this.Loop);//再次清空定时器，防止重复注册定时器
			this.Loop=setInterval(function(){
				Dialog.confirm({
					title: '是否将此商品移除购物车'
				}).then(async() => {
					await $.ajax({
						url:"http://localhost:2014/carlist/delete",
						type:"GET",
						data:{
							carId:val.carId
						},
						success:function(data){
							if(data=="success"){
								Toast.success("移除购物车成功");
							}
						}
					});
					await $.ajax({
						url:"http://localhost:2014/carlistAll",
						type:"GET",
						data:{
							userId:sessionStorage.getItem("userId")
						},
						success:function(data){
							_this.goodsList = data;
							for(var i of _this.goodsList){
								i.logo=i.imgLogo.split(";")[0];
							}
							
						}
					});
				}).catch(() => {
				// on cancel
				});
　　　　　　},1000);
		},
		//清空定时器
		clearLoop:function(){
　　　　　　clearInterval(this.Loop);
　　　　},
		kong(){

		},
		clickgoodsinfo(i){
			if(i.isSell==0 || i.status!=2){
				Toast(`该商品已下架`);
				return ;
			}
			this.$router.push({path:'/goodsInfo',query:{goodsId:i.goodsId}});
		},
		clickSellerinfo(i){
			this.$router.push({path:'/sellerInfo',query:{sellerId:i.sellerId}});
		}
        }
    }
</script>

<style scoped>
	.shopcar>ul{
		display: flex;
		flex-direction: column;
		padding: 0.7rem;
		padding-top: 4.8rem;
		margin-bottom: 11rem;
		
	}
	.shopcar>ul>div{
		
		background-color: white;
		
		margin-top:0.6rem;
		border:1px solid #eae9e9;
		
	}
	.shopcar>ul li{
		display: flex;
		padding: 0.5rem;
		height: 8rem;
		box-sizing: border-box;
		line-height: 8rem;
		/* box-sizing: border-box;
		background-color: white;
		padding: 0.5rem;
		margin-top:0.6rem;
		border:1px solid #eae9e9; */
	}
	.shopcar>ul>div>p{
		line-height: 2.5rem;
		font-size: 1.2rem;
		text-indent: 8%;
		color:#827f7f;
		border-bottom: 1px dashed #c5c2c2
	}
	.shopcar>ul li>span{
		text-align: left;
		width:8%;
		line-height: 7.5rem;
		color:#ddd;
	}
	.shopcar>ul li>.span_c,.sumprice>.span_c{
		color: #EE4F4F;
	}
	.shopcar>ul li>a{
		width:22%;
		height: 87%;
	}
	.shopcar>ul>div>li>a>img{
		width: 100%;		
		margin-top: 0.5rem;
		height: 100%;
	}
	.shopcar>ul>div>li>div{
		display: flex;
		flex-direction: column;
		line-height: 1.5rem;
		width:70%;
		padding: 0px 0.6rem;
		margin-top:0.5rem;
		
	}
	.shopcar>ul li>div>p:nth-of-type(1){
		font-size: 1.2rem;
		font-weight: 600;
		color: black;

	}
	.shopcar>ul li>div>p:nth-of-type(2){
		font-size: 1rem;
	}
	.shopcar>ul li>div>p:nth-of-type(3){
		display: flex;
		justify-content: space-between;
		position: relative;
		line-height: 2rem;
	}
	.shopcar>ul li>div>p:nth-of-type(3)>span{
		font-size: 1.4rem;
		color: #000000;	
	}
	.shopcar>ul li>div>p:nth-of-type(3)>span:last-of-type{
		position: absolute;
		right: 0rem;
		bottom: 0.4rem;
		line-height: 1.6rem;
		height:2rem;
	}
	.add_p{
		font-size: 1.6rem;
		font-weight: 900;
	}
	.sunb_p{
		font-size: 1.6rem;
		font-weight: 900;
	}
	.shopcar>ul li>div input{
		width:4rem;
		text-align: center;
		height:1.6rem;
		margin:0 0.3rem;
	}
	.sumprice{
		position: fixed;
		bottom: 4rem;
		left:0;
		height:4rem;
		line-height:4rem;
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-top:1px solid #ddd;
		background-color: white;
	}
	.sumprice>span{
		color:#ddd;
		padding-left: 2rem;
	}
	.sumprice>div{
		display: flex;
	}
	.sumprice p:first-of-type{
		font-size: 2rem;
		margin-right:2rem;
		color:#EE4F4F;
	}
	.sumprice p:last-of-type{
		text-align: center;
		padding:0 2rem;
		font-size: 1.8rem;
		color:white;
		background-color: #EE4F4F;
		
	}
.nothing{
	height:20rem;
}
.nothing>p{
	font-size: 1.7rem;
	color: #686868;
	padding-top:8rem;
	text-align: center;
	margin-bottom: 1rem;
}
.nothing>span{
	font-size: 1.2rem;
	color: #ACACAC;
	display: block;
	text-align: center;
}
</style>