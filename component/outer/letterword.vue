<template>
    <div>
        <div class="header_top">
            <van-nav-bar
                    title="我的反馈"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="letterword">
            <van-cell-group>
                <van-field v-model="orderId" placeholder="请输入订单编号（反馈需输入）" />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="message"
                    label="我的反馈"
                    type="textarea"
                    placeholder="请输入你需要反馈/留言的信息"
                    rows="5"
                    autosize
                />
            
            </van-cell-group>
            <van-button size="normal" class="btn-send" @click="sendFeed">提交反馈</van-button>
        </div>
        <div class="letterList">
            <div class="letters" v-for="i in feedList">
                <p v-text="i.content" :style="{color:i.feedStatus==1?'#EE4F4F':'#6d6969'}"></p>
                <span v-text="i.feedTime.substr(0,8)"></span>
                <div class="adminback" v-if="i.isReply">
                     <p v-text="'商城回复：'+i.backcontent" ></p>
                     <span v-text="i.backTime.substr(0,8)"></span>
                </div>
               
            </div>
            <!-- <div class="letters">
                <p>收到付款离开时间地方克里斯记得付款了离开时间到了付款路上看到经理富士康离开时间地方了</p>
                <span>3084-34-43</span>
            </div> -->
        </div>
    </div>
  
</template>

<script>
	import $ from "jquery";
	import Vant from 'vant';
	import { Dialog,Toast } from 'vant';
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            //xfooter
        },
        data(){
            return {
                message:'',
                orderId:'',
                feedList:[]
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
                url:"http://localhost:2014/feedbackAll",
                type:"get",
                data:{
                    userId:sessionStorage.getItem("userId")
                    
                },
                success:function(data){
                   _this.feedList = data;

                   console.log(data);
                }
            });
        },
        methods:{
            //头部右边点击事件
            onClickLeft(){
                this.$router.go(-1);
            },
            //提交反馈事件
            async sendFeed(){
                const _this= this;
                if(this.message==""){
                    Toast("请输入反馈或留言的信息");
                    return ;
                }
                if(_this.orderId!=""){
                    await $.ajax({
                        url:"http://localhost:2014/order/orderId",
                        type:"get",
                        data:{
                            orderId:_this.orderId
                            
                        },
                        success:async function (data){
                            if(data!='success'){
                                Toast("订单号输入不正确，请重新输入");
                            }else{
                                await $.ajax({
                                    url:"http://localhost:2014/feedback/insert",
                                    type:"POST",
                                    data:{
                                        userId:sessionStorage.getItem("userId"),
                                        content:_this.message,
                                        orderId:_this.orderId==""?undefined:_this.orderId
                                        
                                    },
                                    success:function(data){
                                        if(data=="success"){
                                            Toast.success("反馈/留言成功");
                                            _this.message="";
                                            _this.orderId="";
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                
                
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
.letterword{
    position: fixed;
    top:45px;
    border-top: 5px solid #F6F6F6;
    left:0;
    width:100%;
    z-index: 10;
    background-color: #F6F6F6;
}
.btn-send{
    width: 80%;
    margin-left: 10%;
    margin-top: 0.4rem;
    background-color: #EE4F4F;
}
.letterList{
    margin-top: 25rem;
    border-top: 2px solid #EE4F4F;
}
.letters{
    padding: 1px 5px ;
    background-color: white;
    padding:1rem;
    border-bottom: 1px solid #e0dada;

}
.letters>p{
    font-size: 1.5rem;
    color:#423f3f;
    text-align: left;
    text-indent: 1em;
    background-color: white;
}
.letters>span{
    font-size:1.2rem;
    text-align: right;
    display: block;
    color:#B4B5B9;
}
.adminback{
    background-color: #eae7e7;
    color:#52545E;
}
.adminback p{
    font-size: 1.5rem;
    text-indent: 2rem;
}
.adminback span{
    padding:0.5rem;
    display: block;
    text-align: right;
    font-size: 1.2rem;
    color:#B4B5B9;
}
</style>
