<template>
    <div>
    	<van-nav-bar
		  title="登陆"
		  left-arrow
		  @click-left="onClickLeft"
		/>
        <img :src="src" class="heaer_img"/>
		
		<van-uploader :after-read="onRead" class="load_img">
			<img :src="head_src" class="load_img">
		</van-uploader>
        <van-cell-group style="marginTop:2rem">
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
		  <van-field
		    v-model="password"
		    type="password"
		    label="密码"
		    icon="clear"
		    @click-icon="password = ''"
		    placeholder="请输入密码"
		    :error-message='tip.phone'
		    required
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
				password:'',
				tip:'',
				head_src:src
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
			//上传头像事件
			 onRead(file) {
				this.head_src = file.content;
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
	.load_img{
		position: fixed;
		top:19rem;
		width:5rem;
		height: 5rem;
		border-radius: 50%;
		border: 1px solid white;
		left:50%;
		margin-left: -2.5rem;
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