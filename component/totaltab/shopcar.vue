<template>
    <div class="shopcar">
        <xheader :message="title"/>
        <ul>
        	<li v-for="i in goods">
        		<span :class="i.bool==true?'iconfont icon-gou span_c':'iconfont icon-gou'" @click="changebool(i.id)"></span>
        		<a href=""><img :src="i.src"/></a>
        		<div>
        			<p v-text="i.name"></p>
        			<p>单品：{{i.type}}</p>
        			<p>
        				<span>￥{{i.price}}</span>
        				<span><i class="iconfont icon-add add_p" @click="addNum(i.id)"></i><input type="text" v-model="i.num"/><i  class="iconfont icon-subtract sub_p" @click="subNum(i.id)"></i></span>
        			</p>
        		</div>
        	</li>
        </ul>
        <div class="sumprice">
        	<span :class="xbool==true?'iconfont icon-gou span_c':'iconfont icon-gou'" @click="changexbool"></span>
        	<div><p>￥{{sumprice}}</p>
        	<p>去结算</p></div>
        </div>
    </div>
  
</template>

<script>
	import src from "../../img/user.jpg";
    import xheader from "../common/header1.vue"
    export default{
        components:{
            xheader
        },
        data(){
        	return {
        		title:"购物车",
        		xbool:true,
        		sumprice:0,
        		goods:[{
        			id:1,
        			name:"了空间发的科技哈罗德看见了哈的框架快乐就按何时可掇",
        			src:src,
        			type:"椒盐味",
        			price:"223.23",
        			num:2,
        			bool:true
        		},{
        			id:2,
        			name:"了空间发的科技哈罗德看见了哈的框架快乐就按何时可掇",
        			src:src,
        			type:"椒盐味",
        			price:"223.23",
        			num:2,
        			bool:true
        		}]
        	}
        },
        methods:{
        	//点击按钮时，改变颜色
        	changebool(id){
        		for(var i in this.goods){
        			if(this.goods[i].id==id){
        				this.goods[i].bool=!this.goods[i].bool;
        				break;
        			}
        		}
        		var bstop=true;
        		for(var i in this.goods){
        			if(this.goods[i].bool==false){
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
        			for(var i in this.goods){
        				this.goods[i].bool=true;
        			}
        		}else{
        			for(var i in this.goods){
        				this.goods[i].bool=false;
        			}
        		}
        		
        	},
        //点击添加数量按钮
        addNum(id){
        	for(var i in this.goods){
        		if(this.goods[i].id==id){
        			this.goods[i].num++;
        		}
			}
        },
         //点击减少数量事件按钮
        subNum(id){
        	for(var i in this.goods){
    			if(this.goods[i].id==id){
    				if(this.goods[i].num==1){
    					return;
    				}else{
    					this.goods[i].num--;
    				}
    			}
			}	
        }
        }
    }
</script>
<style scoped>
	.shopcar{
		
	}
	.shopcar>ul{
		display: flex;
		flex-direction: column;
		padding: 0.7rem;
		padding-top: 4.8rem;
		
	}
	.shopcar>ul>li{
		display: flex;
		height: 8rem;
		line-height: 8rem;
		box-sizing: border-box;
		background-color: white;
		padding: 0.5rem;
		margin-top:0.6rem;
		border:1px solid #eae9e9;
	}
	.shopcar>ul>li>span{
		text-align: left;
		width:8%;
		line-height: 7.5rem;
		color:#ddd;
	}
	.shopcar>ul>li>.span_c,.sumprice>.span_c{
		color: #EE4F4F;
	}
	.shopcar>ul>li>a{
		width:22%;
	}
	.shopcar>ul>li>a>img{
		width: 100%;		
		margin-top: 0.5rem;
	}
	.shopcar>ul>li>div{
		display: flex;
		flex-direction: column;
		line-height: 1.5rem;
		width:70%;
		padding: 0px 0.6rem;
		margin-top:0.5rem;
		
	}
	.shopcar>ul>li>div>p:nth-of-type(1){
		font-size: 1.2rem;
		font-weight: 600;
		color: black;

	}
	.shopcar>ul>li>div>p:nth-of-type(2){
		font-size: 1rem;
	}
	.shopcar>ul>li>div>p:nth-of-type(3){
		display: flex;
		justify-content: space-between;
		position: relative;
		line-height: 2rem;
	}
	.shopcar>ul>li>div>p:nth-of-type(3)>span{
		font-size: 1.4rem;
		color: #000000;	
	}
	.shopcar>ul>li>div>p:nth-of-type(3)>span:last-of-type{
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
	.shopcar>ul>li>div input{
		width:4rem;
		text-align: center;
		height:1.6rem;
		margin:0 0.3rem;
	}
	.sumprice{
		position: absolute;
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
</style>