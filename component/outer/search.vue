<template>
    <div class="search">
        <header>
        	<a @click="goBack" class="iconfont icon-back"></a>
        	<p>
        		<input type="text" v-model="inputValue" @input="findGoods"/>
        		<i class="iconfont icon-close" @click="clearInput"></i>
        	</p>
        	<p @click="goodslist">搜 索</p>
        </header>
        <ul>
        	<li v-for="i in titleArr">
        		<p v-text="i.title" @click="goodsInfo(i.goodsId)"></p>
        		<i class="iconfont icon-skip" @click="changeInput(i.title)"></i>
        	</li>
        </ul>
    </div>
  
</template>

<script>
	//import xheader from "../common/xheader.vue"
	import $ from "jquery";
    export default{
        components:{
            //xfooter
        },
        data(){
        	return {
				inputValue:"",
				titleArr:[]
        	}
        },
        methods:{
        	clearInput(){
        		this.inputValue="";
			},
			async findGoods(){
				const _this =this;
				await $.ajax({
                url:"http://localhost:2014/find/goods/title",
                type:"GET",
                data:{
					xtab:'1',
					title:_this.inputValue
                },
                success:function(data){
                    var newdata = [];
                    if(data.length>8){
                        newdata.push(data[0]);
                        newdata.push(data[1]);
						newdata.push(data[2]);
						newdata.push(data[3]);
                        newdata.push(data[4]);
						newdata.push(data[5]);
						newdata.push(data[6]);
                        newdata.push(data[7]);
                    }else{
                        newdata = data;
                    }
					_this.titleArr = newdata;
                }
            });
			},
			changeInput(title){
				this.inputValue=title;
			},
			//跳转详情
			goodsInfo(goodsId){
				this.$router.push({path:'/goodsinfo?',query:{goodsId:goodsId}});
			},
			//跳转列表
			goodslist(){
				this.$router.push({path:'/goodslist',query: {type:'title',value:this.inputValue}});
			},
			//返回上一页
			goBack(){
				this.$router.go(-1);
			}
        }
    }
</script>
<style scoped>
.search>header{
	height: 4.1rem;
	line-height:2.5rem;
	display: flex;
	padding: 0.8rem 0.8rem;
	text-align: center;
	background-color: white;
	position: fixed;
	box-sizing: border-box;
	width: 100%;
	top:0;
	left:0;
	border-bottom:0.2rem solid #F6F6F6 ;
}
.search>header>a{
	width: 10%;
	font-size: 2.4rem;
	text-align: left;
}
.search>header>p:first-of-type{
	width:70%;
	border-bottom:1px solid #ADADAD;
}
.search>header input{
	outline: none;
	border: 0;
	margin: auto 0;
	font-size: 2rem;
	width: 90%;
	height: 100%;
}
.search>header>p:last-of-type{
	width:20%;
	font-size: 1.6rem;
	background-color: #EE4F4F;
	border-radius: 10%;
	margin-left: 1rem;
	color: white;
}
.search>ul{
	display: flex;
	flex-direction: column;
	padding-top: 4.4rem;
}
.search>ul>li{
	background-color: white;
	height:3.5rem;
	line-height: 3.5rem;
	margin-bottom: 0.1rem;
	box-sizing: border-box;
	width: 100%;
	padding: 0 2rem;
	color:black;
	overflow: hidden;
	white-space: pre;
	display: flex;
	justify-content: space-between;
}
.search>ul>li>p{
	font-size: 1.4rem;
	width: 90%;
}
.search>ul>li>i{
	width: 10%;
	text-align: right;
	font-size: 1.8rem;
}
</style>