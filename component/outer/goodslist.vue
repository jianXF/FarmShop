<!--商品列表页-->
<template>
	<div>
		<div class="back" :style="{display: tipsbool==true?'block':'none'}" @click="changeHide"></div>
		<div class="tips" :style="{display: tipsbool==true?'block':'none'}">
			<xfourlist />
		</div>
    <div class="goodslist">
        <header>
        	<a @click="goback" class="iconfont icon-back"></a>
        	<a href="#/search">
        		<input type="text"/>
        	</a>
        	<p class="iconfont icon-category" @click="changetips"></p>
        </header>
        <nav>
        	<p :class="xtab==1?'font-show':' '" @click="changeXtab('1')">最新</p>
        	<p :class="xtab==2?'font-show':' '" @click="changeXtab('2')">销量</p>
        	<p :class="xtab==3?'font-show':' '" @click="changeXtab('3')">价格<i :class="xtab==3?'iconfont icon-less i_c':'iconfont icon-less'"></i></p>
        	<p :class="xtab==4?'font-show':' '" @click="changeXtab('4')">价格<i :class="xtab==4?'iconfont icon-moreunfold i_c':'iconfont icon-moreunfold'"></i></p>
        </nav>
        <xgoodlist style="padding-top:8.1rem" :goodsArr="goodsArr" />

        <p class="nonegood">亲，已经没有商品了哦</p>
    </div>
	</div>
    
</template>

<script>
	import $ from "jquery";
	import xgoodlist from "../common/goodlist.vue";
	import xfourlist from "../common/fourlist.vue";
    export default{
        components:{
			xgoodlist,
			xfourlist
        },
        data(){
        	return {
        		xtab:'1',
				tipsbool:false,
				goodsArr:[]
        	}
        },
        async mounted(){
		   const _this = this;console.log(this.$router.history.current.query);
		   if(location.href.includes('?')){
			  var type = this.$router.history.current.query.type;
			  var values = this.$router.history.current.query.value;
			  switch(type){
				  case 'kindId':
						await $.ajax({
							url:"http://localhost:2014/find/goods/kindId",
							type:"GET",
							data:{
								kindId:values,
								xtab:_this.xtab
							},
							success:function(data){
								_this.goodsArr=data;
								console.log(data);
							}
						});
						break;
					case 'isBargain':
						await $.ajax({
							url:"http://localhost:2014/find/goods/isBargain",
							type:"GET",
							data:{
								xtab:_this.xtab
							},
							success:function(data){
								_this.goodsArr=data;
								console.log(data);
							}
						});
						break;
					case 'oId':
						await $.ajax({
							url:"http://localhost:2014/find/goods/oId",
							type:"GET",
							data:{
								xtab:_this.xtab,
								oId:values
							},
							success:function(data){
								_this.goodsArr=data;
								console.log(data);
							}
						});
						break;
					case 'title':
							await $.ajax({
								url:"http://localhost:2014/find/goods/title",
								type:"GET",
								data:{
									xtab:_this.xtab,
									title:this.$router.history.current.query.value
								},
								success:function(data){
									_this.goodsArr=data;
								}
							});
							break;
			  }
			  
		   }
		   
		   
	   },
        methods:{ 
        	//点击不同的排序方式
        	async changeXtab(id){
				this.xtab=id;
				const _this =this;
				
			if(location.href.includes('?')){
			  var type = this.$router.history.current.query.type;
			  var values = this.$router.history.current.query.value;
			  switch(type){
				  case 'kindId':
						await $.ajax({
							url:"http://localhost:2014/find/goods/kindId",
							type:"GET",
							data:{
								kindId:values,
								xtab:_this.xtab
							},
							success:function(data){
								_this.goodsArr=data;
								console.log(data);
							}
						});
						break;
					case 'isBargain':
						await $.ajax({
							url:"http://localhost:2014/find/goods/isBargain",
							type:"GET",
							data:{
								xtab:_this.xtab
							},
							success:function(data){
								_this.goodsArr=data;
								console.log(data);
							}
						});
						break;
					case 'oId':
						await $.ajax({
							url:"http://localhost:2014/find/goods/oId",
							type:"GET",
							data:{
								xtab:_this.xtab,
								oId:values
							},
							success:function(data){
								_this.goodsArr=data;
								console.log(data);
							}
						});
						break;
					case 'title':
							await $.ajax({
								url:"http://localhost:2014/find/goods/title",
								type:"GET",
								data:{
									xtab:_this.xtab,
									title:this.$router.history.current.query.value
								},
								success:function(data){
									_this.goodsArr=data;
								}
							});
							break;
			  }
			  
		   }
        	},
        	//点击头部右边选择功能
        	changetips(){
        		this.tipsbool=true;
        	},
        	//功能卡显示，点击back隐藏
        	changeHide(){
        		this.tipsbool=false;
			},
			goback(){
				 this.$router.go(-1);
			}
        }
    }
</script>
<style scoped>
.goodslist>header{
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
.goodslist>header>a:first-of-type{
	width: 10%;
	font-size: 2.4rem;
	text-align: left;
}
.goodslist>header>a:last-of-type{
	width:80%;
	border-bottom:1px solid #ADADAD;
}
.goodslist>header input{
	outline: none;
	border: 0;
	margin: auto 0;
	font-size: 2rem;
	width: 90%;
	background-color: #fbfbfb;
	margin-top:-1px;
}
.goodslist>header>p{
	width:10%;
	font-size: 2.3rem;
	margin-left: 1rem;
	color: black;
}	
.goodslist>nav{
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
.goodslist>nav>p{
	text-align: center;
	width: 25%;
	font-size: 1.4rem;
	position: relative;
}
.goodslist>nav>p>i{
	font-size: 2rem;
	color: black;
	padding-top:0.2rem;
	position: absolute;
	top:0;
	right: 1rem;
}
.goodslist>nav>p>.i_c{
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
	z-index:10;
	display: none;
}
.nonegood{
	height:4rem;
	line-height: 4rem;
	font-size: 1.6rem;
	text-align: center;
}
</style>