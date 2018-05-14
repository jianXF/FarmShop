<template>
    <div class="goodsinfo">
    	<!--右上提示框的背景覆盖-->
    	<div class="back" :style="{display: tipsbool==true?'block':'none'}" @click="changeHide"></div>
    	<!--加入购物车的背景覆盖-->
    	<div class="back1" :style="{display:carbool==true?'block':'none'}" @click="cancalAdd"></div>
		<div class="tips" :style="{display: tipsbool==true?'block':'none'}">
			<xfourlist />
		</div>
        <header>
        	<i class="iconfont icon-back" @click="goBack"></i>
        	<p :class="xtab==1?'p_c':''" @click="changeXtab(1)">宝贝</p>
        	<p :class="xtab==2?'p_c':''" @click="changeXtab(2)">商品参数</p>
        	<p :class="xtab==3?'p_c':''" @click="changeXtab(3)">评价</p>
        	<i class="iconfont icon-category" @click="changetips"></i>
        </header>
        <!--宝贝详情-->
        <div class="list1" :style="{display:xtab=='1'?'block':'none'}">
				<xbanner :bannberImg="goodsDate.imgLogo"/>
				<div class="detil">
					<p v-text="goodsDate.title"></p>
					<h4 v-if="goodsDate.isBargain==1"><span v-text="goodsDate.price_n">34.45</span><i v-text="'原价 :'+goodsDate.price_n"> </i></h4>
					<h4 v-if="goodsDate.isBargain==0"><span v-text="goodsDate.price_o">34.45</span></h4>
					<p>
						<span>快递 : <i v-text="goodsDate.delivery"></i></span>
						<span>月销<i v-text="goodsDate.sellnum"></i>笔</span>
						<span v-text="goodsDate.address"></span>
					</p>
				</div>
				<p>——————详情——————</p>
				<div class="imgs">
					<img v-for="i in goodsDate.imgs" :src="i">
				</div>
        </div>
        <!--商品参数-->
        <div class="list2" :style="{display:xtab=='2'?'block':'none'}">
        	<ul>
        		<li><span>商品名称：</span><p v-text="goodsDate.title"></p></li>
        		<li><span>商品编号：</span><p v-text="goodsDate.goodsId"></p></li>
        		<li><span>商品品牌：</span><p v-text="goodsDate.sellerTitle"></p></li>
				<li><span>商品类型: </span><p v-text="goodsDate.name"></p></li>
        		<li><span>上架时间：</span><p v-text="goodsDate.upTime"></p></li>
        		<li><span>商品重量</span><p v-text="goodsDate.heavy+'千克'"></p></li>
        		<li><span>商品库存</span><p v-text="goodsDate.stock"></p></li>
        	</ul>
        </div>
        <!--评价-->
        <div class="list3" :style="{display:xtab=='3'?'block':'none'}">
        	<nav>
        		<span :class="xass==1?'span_c':''" @click="changeXass(1)">全部({{assess[0]}})</span>
        		<span :class="xass==2?'span_c':''" @click="changeXass(2)">好评({{assess[1]}})</span>
        		<span :class="xass==3?'span_c':''" @click="changeXass(3)">中评({{assess[2]}})</span>
        		<span :class="xass==4?'span_c':''" @click="changeXass(4)">差评({{assess[3]}})</span>
        	</nav>
        	<section>
        		<li>
	        		<p><span>s第三方爱上</span><span>2017-04-12</span></p>
	        		<h4>是空的卡就是积分好卡u树的哈u树丢啊收到卡建行，撒大家卡卡，暗室逢灯暗室逢灯</h4>
	        		<span>店家回复：是地方还是开始时开始计划地方灰色空间电话回访,经济健康金沙和地方哈库拉合肥市。阿萨德苦海哈看得见风景、</span>
	        		<div>
	        			<img :src="src"/>
	        			<img :src="src"/>
	        			<img :src="src"/>
	        			<img :src="src"/>
	        			<img :src="src"/>
	        		</div>
        		</li>
        	</section>
        </div>
        <footer>
        	<a href="#/sellerinfo">
        		<i class="iconfont icon-store"></i>
        		<span>店铺</span>
        	</a>
        	<a @click="colletGoods(goodsDate)">
        		<i :class="colletbool==true?'iconfont icon-favorite i_c':'iconfont icon-favorite'"></i>
        		<span :style="{color:colletbool==true?'#EE4F4F':'#52545E'}">收藏</span>
        	</a>
        	<h4 @click="showAdd">加入购物车</h4>
        	<h4 @click="showBuy">立即购买</h4>
        </footer>
        <div class="addcar" :style="{display:carbool==true?'block':'none'}">
        	<nav>
        		<p><img :src="goodsDate.logo" /></p>
        		<h4>
        			<span v-if="goodsDate.isBargain==0" v-text="'￥'+goodsDate.price_o"></span>
					<span v-if="goodsDate.isBargain==1" v-text="'￥'+goodsDate.price_n"></span>
        			<i v-text="'库存'+goodsDate.stock+'件'"></i>
        		</h4>
        		<i class="iconfont icon-close" @click="cancalAdd"></i>
        	</nav>
        	<p>
        		<span>购买数量</span>
        		<span><i class="iconfont icon-add add_p" @click="addNum"></i><input type="text" v-model="xnum"/><i  class="iconfont icon-subtract sub_p" @click="subNum"></i></span>
        	</p>
        	<span @click="addCart">
        		确定
        	</span>
        </div>
    </div>
  
</template>

<script>
	import $ from "jquery";
	import src from "../../img/user.jpg";
	import xbanner from "../common/banner1.vue";
	import xfourlist from "../common/fourlist.vue";
	import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
    export default{
        components:{
			xbanner,
			xfourlist
        },
        data(){
        	return {
        		xtab:1,	//选项卡控制
        		tipsbool:false,//右上角的弹出框控制
        		src:src,
        		assess:[435,35,865,234],//评价数量
        		xass:1,  //评价中的评论等级选择
        		colletbool:false,     //是否收藏
				xnum:1,	//加入购物车的数量
				type:1, //是1-加入购车还是2-立即购买
				carbool:false,	//加入购物车/立即购买选择的弹出框
				goodsDate:{}
 			}
		},
		async mounted(){
			const _this= this;
			var goodsId = this.$router.history.current.query.goodsId;
			await $.ajax({
				url:"http://localhost:2014/find/goods/goodsId",
				type:"GET",
				data:{
					goodsId:goodsId
				},
				success:function(data){
					
					_this.goodsDate=data;
					_this.goodsDate.imgLogo = _this.goodsDate.imgLogo.split(';');
					_this.goodsDate.imgs = _this.goodsDate.imgs.split(';');
					_this.goodsDate.upTime = _this.goodsDate.upTime.substr(0,8);
					_this.goodsDate.logo = _this.goodsDate.imgLogo[0];
					if(_this.goodsDate.isSell==0){
                        Dialog.alert({
                            message: '该商品已下架，无法查看'
                        }).then(() => {
                            _this.$router.go(-1);
                        });
                    }
				}
			});
			await $.ajax({
                url:"http://localhost:2014/collet/find",
                type:"GET",
                data:{
                    userId:sessionStorage.getItem("userId"),
                    colletType:2,
                    colletId:goodsId
                },
                success:function(data){
                    if(data=="success"){
                        _this.colletbool = true;
                    }
                }
            });
		},
        methods:{
        	//选择选项卡，显示不用信息
        	changeXtab(id){
        		this.xtab=id;
        	},
        	//点击头部右边选择功能
        	changetips(){
        		this.tipsbool=true;
        	},
        	//功能卡显示，点击back隐藏
        	changeHide(){
        		this.tipsbool=false;
        	},
        	//评价中的评论等级选择
        	changeXass(id){
        		this.xass=id;
        	},
        	//将该商品收藏或取消收藏
        	async colletGoods(goods){
				const _this= this;
        		//商品未收藏
        		if(this.colletbool==false){
					 await $.ajax({
                        url:"http://localhost:2014/collet/insert",
                        type:"post",
                        data:{
                            userId:sessionStorage.getItem("userId"),
                            colletType:2,
                            colletId:goods.goodsId
                        },
                        success:function(data){
                            if(data=="success"){
                                _this.colletbool=true;
                                Toast.success('收藏成功');
                            }
                        }
                    });
        		}else{
					await $.ajax({
                        url:"http://localhost:2014/collet/delete",
                        type:"post",
                        data:{
                            userId:sessionStorage.getItem("userId"),
                            colletType:2,
                            colletId:goods.goodsId
                        },
                        success:function(data){
                            if(data=="success"){
                                _this.colletbool=false;
                                Toast.success('取消收藏');
                            }
                        }
                    });
        		}
        	},
        	//点击添加数量按钮
	        addNum(){
				if(this.xnum>this.goodsDate.stock){
					Toast.fail('库存不足，不能添加');
				}else{
					this.xnum++;
				}
	        	
	        },
	         //点击减少数量事件按钮
	        subNum(){
				if(this.xnum==1){
					return;
				}else{
					this.xnum--;
				}
	       },
	       //点击加入购物车，弹出选择数量框及蒙版
	       showAdd(){
			if(sessionStorage.getItem('userId')){
					this.carbool=true;
					this.type=1;
			}else{
				Dialog.confirm({
				title: '是否登陆',
				message: '只有登陆才能操作此功能'
				}).then(() => {
					this.$router.push({path:'/login'});
				}).catch(() => {
				});
			}
	       	
		   },
		   //点击立即购买
		   showBuy(){
			   if(sessionStorage.getItem('userId')){
					this.carbool=true;
					this.type=2;
			}else{
				Dialog.confirm({
				title: '是否登陆',
				message: '只有登陆才能操作此功能'
				}).then(() => {
					this.$router.push({path:'/login'});
				}).catch(() => {
				});
			}
		   },
		   goBack(){
			   this.$router.go(-1);
		   },
	       //取消添加购物车（点击叉叉）
	       cancalAdd(){
	       	this.carbool=false;
	       },
	       //点击确定添加到购物车，并选择框消失
	       async addCart(){
			   const _this = this;
			   const isrepeat = {bool:true,data:{}};
			   if(this.type==1){
				   await $.ajax({
						url:"http://localhost:2014/repeatCart",
						type:"get",
						data:{
							userId:sessionStorage.getItem('userId'),
							goodsId:_this.goodsDate.goodsId
						},
						success:function(data){
							if(data.length==0){
								isrepeat.bool=false;
							}else{
								isrepeat.bool=true;
								isrepeat.data = data[0];
							}
						}
					});
					if(isrepeat.bool==false){
						await $.ajax({
							url:"http://localhost:2014/addcart",
							type:"POST",
							data:{
								userId:sessionStorage.getItem('userId'),
								goodsId:_this.goodsDate.goodsId,
								buyNum:_this.xnum
							},
							success:function(data){
								if(data='success'){
									Toast.success('商品已添加购物车');
								}
							}
						});
					}else{
						await $.ajax({
							url:"http://localhost:2014/updateCart",
							type:"POST",
							data:{
								type:1,
								carId:isrepeat.data.carId,
								buyNum:_this.xnum
							},
							success:function(data){
								if(data='success'){
									Toast.success('商品已添加购物车');
								}
							}
						});
					}
				   
			   }else{
				   _this.$router.push({path:'/order',query:{goodsId:_this.$router.history.current.query.goodsId+'',xnum:_this.xnum+''}})
			   }
	       	this.carbool=false;
	       }
        }
    }
</script>
<style scoped>
.goodsinfo>header{
	position: fixed;	
	top: 0;
	left: 0;
	width: 100%;
	z-index:10;
	display: flex;
	background-color: #fbfbfb;
	height: 4.1rem;
	line-height: 4.1rem;
}
.goodsinfo>header>i{
	width: 20%;
	line-height: 4.6rem;
	font-size: 2.5rem;
	text-align: center;
}
.goodsinfo>header>p{
	width: 30%;
	font-size: 1.6rem;
	text-align: center;
	
}
.goodsinfo>header>.p_c{
	border-bottom:2px solid #EE4F4F ;
	color: #EE4F4F;
}
.tips{
	position: fixed;
	top:3rem;
	right: 2px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 10px rgba(0,0,0,0.13);
	z-index: 11;
	background-color: white;
	display: none;
}
.tips a{
	height:3rem;
	line-height: 3rem;
	width:10rem;
	display: flex;
}
.tips a>i{
	width: 30%;
	text-align: center;
}
.tips a>p{
	width: 70%;
	border-bottom: 1px solid #f3f2f2;
}
.back{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0);
	top:0;
	left:0;
	z-index:11;
	display: none;
}
.nonegood{
	height:4rem;
	line-height: 4rem;
	font-size: 1.6rem;
	text-align: center;
}
.list1{
	padding-top:4.1rem;
	display: none;
	padding-bottom: 4rem;
}
.list1>.detil{
	background-color: white;
	padding: 0 1.5rem;
}
.list1>.detil>p:first-of-type{
	letter-spacing: 1px;
	line-height: 2rem;
	font-size: 1.5rem;
	color:black;
}
.list1>.detil>h4{
	height: 2.5rem;
	line-height: 2.5rem;
}
.list1>.detil>h4>span{
	font-size: 2rem;
	color: #EE4F4F;
}
.list1>.detil>h4>i{
	font-size: 1.2rem;
	margin-left: 1rem;
	text-decoration: line-through;
}
.list1>.detil>p:last-of-type{
	display: flex;
	justify-content: space-between;
	height:2rem;
	line-height: 2rem;
}
.imgs{

	background-color: white;
	padding-bottom: 1rems;
	display: flex;
	flex-direction: column;
}
.list1>p{
	text-align: center;
	line-height: 4rem;
	font-size:1.4rem;
}
.imgs>img{
	text-align: center;
	width:90%;
	margin-bottom:0.5rem;
	margin-left: 5%;
}
.list2,.list3{
	padding-top:4.1rem;
	background-color: white;
	}
.list3{
	padding-bottom: 4rem;
}
.list2>ul{
	display:flex;
	flex-direction: column;
	padding:0 1rem;
}
.list2>ul>li{
	height: 4rem;
	line-height: 4rem;
	display: flex;
	border-bottom:1px solid #DDDDDD;
}
.list2>ul>li:last-of-type{
	border-bottom:0;
}
.list2>ul>li span{
	font-size: 1.6rem;
	width: 25%;
	color: #827e7e;
}
.list2>ul>li p{
	font-size: 1.6rem;
	width: 75%;
	overflow: hidden;
	white-space: pre;
	text-overflow: ellipsis;
}
.list3>nav{
	display: flex;
	padding:1rem 0;
}
.list3>nav>span{
	display: block;
	padding: 0 0.6rem;
	background-color: #ef764a4d;
	margin: 0 1rem;
	height: 2.4rem;
	line-height: 2.4rem;
	border-radius: 15%;
}
.list3>nav>.span_c{
	background-color: #ee4f4f;
	color: white;
}
.list3>section{
	padding: 0 1rem;
}
.list3>section>li{
	padding: 1rem 0;
	border-bottom:1px solid #D2D2D2;
}
.list3>section>li:last-of-type{
	border-bottom:0;
}
.list3>section>li>p{
	display: flex;
	justify-content: space-between;	
}
.list3>section>li>p>span:first-of-type{
	font-size: 1.3rem;
}
.list3>section>li>p>span:last-of-type{
	font-size: 1.2rem;
}
.list3>section>li>h4{
	padding-top: 0.4rem;
	font-weight: 500;
	color: #051b28;
	font-size: 1.5rem;
	line-height: 1.8rem;
}
.list3>section>li>span{
	background-color: #DDDDDD;
	border-radius: 3%;
	box-sizing: border-box;
	display: block;
	padding:0.4rem;
	font-size: 1.2rem;
}
.list3>section>li>div{
	margin-top:0.5rem;
}
.list3>section>li>div>img{
	width: 5rem;
	margin-right: 0.6rem;
}
footer{
	position: fixed;
	bottom: 0;
	left: 0;
	height: 4rem;
	display: flex;
	width: 100%;
	text-align: center;
	background-color: white;
	line-height: 4rem;
	border-top: 1px solid #ddd;
}
footer>a{
	display: flex;
	flex-direction: column;
	width: 20%;
	height: 100%;
}
footer>a:first-of-type{
	border-right: 1px solid #ddd;
}
footer>a>i{
	height:50%;
}
footer>a .icon-store,footer>a .icon-favorite{
	margin-top:-0.5rem;
	font-size: 2rem;
	color: black;
}
footer>a>.i_c{
	color: #EE4F4F;
}
footer>a>span{
	flex: 1;
	height:50%;
	margin-top:-0.5rem;
}
footer>h4{
	width: 30%;
	color: white;
	font-size: 1.5rem;
	font-weight:500;
}
footer>h4:first-of-type{
	background-color: #FF9500;
}
footer>h4:last-of-type{
	background-color: #EE4F4F;
}
.addcar{
	border-top:1px solid #ddd;
	z-index: 12;
	height: 50%;
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	background-color: white;
}
.addcar>nav{
	position: relative;
	border-bottom: 1px solid #ddd;
	margin:0 1rem;
	padding-bottom: 2.5rem;
}
.addcar>nav>p{
	position: absolute;
	top:-2rem;
	left:2rem;
	border-radius: 5%;
	width: 8rem;
}
.addcar>nav>p>img{
	width: 100%;
}
.addcar>nav>h4{
	margin-left: 12rem;
	display: flex;
	flex-direction: column;
	font-weight: 500;
}
.addcar>nav>h4>span{
	height: 2rem;
	margin-top: 1rem;
	line-height: 2rem;
	font-size: 1.8rem;
	color: #EE4F4F;
}
.addcar>nav>h4>i{
	height: 2rem;
	line-height: 2rem;
	font-size: 1.6rem;
}
.addcar>nav>i{
	position: absolute;
	right: 0rem;
	top: 0.8rem;
}
.addcar>nav>.icon-close{
	font-size: 1.6rem;
	border: 1px solid #52545E;
	padding: 0.1rem;
	border-radius: 50%;
}
.back1{
	background-color: rgba(0,0,0,0.5);
	position: fixed;
	width: 100%;
	height: 100%;
	top:0;
	left:0;
	z-index:11;
}
.addcar>p{
	display: flex;
	justify-content: space-between;
	position: relative;
	line-height: 3rem;
	padding:1rem 1.2rem 0;
}
.addcar>p>span{
	font-size: 1.4rem;
	color: #000000;	
}
.addcar>p>span:last-of-type{
	position: absolute;
	right: 1.2rem;
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
.addcar input{
	width:4rem;
	text-align: center;
	height:1.6rem;
	font-size: 1.4rem;
	margin:0 0.3rem;
}
.addcar>span{
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	height: 3.5rem;
	line-height:3.5rem;
	text-align: center;
	color: white;
	font-size: 1.8rem;
	background-color: #EE4F4F;
	letter-spacing: 2rem;
	
}
</style>