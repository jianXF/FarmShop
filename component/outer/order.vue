<template>
    <div class="order">
        <div class="header_top">
            <van-nav-bar
                    
                    title="确认订单"
                    left-arrow
                    @click-left="onClickLeft"
            />
            <div class="address" @click="clickAddresslist">
                <p><span>收货人：碱性的</span><span>15034785737</span></p>
                <p>收货地址：圣诞节费卢卡斯的经费卢卡斯的记录反馈技术的离开了开机时离开的房间送李经理看见了</p>
            </div>
            <div class="goodsinfo">
                <li v-for="i in goods">
        		<span :class="i.bool==true?'iconfont icon-gou span_c':'iconfont icon-gou'" @click="changebool(i.id)"></span>
        		<a href=""><img :src="i.src"/></a>
        		<div>
        			<p v-text="i.name"></p>
        			<p>运费：12.00</p>
        			<p>
        				<span>￥{{i.price}}</span>
        				<span>X{{i.num}}</span>
        			</p>
        		</div>
        	</li>
             <van-cell-group>
                <van-field
                    v-model="nodeinfo"
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
        :price="'12.54'*100"
        button-text="提交订单"
        @submit="onSubmit"
        />

    </div>
  
</template>

<script>
    //import xheader from "../common/xheader.vue"
    import src from "../../img/user.jpg";
    export default{
        components:{
            
        },
        data(){
            return {
                goods:[{
        			id:1,
        			name:"了空间发的科技哈罗德看见了哈的框架快乐就按何时可掇",
        			src:src,
        			type:"椒盐味",
        			price:"223.23",
        			num:2,
        			bool:true
                }],
                nodeinfo:''
            }
        },
        mounted(){
            console.log(this.$store.state.selectAddress);
        },
        methods:{
            //点击标题返回事件
            onClickLeft(){
                this.$router.go(-1);
            },
            onSubmit(){

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
}
.address p:last-of-type{
    margin-top: 4px;
    font-size: 1.3rem;
    line-height: 2rem;
}
.goodsinfo>li{
		display: flex;
		height: 8rem;
		line-height: 8rem;
		box-sizing: border-box;
		background-color: white;
		padding: 0.5rem;
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
