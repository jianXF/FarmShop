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
            @select="selectItem"
            />
    </div>
  
</template>

<script>
    import $ from "jquery";
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            
        },
        data(){
            return {
                //选择收货地址
                chosenAddressId: '2',
                //数据列表
                list: []
            }
        },
        async mounted(){
            const _this= this;
            await $.ajax({
				url:"http://localhost:2014/addressAll",
				type:"GET",
				data:{
					userId:sessionStorage.getItem('userId')
				},
				success:function(data){
                    _this.list=data;
                    if(data.length!=0){
                        for(var i of data){
                            if(i.is_default==1){
                                _this.chosenAddressId = i.addressId;
                                break;
                            }
                        }
                    }
				}
			});
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
                this.$router.push({path:'/updateressinfo',query:{addressId:item.addressId}});
            },
            //选中收货地址
            selectItem(item,index){
                console.log(item);
                if(this.$router.history.current.query.type==2){
                   this.$store.state.selectAddress=item.addressId;
                this.$router.go(-1);
                }
                
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
