<template>
    <div>
        <div class="header_top">
            <van-nav-bar
                    title="新增收货地址"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <van-address-edit
            style="marginTop:46px"
            :area-list="areaList"

            show-search-result
            @save="onSave"
            @delete="onDelete"
        />
    </div>
  
</template>

<script>
import $ from "jquery";
import areDate from "../address.json";
	import Vant from 'vant';
	import { Toast  } from 'vant';
    export default{
        components:{
            //xfooter
        },
        data() {
            return {
            areaList:{}
            }
        },
        mounted(){
            const _this = this;
            this.areaList = areDate;
        },

        methods: {
            //标题点击事件
            onClickLeft(){
                this.$router.go(-1);
            },
            //保存地址
            async onSave(content) {
                const _this =this;
                var isFirst = false;
                console.log(content);
                await $.ajax({
                    url:"http://localhost:2014/addressAll",
                    type:"GET",
                    data:{
                        userId:sessionStorage.getItem('userId')
                    },
                    success:function(data){
                        if(data.length==0){
                            isFirst = true;
                        }
                    }
                });
                await $.ajax({
                    url:"http://localhost:2014/address/insert",
                    type:"POST",
                    data:{
                        userId:sessionStorage.getItem('userId'),
                        name:content.name,
                        tel:content.tel,
                        province:content.province,
                        city:content.city,
                        county:content.county,
                        address_detail:content.address_detail,
                        area_code:content.area_code,
                        is_default:isFirst?'1':'0'
                    },
                    success:function(data){
                        if(data=='success'){
                            Toast.success('添加收货地址成功');
                            _this.$router.go(-1);
                        }
                    }
                });
            console.log(content);
            },
            //点击删除
            onDelete() {
            console.log('delete');
            }
        }
    }
</script>
<style>
.header_top{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 100;
}
</style>
