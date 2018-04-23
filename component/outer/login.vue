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
		    v-model="username"
		    label="手机号"
		    type='tel'
		    icon="clear"
		    placeholder="请输入手机号"
		    required
		    @click-icon="username = ''"
		    :error-message='tip.tel'
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
			<a href="">忘记密码</a>
			<a href="#/reg">注册账号</a>
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
        		username:'',
        		password:'',
        		tip:{
					tel:'',
					phone:''
				}
        	}
        },
        methods:{
        	//点击头部标题返回主页
        	onClickLeft(){
        		this.$router.push({path:'/totaltab/index'});
        	},
        	//登陆事件
        	loginSubmit(){
        		this.tip.tel='手机号输入错误，请重新输入';
        		this.tip.phone='密码输入错误，请重新输入';
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