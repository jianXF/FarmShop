<template>
    <div class="selllist">
       <van-card 
        style="backgroundColor:white"
        :title="sell.title"
        :desc="sell.desc"  
        :thumb="sell.img"
        >
        <div slot="footer">
            <van-button size="mini" style="color:#EE4F4F">进入</van-button>
        </div>
    </van-card>
        <van-card 
            style="backgroundColor:white"
            :title="sell.title"
            :desc="sell.desc"  
            :thumb="sell.img"
            >
            <div slot="footer">
                <van-button size="mini" style="color:#EE4F4F" @click="sellinfo">进入</van-button>
            </div>
        </van-card>

 
    </div>
	</template>
<script>
	import src from "../../img/user.jpg";
	export default{
		data(){
			return {
                sell:{
                    img:src,
                    title:'技术书屋',
                    desc:'共有56件宝贝'
                }
			}
        },
        methods:{
            //跳进店铺详情
            sellinfo(){
                this.$router.push({path:'/sellerinfo'});
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