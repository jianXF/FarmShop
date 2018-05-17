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
		    :error-message='tip.tel'
			@input='checkTel'
		  />
		
		  <van-field
		    v-model="password"
		    type="password"
		    label="密码"
		    icon="clear"
		    @click-icon="password = ''"
		    placeholder="请输入密码"
		    :error-message='tip.pass'
			@input='checkPass'
		    required
		  />
		</van-cell-group>
		<van-button  type='primary' style='marginTop:1rem' @click='loginSubmit'>登  录</van-button>
		<p class='selectType'>
			<a @click="forget">忘记密码</a>
			<a href="#/reg">注册账号</a>
		</p>
    </div>
  
</template>

<script>
	import $ from "jquery";
	import src from "../../img/login.jpg";
	import Vant from 'vant';
	import { Toast  } from 'vant';
    export default{
        components:{
            //xfooter
        },
        data(){
        	return {
        		src:src,
        		tel:'',
        		password:'',
        		tip:{
					tel:'',
					pass:''
				}
        	}
        },
        methods:{
        	//点击头部标题返回主页
        	onClickLeft(){
        		this.$router.push({path:'/totaltab/index'});
			},
			//核对手机号
        	checkTel(){
        		if(!/^[1]\d{10}$/.test(this.tel)){
        			this.tip.tel='手机号输入错误，请重新输入';
        		}else{
        			this.tip.tel='';
        		}
			},
			//核对密码
			checkPass(){
				if(!/^\w{8,12}$/.test(this.password)){
        			this.tip.pass='密码格式为8-12位的非特殊符号，请重新输入';
        		}else{
        			this.tip.pass='';
        		}
			},
        	//登陆事件
        	async loginSubmit(){
				const _this = this;
        		if(this.tel && this.password){
					await $.ajax({
						url:"http://localhost:2014/reg/login",
						type:"POST",
						data:{
							tel:_this.tel,
							password:_this.password
						},
						success:function(data){
							if(data.code==0){
								sessionStorage.setItem('userId',data.data.userId);
								sessionStorage.setItem('tel',data.data.tel);
								sessionStorage.setItem('logo',data.data.img);
								Toast.success(data.meaasge);
								_this.$router.push({path:'/totaltab/index'});
							}else{
								Toast.fail(data.meaasge);
							}
							
						}
					})
				}else{
					Toast('请输入注册的手机号和密码');
				}
        	},
			//w忘记密码的事件
			forget(){
				Toast("请联系商城管理员");
			}
        }
    }
</script>
<style scoped>
	.heaer_img{
		width:100%;
		height:18rem;
		
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