<template>
    <div>
        <div class="header_top">
        <van-nav-bar
                
                title="管理收货地址"
                left-arrow
                @click-left="onClickLeft"
        />
        </div>

        <van-address-list
            style="marginTop:46px"
            v-model="chosenAddressId"
            :list="list"
            @add="onAddAddress"
            @edit="onEditAddress"
            />
    </div>
  
</template>

<script>
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            
        },
        data(){
            return {
                //选择收货地址
                chosenAddressId: '1',
                //数据列表
                list: [
                    {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                    },
                    {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号'
                    }
                ]
            }
        },
        methods:{
            //点击标题返回事件
            onClickLeft(){
                this.$router.push({path:'/totaltab/mine'});
            },
            //点击新增收货地址
            onAddAddress() {
                this.$router.push({path:'/addressinfo'});
                
            },
            //编辑收货地址
            onEditAddress(item, index) {
                console.log(item, index);
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
