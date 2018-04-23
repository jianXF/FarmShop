<template>
    <div class="collet">
        <div class="header_top">
        <van-nav-bar
                
                title="收藏夹"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
        />
        </div>
        <van-tabs  style="marginTop:46px">
            <van-tab  :title="'宝贝'">
                <xgoodlist />
            </van-tab>
            <van-tab  :title="'店铺'">
                <xgoodlist />
            </van-tab>
        </van-tabs>
    </div>
  
</template>

<script>
    import xgoodlist from "../common/goodlist.vue"
    export default{
        components:{
            xgoodlist
        },
        data(){
            return{
                title:['宝贝','店铺']
            }
        },
        methods:{
            onClickLeft(){
                this.$router.push({path:'/totaltab/mine'});
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