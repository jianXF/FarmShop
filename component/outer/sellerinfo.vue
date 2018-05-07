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
                :title="sell.title"
                :desc="sell.desc"  
                :thumb="sell.img"
             >
             <div slot="footer">
                <i class="iconfont icon-favorite" @click="isCollet" 
                :style="{fontSize:'2.5rem', color:colletBollean?'#EE4F4F':''}"></i>
            </div>
            </van-card>
            
        </div>
        <xgoodlist />
    </div>
  
</template>

<script>
    import src from "../../img/user.jpg";
    import xgoodlist from "../common/goodlist.vue"
    export default{
        components:{
            xgoodlist
        },
        data(){
            return {
                sell:{
                    img:src,
                    title:'技术书屋',
                    desc:'共有56件宝贝'
                },
                colletBollean:false
            }
        },
        methods:{
            //标题点击事件
            onClickLeft(){
                this.$router.push({path:'/sellerlist'});
            },
            //是否收藏店铺
            isCollet(){
                if(this.colletBollean){
                    this.colletBollean=false;
                }else{
                    this.colletBollean=true;
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
</style>
