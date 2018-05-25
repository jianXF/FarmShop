<template>
    <div class="order">
        <div class="header_top">
            <van-nav-bar
                    
                    title="确认订单"
                    left-arrow
                    @click-left="onClickLeft"
            />
            <div class="address" @click="clickAddresslist" v-if="!addressInfo">
                <p>暂未设置收货地址 , 请点击进行设置</p>
                <p></p>
            </div>
            <div class="address" @click="clickAddresslist" v-if="addressInfo">
                <p><span v-text="'收货人：'+addressInfo.name"></span><span v-text="addressInfo.tel"></span></p>
                <p v-text="'收货地址：'+addressInfo.address"></p>
            </div>
            <div class="goodsinfo" v-for="i in goodsInfo">
                <li >
        		<a ><img :src="i.logo"/></a>
        		<div>
        			<p v-text="i.title"></p>
        			<p v-text="'运费：'+i.delivery">运费：12.00</p>
        			<p>
        				<span>￥{{i.price}}</span>
        				<span>X{{i.xnum}}</span>
        			</p>
        		</div>
        	</li>
             <van-cell-group>
                <van-field
                    v-model="i.nodeinfo"
                    label="买家留言"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="1"
                    autosize
                />
            </van-cell-group>
            </div>
        </div>
        <van-submit-bar
        :price="sumPrice*100"
        button-text="提交订单"
        @submit="onSubmit"
        />

    </div>
  
</template>

<script>
    //import xheader from "../common/xheader.vue"
    import src from "../../img/user.jpg";
    import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
    import $ from "jquery";
    export default{
        components:{
            
        },
        data(){
            return {
                goodsInfo:[],
                addressInfo:{},
                sumPrice:0
            }
        },
        async mounted(){
            const _this= this;
            await $.ajax({
				url:"http://localhost:2014/address/findId",
				type:"GET",
				data:{
                    addressId:this.$store.state.selectAddress,
                    userId:sessionStorage.getItem("userId")
				},
				success:function(data){
                    if(data){
                        _this.addressInfo = data;
                        _this.addressInfo.address= data.province+data.city+data.county+data.address_detail;
                    }else{
                        _this.addressInfo=undefined;
                    }
				}
            });
            const ids = this.$router.history.current.query.goodsId;
            const xnum = _this.$router.history.current.query.xnum;
            console.log(xnum);
            await $.ajax({
				url:"http://localhost:2014/find/goods/goodsIds",
				type:"GET",
				data:{
                    goodsId:ids.length==1?ids:ids.join(",")
				},
				success:function(data){
                    _this.goodsInfo = data;
                    if(xnum instanceof Array){
                        for(var i=0;i<_this.goodsInfo.length;i++){
                            console.log('1');
                             _this.goodsInfo[i].xnum = xnum[i];
                             _this.goodsInfo[i].nodeinfo="";
                             _this.goodsInfo[i].logo = _this.goodsInfo[i].imgLogo.split(";")[0];
                            if( _this.goodsInfo[i].isBargain==0){
                                _this.goodsInfo[i].price = _this.goodsInfo[i].price_o*xnum[i];
                                _this.goodsInfo[i].price = _this.goodsInfo[i].price.toFixed(2);
                            }else{
                                _this.goodsInfo[i].price = _this.goodsInfo[i].price_n*xnum[i];
                                _this.goodsInfo[i].price = _this.goodsInfo[i].price.toFixed(2);
                            }
                            _this.sumPrice+=Number.parseFloat(_this.goodsInfo[i].price)+Number.parseFloat(_this.goodsInfo[i].delivery);
                        }
                    }else{
                        _this.goodsInfo[0].xnum = xnum;
                        _this.goodsInfo[0].nodeinfo= "";
                        _this.goodsInfo[0].logo = _this.goodsInfo[0].imgLogo.split(";")[0];
                        
                        if( _this.goodsInfo[0].isBargain==0){
                            _this.goodsInfo[0].price = _this.goodsInfo[0].price_o*xnum;
                            _this.goodsInfo[0].price = _this.goodsInfo[0].price.toFixed(2);
                        }else{
                            _this.goodsInfo[0].price = _this.goodsInfo[0].price_n*xnum;
                            _this.goodsInfo[0].price = _this.goodsInfo[0].price.toFixed(2);
                        }
                        console.log()
                        _this.sumPrice+=Number.parseFloat(_this.goodsInfo[0].price)+Number.parseFloat(_this.goodsInfo[0].delivery);
                    }
                   
				}
            });
        },
        methods:{
            //点击标题返回事件
            onClickLeft(){
                this.$router.go(-1);
            },
            async onSubmit(){
                if(!this.addressInfo){
                    Toast("未设置收货地址，请设置");
                    return ;
                }
                const _this=this;
                const carId = _this.$router.history.current.query.carId;
                Dialog.confirm({
				title: '确认支付',
				}).then(async() => {
                    for(var obj of _this.goodsInfo){
                        await $.ajax({
                        url:"http://localhost:2014/order/insert",
                        type:"POST",
                        data:{
                            goodsId:obj.goodsId,
                            status:2,
                            goodsNum:obj.xnum,
                            goodsPrice:obj.price,
                            sellerId:obj.sellerId,
                            userId:sessionStorage.getItem("userId"),
                            address:_this.addressInfo.address,
                            addressName:_this.addressInfo.name,
                            addressTel:_this.addressInfo.tel,
                            nodeinfo:obj.nodeinfo
                        },
                        success:function(data){
                            if(data='success'){
                                Toast.success("订单已生成,请及时收货");
                               
                            }
                        }
                    });
                    }
                    if(carId){
                        for(var i of carId){
                            await $.ajax({
                            url:"http://localhost:2014/carlist/delete",
                            type:"GET",
                            data:{
                                carId:i
                            },
                            success:function(data){
                                if(data=="success"){
                                    _this.$router.go(-1);
                                }
                            }
                        });
                    }
                    }else{
                         _this.$router.go(-1);
                    }
                    
					
				}).catch(async() => {
                    for(var obj of _this.goodsInfo){
                        await $.ajax({
                        url:"http://localhost:2014/order/insert",
                        type:"POST",
                        data:{
                            goodsId:obj.goodsId,
                            status:1,
                            goodsNum:obj.xnum,
                            goodsPrice:obj.price,
                            sellerId:obj.sellerId,
                            userId:sessionStorage.getItem("userId"),
                            address:_this.addressInfo.address,
                            addressName:_this.addressInfo.name,
                            addressTel:_this.addressInfo.tel,
                            nodeinfo:obj.nodeinfo
                        },
                        success:function(data){
                            if(data='success'){
                                Toast.success("订单已生成，请尽快付款");

                            }
                        }
                    });
                    }
                    if(carId){
                        for(var i of carId){
                            await $.ajax({
                                url:"http://localhost:2014/carlist/delete",
                                type:"GET",
                                data:{
                                    carId:i
                                },
                                success:function(data){
                                    if(data=="success"){
                                        _this.$router.go(-1);
                                    }
                                }
                            });
                        }
                    }else{
                         _this.$router.go(-1);
                    }
                    
                });
                
                    
            },
            clickAddresslist(){
                this.$router.push({path:'/addresslist',query:{type:2}});
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
.address{
    background-color: white;
    border-bottom: 2px dashed #9d9d9d;
    padding:  20px 5%;
}
.address p:first-of-type{
    justify-content: space-between;
    display: flex;
    line-height: 2rem;
}
.address p:first-of-type span{
    color:black;
    font-size: 1.5rem;
    padding-right: 2rem;
}
.address p:last-of-type{
    margin-top: 4px;
    font-size: 1.3rem;
    line-height: 2rem;
}
.goodsinfo>li{
		display: flex;
		height: 9rem;
		line-height: 9rem;
		box-sizing: border-box;
		background-color: white;
		padding: 1rem 1.6rem;
		margin-top:0.6rem;
		border:1px solid #eae9e9;
	}
	.goodsinfo>li>span{
		text-align: left;
		width:8%;
		line-height: 7.5rem;
		color:#ddd;
	}
	.goodsinfo>li>.span_c,.sumprice>.span_c{
		color: #EE4F4F;
	}
	.goodsinfo>li>a{
		width:22%;
	}
	.goodsinfo>li>a>img{
		width: 100%;		
		margin-top: 0.5rem;
	}
	.goodsinfo>li>div{
		display: flex;
		flex-direction: column;
		line-height: 1.5rem;
		width:70%;
		padding: 0px 0.6rem;
		margin-top:0.5rem;
		
	}
	.goodsinfo>li>div>p:nth-of-type(1){
		font-size: 1.2rem;
		font-weight: 600;
		color: black;

	}
	.goodsinfo>li>div>p:nth-of-type(2){
		font-size: 1rem;
        text-align: right;
	}
	.goodsinfo>li>div>p:nth-of-type(3){
		display: flex;
		justify-content: space-between;
		position: relative;
		line-height: 2rem;
	}
	.goodsinfo>li>div>p:nth-of-type(3)>span{
		font-size: 1.4rem;
		color: #EE4F4F;	
	}
	.goodsinfo>li>div>p:nth-of-type(3)>span:last-of-type{
		color: black;
	}
    
</style>
