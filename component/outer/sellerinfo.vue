<template>
    <div>
       <div class="header_top">
            <van-nav-bar
                    title="店铺详情"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="selllist sellcollet" style="marginTop:3.7rem">
            <van-card 
                style="backgroundColor:white"
                :title="seller.sellerTitle"
                :desc="'共有'+seller.goodNum+'件宝贝，总销量'+seller.goodsell+'件'"  
                :thumb="seller.img"
             >
             <div slot="footer">
                <i class="iconfont icon-favorite" @click="isCollet(seller)" 
                :style="{fontSize:'2.5rem', color:colletBollean?'#EE4F4F':''}"></i>
            </div>
            </van-card>
            
        </div>
        <div class="nothing" v-if="goodsArr.length==0">
            <p>该店铺暂时没有商品</p>
            <span>可以去其他店铺逛逛</span>
        </div>
        <xgoodlist  :goodsArr="goodsArr"/>
    </div>
  
</template>

<script>
    import src from "../../img/user.jpg";
    import $ from "jquery";
    import xgoodlist from "../common/goodlist.vue";
    import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
    export default{
        components:{
            xgoodlist
        },
        data(){
            return {
                seller:{},
                goodsArr:[],
                colletBollean:false
            }
        },
        async mounted(){
            const _this= this;
            var sellerId = this.$router.history.current.query.sellerId;
            await $.ajax({
                url:"http://localhost:2014/seller/findId",
                type:"GET",
                data:{
                    sellerId:sellerId
                },
                success:function(data){
                    _this.seller = data;
                    if(_this.seller.status!=2){
                        Dialog.alert({
                            message: '该商家未在正常销售状态，无法查看'
                        }).then(() => {
                            _this.$router.go(-1);
                        });
                    }
                }
            });
            if(sessionStorage.getItem("userId")){
                await $.ajax({
                    url:"http://localhost:2014/collet/find",
                    type:"GET",
                    data:{
                        userId:sessionStorage.getItem("userId"),
                        colletType:1,
                        colletId:sellerId
                    },
                    success:function(data){
                        if(data=="success"){
                            _this.colletBollean = true;
                        }
                    }
                });
            }
            
            //商品
			await $.ajax({
                url:"http://localhost:2014/find/goods/sellerId",
                type:"GET",
                data:{
                    sellerId:sellerId
                },
                success:function(data){
					_this.goodsArr=data;
                }
            });
        },
        methods:{
            //标题点击事件
            onClickLeft(){
                this.$router.go(-1);
            },
            //是否收藏店铺
            async isCollet(seller){
                const _this = this;
                if(sessionStorage.getItem("userId")){
                    if(this.colletBollean){
                        await $.ajax({
                            url:"http://localhost:2014/collet/delete",
                            type:"post",
                            data:{
                                userId:sessionStorage.getItem("userId"),
                                colletType:1,
                                colletId:seller.sellerId
                            },
                            success:function(data){
                                if(data=="success"){
                                    _this.colletBollean=false;
                                    Toast.success('取消收藏');
                                }
                            }
                        });
                    }else{
                        await $.ajax({
                            url:"http://localhost:2014/collet/insert",
                            type:"post",
                            data:{
                                userId:sessionStorage.getItem("userId"),
                                colletType:1,
                                colletId:seller.sellerId
                            },
                            success:function(data){
                                if(data=="success"){
                                    _this.colletBollean=true;
                                    Toast.success('收藏成功');
                                }
                            }
                        });
                        
                    }
                }else{
                    Dialog.confirm({
						title: '是否登陆',
						message: '只有登陆才能操作此功能'
						}).then(() => {
							this.$router.push({path:'/login'});
						}).catch(() => {
					});
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
.nothing{
	height:20rem;
}
.nothing>p{
	font-size: 1.7rem;
	color: #686868;
	padding-top:8rem;
	text-align: center;
	margin-bottom: 1rem;
}
.nothing>span{
	font-size: 1.2rem;
	color: #ACACAC;
	display: block;
	text-align: center;
}
</style>
