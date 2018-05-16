<template>
    <div class="assessment">
        <div class="header_top">
            <van-nav-bar
                    title="发表评价"
                    right-text="发布"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>
        <div class="giveGrade">
            <img :src="logo" />
            <van-rate
            v-model="grate"
            :size="30"
            :count="6"
            color="tomato"
            
            />
        </div>
        <van-cell-group>
                <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧"
                    rows="4"
                    autosize
                />
            
            </van-cell-group>
    </div>
  
</template>

<script>
    import src from "../../img/user.jpg";
    import Vant from 'vant';
    import { Dialog,Toast } from 'vant';
    import $ from "jquery";
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
           
            //xfooter
        },
        data(){
            return {
                src:src,
                //进度条
                grate:1,
                //评价
                message:"",
                orderId:'',
                logo:''
            }
        },
        async mounted(){
            this.orderId=this.$router.history.current.query.orderId;
            this.goodsId=this.$router.history.current.query.goodsId;
            this.logo = this.$router.history.current.query.logo;
        },
        methods:{
            //标题返回事件
            onClickLeft(){
                this.$router.go(-1);
            },
            //发布评价
            onClickRight(){
                const _this =this;
                if(this.message==""){
                    Toast("请填写评论内容");
                    return ;
                }
                Dialog.confirm({
					title: '确认评价？'
				}).then(async() => {
					await $.ajax({
						url:"http://localhost:2014/order/update",
						type:"POST",
						data:{
							orderId:_this.orderId,
                            status:'5',
                            content:_this.message
						},
						success:function(data){
                            
						}
					});
					await $.ajax({
						url:"http://localhost:2014/evaluate/insert",
						type:"POST",
						data:{
							goodsId:_this.goodsId,
                            content:_this.message,
                            evaType:_this.grate,
                            userId:sessionStorage.getItem("userId")
						},
						success:function(data){
							if(data=="success"){
                                Toast.success("评论成功");
                                _this.$router.go(-1);
							}
						}
					});
				}).catch(() => {
				// on cancel
				});
            }
            
        },
        computed: {
            changeCurrent(){
                return  this.currentRate.toFixed(0);
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
.giveGrade{
    margin-top: 50px;
    display: flex;
    justify-content:flex-start;
    background-color: white;
    padding: 10px 10px;
}
.giveGrade img{
    width: 4rem;
    height: 4rem;
    margin-right: 10%;
    margin-left: 2rem;
}

.table{
    line-height: 3rem;
    margin-right: 1rem;
}

</style>
