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
            show-set-default
            show-search-result
            @save="onSave"
            @delete="onDelete"
        />
    </div>
  
</template>

<script>
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            //xfooter
        },
        data() {
            return {
               addressInfo:{
                   name:'jian',
                   tel:'15038438594',
                   province:'重庆市',
                   city:'重庆市',
                   county:'九龙坡区',
                   address_detail:'石坪桥冶金三寸',
                   area_code:'110101',
                   is_default:'true'
               },
            areaList:{
                province_list: {
                    110000: '重庆市'
                },
                city_list: {
                    110100: '重庆市',
                    110200: '区县',
                },
                county_list: {
                    110101: '九龙坡区',
                    110102: '沙坪坝区',
                    110105: '大渡口区',
                    110106: '南岸区',
                    110201: '忠县',
                    110202: '万州县',

                }
            }
            }
        },

        methods: {
            //标题点击事件
            onClickLeft(){
                this.$router.push({path:'/addresslist'});
            },
            //保存地址
            onSave(content) {
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
