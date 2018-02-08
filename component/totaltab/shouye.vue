<template>
    <div class="shouye">
         <xheader />
         <xbanner />
         <xgoodskind />
         <xsellerkind />
         <xpromotionkind />
         <div class="listtile">
         	<i class="iconfont icon-favorites" style="color: red;"></i>
         	<span>猜你喜欢</span>
         </div>
         <xgoodlist />
    </div>
  
</template>

<script>
    import xheader from "../common/header.vue";
    import xbanner from "../common/banner.vue";
    import xgoodskind from "../common/goodskind.vue";
    import xsellerkind from "../common/sellerkind.vue";
    import xpromotionkind from "../common/promotionkind.vue";
    import xgoodlist from "../common/goodlist.vue";
    export default{
        components:{
            xheader,
            xbanner,
            xgoodskind,
            xsellerkind,
            xpromotionkind,
            xgoodlist
        }
    }
</script>
<style scoped>
.shouye{
	background-color:#F6F6F6 ;
	padding-bottom:3.8rem ;
}
.listtile{
	text-align: center;
	line-height: 3rem;
	
}
.listtile>span{
	font-size: 1.4rem;
}
</style>