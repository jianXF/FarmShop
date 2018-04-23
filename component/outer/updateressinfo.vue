<template>
    <div>
       <div class="header_top">
            <van-nav-bar
                    title="编辑收货地址"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <van-cell-group style="marginTop:46px">
            <van-field
                v-model="listDetail.name"
                label="收货人"
                icon="clear"
                placeholder="请输入收货人姓名"
                @click-icon="listDetail.name = ''"
            />

            <van-field
                v-model="listDetail.tel"
                type="tel"
                label="联系电话"
                icon="clear"
                placeholder="请联系电话"
                @click-icon="listDetail.tel = ''"
                
            />
            <van-field
                label="手机号"
                placeholder="请输入手机号"
                v-model="address"
            />
        </van-cell-group>
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
            //收货地址详情
            listDetail:null,
            //地区名字
            address:'重庆',
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
        },
        mounted(){
            this.listDetail=this.$store.state.selectAddress;
            console.log(this.listDetail);
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
