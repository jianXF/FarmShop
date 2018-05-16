<template>
    <div>
        <div class="header_top">
            <van-nav-bar
                    
                    title="修改基本信息"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
       <div class="list">
           
			<a href="#/mineinfo"><span>
                <img :src="logo" class="load_img">
                </span>
                <span >
                    <van-uploader :after-read="onRead" class="load_img">
                        修改<i class="iconfont icon-more"></i>
                    </van-uploader>
                </span>
                </a>
			<a href="#/updateuser?type=1"><span>密码</span><span >修改<i class="iconfont icon-more"></i></span></a>
			<a href="#/updateuser?type=2"><span>手机号</span><span >修改<i class="iconfont icon-more"></i></span></a>
		</div>
    </div>
  
</template>

<script>
	import $ from "jquery";
	import Vant from 'vant';
	import { Toast  } from 'vant';
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            //xfooter
        },
        data(){
            return {
                logo:sessionStorage.getItem("logo")
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            //上传头像事件
			async onRead(file) {
                 const _this=this;
				
				await $.ajax({
					url:"http://localhost:2014/user/update",
					type:"POST",
					data:{
                        userId:sessionStorage.getItem("userId"),
						img:file.content
					},
					success:function(data){
                        _this.logo = file.content;
                        sessionStorage.setItem('logo',_this.logo);
						Toast.success('修改头像成功');
					}
				});
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
.list{
	margin-top:3.9rem;
	background-color: white;
	
}
.list>a{
	line-height: 4.5rem;
	height:4.5rem;
	display: flex;
	justify-content: space-between;
	padding:0 0.8rem;
	border-bottom: 1px solid #f1f1f1;
}
.list>a:first-of-type{
    height: 6rem;
    line-height: 6rem;
}
.list>a>span:first-of-type{
	font-size: 1.5rem;
	color: black;
	margin-left:0.5rem;
}
.list>a>span:first-of-type>i{
	color:white;
	box-sizing: border-box;
	padding:0.5rem;
	border-radius: 10%;
	margin-right:1rem;
}
.list>a>span>img{
    width: 5rem;
    height: 5rem;
    margin-top: 0.5rem;
}

.list>a>span:last-of-type{
	font-size: 1.2rem;
}
.list>a>span:last-of-type>.icon-more{
	padding-left:0.4rem;
	color:#52545E;
}
</style>
