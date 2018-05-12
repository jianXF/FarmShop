<template>
    <div class="shouye">
         <xheader />
         <xbanner />
         <xgoodskind />
         <xsellerkind />
         <xpromotionkind :bargainArr="bargainArr"/>
         <div class="listtile">
         	<i class="iconfont icon-favorites" style="color: red;"></i>
         	<span>猜你喜欢</span>
         </div>
         <xgoodlist :goodsArr="goodsArr"/>
    </div>
  
</template>

<script>
    import $ from "jquery";
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
        },
        data(){
            return {
                //列表xgoodlist
                goodsArr:[],
                //促销列表
                bargainArr:[]
            }
        },
        async mounted(){
            const _this = this;
            //特价促销
            await $.ajax({
                url:"http://localhost:2014/find/goods/isBargain",
                type:"GET",
                data:{
                    xtab:'1'
                },
                success:function(data){
                    var newdata = [];
                    if(data.length>3){
                        newdata.push(data[0]);
                        newdata.push(data[1]);
                        newdata.push(data[2]);
                    }else{
                        newdata = data;
                    }
					_this.bargainArr = newdata;
                }
            });
            //猜你喜欢
            await $.ajax({
                url:"http://localhost:2014/find/goods",
                type:"GET",
                data:{
                },
                success:function(data){
					_this.goodsArr=data;
					console.log(data);
                }
            });
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