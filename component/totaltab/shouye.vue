<template>
    <div class="shouye">
         <xheader />
         <xbanner />
         <xgoodskind />
         <xsellerkind />
         <xpromotionkind />
    </div>
  
</template>

<script>
    import xheader from "../common/header.vue";
    import xbanner from "../common/banner.vue";
    import xgoodskind from "../common/goodskind.vue";
    import xsellerkind from "../common/sellerkind.vue";
    import xpromotionkind from "../common/promotionkind.vue";
    export default{
        components:{
            xheader,
            xbanner,
            xgoodskind,
            xsellerkind,
            xpromotionkind
        }
    }
</script>
<style scoped>
.shouye{
	background-color:#fbfbfb ;
}
</style>