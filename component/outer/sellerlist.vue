<!--商品列表页-->
<template>
	<div>
		<div class="back" :style="{display: tipsbool==true?'block':'none'}" @click="changeHide"></div>
	<div class="tips" :style="{display: tipsbool==true?'block':'none'}">
		<xfourlist />
	</div>
    <div class="sellslist">
        <header>
        	<a  @click="goBack" class="iconfont icon-back"></a>
        	<a href="#/search?isgoods=2">
        		<input type="text"/>
        	</a>
        	<p class="iconfont icon-category" @click="changetips"></p>
        </header>
        <xselllist class="xselllist" :sellerList="sellerList"/>
        <p class="nonegood">亲，已经没有店铺了哦</p>
    </div>
	</div>
    
</template>

<script>
	import xselllist from "../common/selllist.vue";
	import xfourlist from "../common/fourlist.vue";
	import $ from "jquery";
    export default{
        components:{
			xselllist,
			xfourlist
        },
        data(){
        	return {
        		xtab:1,
				tipsbool:false,
				sellerList:[]
        	}
		},
		async mounted(){
			const _this= this;
			if(this.$router.history.current.query.sellerTitle){
				await $.ajax({
						url:"http://localhost:2014/find/seller/title",
						type:"GET",
						data:{
							title:this.$router.history.current.query.sellerTitle,
							limit:'max'
						},
						success:function(data){
							_this.sellerList = data;
						}
					});
			}else{
				await $.ajax({
					url:"http://localhost:2014/sellerAll",
					type:"GET",
					data:{
						limit:'max'
					},
					success:function(data){
						_this.sellerList = data;
					}
				});
			}
		},
       
        methods:{ 
        	//点击不同的排序方式
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
			goBack(){
				this.$router.go(-1);
			}
        }
    }
</script>
<style scoped>
.sellslist>header{
	height: 4.1rem;
	line-height:2.5rem;
	display: flex;
	padding: 0.8rem 0.8rem;
	text-align: center;
	background-color: #fbfbfb;
	position: fixed;
	box-sizing: border-box;
	width: 100%;
	top:0;
	left:0;
}
.sellslist>header>a:first-of-type{
	width: 10%;
	font-size: 2.4rem;
	text-align: left;
}
.sellslist>header>a:last-of-type{
	width:80%;
	border-bottom:1px solid #ADADAD;
}
.sellslist>header input{
	outline: none;
	border: 0;
	margin: auto 0;
	font-size: 2rem;
	width: 90%;
	background-color: #fbfbfb;
	margin-top:-1px;
}
.sellslist>header>p{
	width:10%;
	font-size: 2.3rem;
	margin-left: 1rem;
	color: black;
}	
.sellslist>nav{
	top:4.1rem;
	display: flex;
	justify-content: space-around;
	text-align: center;
	position: fixed;
	width: 100%;
	height: 4rem;
	line-height: 4rem;
	background-color:white ;
}
.sellslist>nav>p{
	text-align: center;
	width: 25%;
	font-size: 1.4rem;
	position: relative;
}
.sellslist>nav>p>i{
	font-size: 2rem;
	color: black;
	padding-top:0.2rem;
	position: absolute;
	top:0;
	right: 1rem;
}
.sellslist>nav>p>.i_c{
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

.back{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0);
	top:0;
	left:0;
	z-index:10;
	display: none;
}
.nonegood{
	height:4rem;
	line-height: 4rem;
	font-size: 1.6rem;
	text-align: center;
}
.xselllist{
    margin-top: 4.2rem;
    background-color: white;
}
</style>