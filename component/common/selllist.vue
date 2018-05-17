<template>
    <div class="selllist" >
    <van-card 
        v-for="i in sellerLists"
        style="backgroundColor:white"
        :title="i.sellerTitle"
        :desc="'共有'+i.goodNum+'件宝贝，总销量'+i.goodsell+'件'"  
        :thumb="i.img"
        >
        <div slot="footer">
            <span v-if="i.status!=2" class="sellerddown">该店铺已注销</span>
            <van-button size="mini" v-if="isCollet" style="color:#EE4F4F" @click="cancelCollet(i)">取消收藏</van-button>
            <van-button v-if="i.status==2" size="mini" style="color:#EE4F4F" @click="clickSellerinfo(i)">进入</van-button>
        </div> 
    </van-card>
    </div>
	</template>
<script>
    import src from "../../img/user.jpg";
    import $ from "jquery";
    	import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
	export default{
        props:["sellerList","isCollet"],
		data(){
			return {
                sellerLists:this.sellerList
			}
        },
        watch: {
                sellerList:function(newVal,oldVal) {
                    console.log('value',newVal);
                    this.sellerLists = newVal;
                }
            },
        methods:{
            //跳进店铺详情
            clickSellerinfo(i){
                this.$router.push({path:'/sellerinfo',query:{sellerId:i.sellerId}});
            },
            //取消搜藏
            async cancelCollet(i){
                const _this = this;
                Dialog.confirm({
					title: '是否取消收藏'
				}).then(async() => {
				    await $.ajax({
                        url:"http://localhost:2014/collet/delete",
                        type:"post",
                        data:{
                            userId:sessionStorage.getItem("userId"),
                            colletType:1,
                            colletId:i.sellerId
                        },
                        success:function(data){
                            if(data=="success"){
                                Toast.success('取消收藏');
                            }
                        }
                    });
                await $.ajax({
                    url:"http://localhost:2014/colletAll",
                    type:"GET",
                    data:{
                        userId:sessionStorage.getItem("userId"),
                        colletType:1
                    },
                    success:function(data){
                        _this.sellerLists = data;
                    }
                });
				}).catch(() => {
				// on cancel
				});
                
            }
        }
	}
</script>

<style>
.sellerddown{
    font-size:1.2rem;
    color:#EE4F4F;
}
</style>