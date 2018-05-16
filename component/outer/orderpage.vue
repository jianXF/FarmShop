<template>
    <div id="orderpage">
        <!--右上提示框的背景覆盖-->
    	<div class="back" :style="{display: tipsbool==true?'block':'none'}" @click="changeHide"></div>
    	<!--加入购物车的背景覆盖-->
    	<div class="back1" :style="{display:carbool==true?'block':'none'}" @click="cancalAdd"></div>
		<div class="tips" :style="{display: tipsbool==true?'block':'none'}">
			<xfourlist />
		</div>
        <header>
        	<div><a href="#/totaltab/mine" class="iconfont icon-back"></a>
        	<p >我的订单</p></div>
        	<i class="iconfont icon-category" @click="changetips"></i>
        </header>
        <section>
        	<p :class="xtab==1?'p_c':''" @click="changeXtab(1)">全部</p>
        	<p :class="xtab==2?'p_c':''" @click="changeXtab(2)">待付款</p>
        	<p :class="xtab==3?'p_c':''" @click="changeXtab(3)">待发货</p>
        	<p :class="xtab==4?'p_c':''" @click="changeXtab(4)">待收货</p>
        	<p :class="xtab==5?'p_c':''" @click="changeXtab(5)">待评价</p>
        </section>
        <div class="con" >
        		<div class="nothing" v-if="orderList.length==0">
        			<p>您还没有相关的订单</p>
        			<span>可以去看看有哪些想买的</span>
        		</div>
				<div class='list' v-for="i in orderList">
        		<header>
        			<p @click="clickSellerinfo(i)">
        				<span v-text="i.sellerTitle"></span>
        				<i class="iconfont icon-more"></i>
        			</p>
        			<span v-if="i.status==2">卖家待发货</span>
					<span v-if="i.status>2">卖家已发货</span>
					<span v-if="i.status==1">卖家未付款</span>
        		</header>
        		<div class="center" @click="showinfo(i)">
        			<img :src='i.logo' />
        			<div class='title'>
        				<p v-text="i.title"></p>
        				<i v-text="'运费：'+i.delivery"></i>
        			</div>
        			<div class="money">
        				<p v-text="'￥'+i.goodsPrice" ></p>
        				<p v-text="'X'+i.goodsNum">X1</p>
        			</div>
        		</div>
        		<footer>
					<span v-if="i.status==1" @click="deleteOrder(i)">取消订单</span>
        			<span v-if="i.status==1" @click="sendmoney(i)">付款</span>
					<span v-if="i.status==3" @click="getGoods(i)">确认收货</span>
					<span v-if="i.status==4" @click="clickAssment(i)">去评价</span>
					<p v-if="i.status==5">该订单已完成</p>
        		</footer>
        	</div>
        	
        
        </div>
		<van-dialog
			v-model="dialogBool"
			:before-close="beforeClose"
			>
			<van-steps direction="vertical" :active="orderInfo.status-1" active-color="#f60">
				<van-step>
					<h3>订单生产</h3>
					<p v-text="'订单编号：'+orderInfo.goodsId"></p>
					<p v-text="orderInfo.status<=5?orderInfo.orderTime.substr(0,8):''"></p>
				</van-step>
				<van-step>
					<h3>付款</h3>
					<p v-text="orderInfo.status<=5&&orderInfo.status>1?orderInfo.buyTime.substr(0,8):''"></p>
				</van-step>
				<van-step>
					<h3>卖家发货</h3>
					<p v-text="orderInfo.status<=5&&orderInfo.status>2?orderInfo.deliveryName+':'+orderInfo.sendTime.substr(0,8):''"></p>
					<p v-text="orderInfo.status<=5&&orderInfo.status>2?'快递单号：'+orderInfo.deliveryId:''"></p>
				</van-step>
				<van-step>
					<h3>收货</h3>
					<p v-text="orderInfo.status<=5&&orderInfo.status>3?orderInfo.getTime.substr(0,8):''"></p>
				</van-step>
				<van-step>
					<h3 >评价</h3>
					<p v-text="orderInfo.status==5?orderInfo.evaTime.substr(0,8):''"></p>
					<p v-text="orderInfo.status==5?orderInfo.content:''"></p>	
				</van-step>
			</van-steps>
		</van-dialog>
    </div>
  
</template>

<script>
	import src from "../../img/user.jpg";
	import xfourlist from "../common/fourlist.vue";
	import $ from "jquery";
	import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            xfourlist
        },
        data(){
        	return {
				src:src,
				orderList:[],
        		tipsbool:false,//右上角的弹出框控制
        		carbool:false,	//加入购物车选择的弹出框
				xtab:1,			//选项卡id
				dialogBool:false,
				orderInfo:{}
        	}
		},
		async mounted(){
			this.xtab=this.$store.state.selectOrder;
			 const _this= this;
            await $.ajax({
				url:"http://localhost:2014/orderAll",
				type:"GET",
				data:{
					userId:sessionStorage.getItem("userId"),
					status:_this.xtab==1?-1:_this.xtab-1
				},
				success:function(data){
					for(var i of data){
						i.logo=i.imgLogo.split(";")[0];
					}
					_this.orderList=data;
				}
            });
		},
        methods:{
			
        	////选择选项卡，显示不同信息
        	async changeXtab(id){
				const _this =this;
				this.xtab=id;
				await $.ajax({
				url:"http://localhost:2014/orderAll",
				type:"GET",
				data:{
					userId:sessionStorage.getItem("userId"),
					status:id==1?-1:id-1
				},
				success:function(data){
					for(var i of data){
						i.logo=i.imgLogo.split(";")[0];
					}
					_this.orderList=data;
				}
            });
        	},
        	//点击头部右边选择功能
        	changetips(){
        		this.tipsbool=true;
        	},
        	//功能卡显示，点击back隐藏
        	changeHide(){
        		this.tipsbool=false;
        	},//点击加入购物车，弹出选择数量框及蒙版
	       	showAdd(){
	       		this.carbool=true;
	       	},
	       	//取消添加购物车（点击叉叉）
	       cancalAdd(){
	       	this.carbool=false;
		   },
		   clickSellerinfo(i){
			   this.$router.push({path:'sellerinfo',query:{sellerId:i.sellerId}})
		   },
		   //点击订单付款事件
		   sendmoney(val){
			   const _this =this;
			   Dialog.confirm({
					title: '是否付款'
				}).then(async() => {
					console.log(123);
					await $.ajax({
						url:"http://localhost:2014/order/update",
						type:"POST",
						data:{
							orderId:val.orderId,
							status:'2'
						},
						success:function(data){
							if(data=="success"){
								Toast.success("付款成功");	
							}
						}
					});
					await $.ajax({
						url:"http://localhost:2014/orderAll",
						type:"GET",
						data:{
							userId:sessionStorage.getItem("userId"),
							status:_this.xtab==1?-1:_this.xtab-1
						},
						success:function(data){
							for(var i of data){
								i.logo=i.imgLogo.split(";")[0];
							}
							_this.orderList=data;
						}
					});
				}).catch(() => {
				// on cancel
				});
		   },
		   //确认收货
			getGoods(obj){
			   const _this =this;
			    Dialog.confirm({
					title: '是否确认收货'
				}).then(async() => {
					await $.ajax({
						url:"http://localhost:2014/order/update",
						type:"POST",
						data:{
							orderId:obj.orderId,
							status:'4'
						},
						success:function(data){
							if(data=="success"){
								Toast.success("确认收货成功")
							}
						}
					});
					await $.ajax({
						url:"http://localhost:2014/orderAll",
						type:"GET",
						data:{
							userId:sessionStorage.getItem("userId"),
							status:_this.xtab==1?-1:_this.xtab-1
						},
						success:function(data){
							for(var i of data){
								i.logo=i.imgLogo.split(";")[0];
							}
							_this.orderList=data;
						}
					});
				}).catch(() => {

				});
			   
		   },
		   //去评价
		   clickAssment(obj){
			   this.$router.push({path:'assessment',query:{orderId:obj.orderId,goodsId:obj.goodsId,logo:obj.logo}});
		   },
		   //查看订单详情
		   async showinfo(obj){
			   const _this= this;
			   await $.ajax({
						url:"http://localhost:2014/find/orderInfo",
						type:"GET",
						data:{
							orderId:obj.orderId,
							status:obj.status
						},
						success:function(data){
							_this.orderInfo=data;
						
						}
					});
			   this.dialogBool=true;
		   },
		    beforeClose(action, done) {
				done();
			},
			//取消该订单
			async deleteOrder(obj){
				const _this= this;
			   await $.ajax({
					url:"http://localhost:2014/order/delete",
					type:"POST",
					data:{
						orderId:obj.orderId,
						goodsId:obj.goodsId,
						goodsNum:obj.goodsNum,
						sellerId:obj.sellerId
					},
					success:function(data){
						if(data=='success'){
							Toast.success('取消订单成功')
						}
					
					}
				});
				await $.ajax({
					url:"http://localhost:2014/orderAll",
					type:"GET",
					data:{
						userId:sessionStorage.getItem("userId"),
						status:_this.xtab==1?-1:_this.xtab-1
					},
					success:function(data){
						for(var i of data){
							i.logo=i.imgLogo.split(";")[0];
						}
						_this.orderList=data;
					}
				});
			}
			}
    }
</script>
<style scoped>
#orderpage>header{
	position: fixed;	
	top: 0;
	left: 0;
	width: 100%;
	z-index:10;
	display: flex;
	background-color: #fbfbfb;
	justify-content: space-between;
	height: 4.1rem;
	line-height: 4.1rem;
}
#orderpage>header>div{
	width:45%;
	display: flex;
}
#orderpage>header>div>a{
	width:30%;
	line-height: 4.6rem;
	font-size: 2.5rem;
	text-align: center;
}
#orderpage>header>i{
	width: 15%;
	line-height: 4.6rem;
	font-size: 2.5rem;
	text-align: center;
	float: right;
}
#orderpage>header>div>p{
	width: 70%;
	font-size: 1.6rem;
	text-align: canter;
	
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
section{
	position: fixed;	
	top: 4.1rem;
	left: 0;
	width: 100%;
	z-index:10;
	display: flex;
	justify-content: space-around;
	height: 3.5rem;
	line-height: 3.5rem;
	background-color: white;
}
section>p{
	width: 20%;
	font-size: 1.4rem;
	text-align: center;
}
section>.p_c{
	border-bottom:2px solid #EE4F4F ;
	color: #EE4F4F;
}
.con{
	margin-top: 8.1rem;
}
.list{
	margin-top: 0.5rem;
	background-color: white;
}
.list>header{
	padding: 0 1.5rem;
	height: 3rem;
	line-height: 3rem;
	font-size: 1.6rem;
	display: flex;
	justify-content: space-between;
}
.list>header>span{
	color:#EE4F4F
}
.list>.center{
	display: flex;
	justify-content: space-around;
	height: 6.5rem;
	padding: 0.5rem 1rem;
	background-color: #FAFAFA;
}
.list>.center img{
	width:30%;
}
.list>.center>.title{
	padding: 0 1rem;
	width:50%;
	
}
.list>.center>.title p{
	color:black;
	font-size: 1.4rem;
	margin-bottom: 2px;
	width:94%;
}
.list>.center>.title i{
	font-size: 1.1rem;
	width:94%;
	line-height: 2.5rem;
}
.list>.money{
	text-align: right;
	
}
.list .money>p:nth-of-type(1){
	color: black;
	font-weight: 800;
	text-align: right;
	font-size: 1.3rem;
	line-height: 1.5rem;
}
.list .money>p:nth-of-type(2){
	color:#999999;
	text-align: right;
	line-height: 2.5rem;
}
.list>footer{
	height: 2rem;
	padding: 0.5rem 1rem;
	display: flex;
	justify-content: flex-end;
}
.list>footer>span{
	line-height:2rem;
	color: #FF9D70;
	font-weight: 800;
	border:1px solid  #FF9D70;/*#D8D8D8*/
	padding: 0 0.5rem;
	margin-left:1rem;
}
.con>.nothing{
	height:20rem;
}
.con>.nothing>p{
	font-size: 1.7rem;
	color: #686868;
	padding-top:8rem;
	text-align: center;
	margin-bottom: 1rem;
}
.con>.nothing>span{
	font-size: 1.2rem;
	color: #ACACAC;
	display: block;
	text-align: center;
}
.van-step p{
	font-size: 1.2rem;
}
</style>