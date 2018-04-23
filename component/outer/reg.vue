<template>
    <div>
    	<van-nav-bar
		  title="登陆"
		  left-arrow
		  @click-left="onClickLeft"
		/>
        <img :src="src" class="heaer_img"/>
        <van-cell-group>
		  <van-field
		  	style=''
		    v-model="tel"
		    label="手机号"
		    type='tel'
		    icon="clear"
		    placeholder="请输入手机号"
		    required
		    @click-icon="tel = ''"
		    :error-message='tip'
		    @input='checkTel'
		  />
		</van-cell-group>
		<van-button  type='primary' style='marginTop:1rem' @click='loginSubmit'>登  录</van-button>
		<p class='selectType'>
			<a href=""></a>
			<a href="#/login">登录</a>
		</p>
    </div>
  
</template>

<script>
	import src from "../../img/user.jpg";
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            //xfooter
        },
        data(){
        	return {
        		src:src,
        		tel:'',
        		tip:''
        	}
        },
        methods:{
        	//点击头部标题返回主页
        	onClickLeft(){
        		this.$router.push({path:'/login'});
        	},
        	checkTel(){
        		if(!/^\d{11}$/.test(this.tel)){
        			this.tip='手机号输入错误，请重新输入';
        		}else{
        			this.tip='';
        		}
        	},
        	//登陆事件
        	loginSubmit(){
        		
        	}
        	
        }
    }
</script>
<style scoped>
	.heaer_img{
		width:100%;
		height:22rem;
		
	}
	.van-button--primary{
		background-color:#EE4F4F ;
		color: white;
		border-color:#EE4F4F;
	}
	.van-button--normal{
		width:90%;
		margin-left:5%;
	}
	.van-button{
		height: 3.4rem;
		line-height: 3.4rem;
	}
	.selectType{
		display: flex;
		padding: 5%;
		justify-content: space-between;
	}
	.van-nav-bar{
		background-color: #fff0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
	}
	[class*=van-hairline]::after{
		border: 0;
	}
</style>