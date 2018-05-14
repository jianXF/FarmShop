<template>
    <div class="selllist" >
    <van-card 
        v-for="i in sellerList"
        style="backgroundColor:white"
        :title="i.sellerTitle"
        :desc="'共有'+i.goodNum+'件宝贝，总销量'+i.goodsell+'件'"  
        :thumb="i.img"
        >
        <div slot="footer">
            <van-button size="mini" v-if="isCollet" style="color:#EE4F4F" @click="cancelCollet(i)">取消收藏</van-button>
            <van-button size="mini" style="color:#EE4F4F" @click="clickSellerinfo(i)">进入</van-button>
            
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
                sellerLists:[]
			}
        },
        watch: {
                sellerList(value) {
                    this.sellerLists = value
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
/* .selllist .van-card{
    border-bottom: 1px solid #F6F6F6;
}
.selllist .van-card__row{
    margin-top: 0.8rem;
}
.selllist .van-card__title{
    font-size: 1.5rem;
}
.selllist .van-card__footer{
    bottom: 15px;
} */
</style>