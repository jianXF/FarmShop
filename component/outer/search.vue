<template>
    <div class="search">
        <header>
        	<a href="#/totaltab/index" class="iconfont icon-back"></a>
        	<p>
        		<input type="text" v-model="inputValue"/>
        		<i class="iconfont icon-close" @click="clearInput"></i>
        	</p>
        	<p>搜 索</p>
        </header>
        <ul>
        	<li>
        		<p>按时打卡机啊拉科技三大</p>
        		<i class="iconfont icon-skip"></i>
        	</li>
        </ul>
    </div>
  
</template>

<script>
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            //xfooter
        },
        data(){
        	return {
        		inputValue:""
        	}
        },
        methods:{
        	clearInput(){
        		this.inputValue="";
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