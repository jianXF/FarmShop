<template>
    <div>
    	<div class="header_top">
            <van-nav-bar
                    
                    :title="type==1?'修改密码':'修改手机号'"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <van-cell-group style="marginTop:3.8rem">
		  <van-field
		  	style=''
		    v-model="tel"
		    label="手机号"
		    type='tel'
		    icon="clear"
		    placeholder="请输入手机号"
		    required
            v-if="type==2"
		    @click-icon="tel = ''"
		    :error-message='tip.tel'
		    @input='checkTel'
		  />
		  <van-field
		    v-model="password"
            v-if="type==1"
		    type="password"
		    label="密码"
		    icon="clear"
		    @click-icon="password = ''"
		    placeholder="请再次输入密码"
		    :error-message='tip.pass'
			@input='checkPass'
		    required
		  />
		  <van-field
		    v-model="repassword"
            v-if="type==1"
		    type="password"
		    label="重复密码"
		    icon="clear"
		    @click-icon="password = ''"
		    placeholder="请再次输入密码"
		    :error-message='tip.repass'
			@input='checkrePass'
		    required
		  />
		</van-cell-group>
		<van-button  type='primary' style='marginTop:1rem' @click='regSubmit'>登  录</van-button>
    </div>
  
</template>

<script>
	import $ from "jquery";
	import src from "../../img/user.jpg";
	import Vant from 'vant';
	import { Toast  } from 'vant';
    export default{
        components:{
            //xfooter
        },
        data(){
        	return {
                type:0,
				tel:'',
				password:'',
				repassword:'',
				tip:{
					tel:'',
					pass:'',
					repass:''
				}
        	}
        },
        mounted(){
            var type = this.$router.history.current.query.type;
            this.type=type;
        },
        methods:{
        	//点击头部标题返回主页
        	onClickLeft(){
        		this.$router.go(-1);
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
			checkrePass(){
				if(this.password!=this.repassword){
					this.tip.repass='两次密码输入不一致，请重新输入';
				}else{
					this.tip.repass='';
				}

			},
			//上传头像事件
			 onRead(file) {
				this.head_src = file.content;
				
			},
        	//修改事件
        	 async regSubmit(){
				var _this = this;
				if(this.type==2){
					await $.ajax({
                        url:"http://localhost:2014/reg/checkTel",
                        type:"POST",
                        data:{
						   tel:_this.tel
                        },
                        success:async function(data){
							if(data!="success"){
                                Toast("手机号已被其他用户注册，不能修改为此手机号");
                                return ;
                            }else{
                                await $.ajax({
                                    url:"http://localhost:2014/user/update",
                                    type:"POST",
                                    data:{
                                        userId:sessionStorage.getItem('userId'),
                                        tel:_this.tel
                                    
                                    },
                                    success: function(data){
                                        if(data=='success'){
                                            sessionStorage.setItem('tel',_this.tel);
                                            Toast.success('修改手机号成功');
                                        }
                                    }
                                })
                            }
                        }
					})
						
				}else{
					await $.ajax({
							url:"http://localhost:2014/user/update",
							type:"POST",
							data:{
                                userId:sessionStorage.getItem('userId'),
                                password:_this.password
							},
							success: function(data){
								if(data=='success'){
                                    sessionStorage.setItem('tel',_this.tel);
                                    Toast.success('修改密码成功');
                                }
							}
						})
				}
        		
        	}
        	
        }
    }
</script>
<style scoped>
.header_top{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 100;
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
</style>