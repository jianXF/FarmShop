<template>
    <div>
        <div class="header_top">
            <van-nav-bar
                    title="编辑收货地址"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <van-address-edit
        :addressInfo='addressInfo'
            style="marginTop:46px"
            :area-list="areaList"
            show-delete
            show-search-result
            @save="onSave"
            @delete="onDelete"
        />
    </div>
  
</template>

<script>
    //import xheader from "../common/xheader.vue"
    import $ from "jquery";
    import areaDate from "../address.json";
    	import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
    export default{
        components:{
            //xfooter
        },
        data() {
            return {
               addressInfo:{},
                areaList:areaDate
            }
        },
        async mounted(){
            const _this= this;
            await $.ajax({
				url:"http://localhost:2014/address/findId",
				type:"GET",
				data:{
					addressId:this.$router.history.current.query.addressId
				},
				success:function(data){
                    _this.addressInfo = data;
				}
			});
        },

        methods: {
            //标题点击事件
            onClickLeft(){
                this.$router.go(-1);
            },
            //保存地址
            async onSave(content) {
                const _this =this;
                await $.ajax({
                    url:"http://localhost:2014/address/update",
                    type:"POST",
                    data:{
                        addressId:_this.$router.history.current.query.addressId,
                        name:content.name,
                        tel:content.tel,
                        province:content.province,
                        city:content.city,
                        county:content.county,
                        address_detail:content.address_detail,
                        area_code:content.area_code
                    },
                    success:function(data){
                        if(data=='success'){
                            Toast.success('修改收货地址成功');
                            _this.$router.go(-1);
                        }
                    }
                });
            },
            //点击删除
            async onDelete() {
                const _this =this;
                if(this.addressInfo.is_default==1){
                    //update xxx set name='xxx' where title='xxx';
                    await $.ajax({
                    url:"http://localhost:2014/address/updatedefault",
                    type:"POST",
                    data:{
                        userId:sessionStorage.getItem('userId'),
                        addressId:_this.$router.history.current.query.addressId
                    },
                    success:function(data){
                        if(data=='success'){
                           console.log("四大皆空");
                        }
                    }
                });
                }
               await $.ajax({
                    url:"http://localhost:2014/address/delete",
                    type:"POST",
                    data:{
                        addressId:_this.$router.history.current.query.addressId
                    },
                    success:function(data){
                        if(data=='success'){
                            Toast.success('删除收货地址成功');
                            _this.$router.go(-1);
                        }
                    }
                });
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
