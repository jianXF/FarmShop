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
                <xgoodlist :goodsArr="goodsArr" :isCollet="true"/>
            </van-tab>
            <van-tab  :title="'店铺'">
                <xselllist :sellerList="sellerList" :isCollet="true"/>
            </van-tab>
        </van-tabs>
    </div>
  
</template>

<script>
    import xgoodlist from "../common/goodlist.vue";
    import xselllist from "../common/selllist.vue";
    import $ from "jquery";
    export default{
        components:{
            xgoodlist,
            xselllist
        },
        data(){
            return{
                title:['宝贝','店铺'],
                sellerList:[],
                goodsArr:[]
            }
        },
        async mounted(){
            const _this=this;
            await $.ajax({
				url:"http://localhost:2014/colletAll",
				type:"GET",
				data:{
                    userId:sessionStorage.getItem("userId"),
                    colletType:1
				},
				success:function(data){
					_this.sellerList = data;
				}
            });
             await $.ajax({
				url:"http://localhost:2014/colletAll",
				type:"GET",
				data:{
                    userId:sessionStorage.getItem("userId"),
                    colletType:2
				},
				success:function(data){
                    _this.goodsArr = data;
                    console.log(data);
				}
			});
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
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