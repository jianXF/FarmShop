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
                <van-field
                    v-model="message"
    
                    label="我的反馈"
                    type="textarea"
                    placeholder="请输入你需要反馈/留言的信息"
                    rows="5"
                    autosize
                />
            
            </van-cell-group>
            <van-button size="normal" class="btn-send">提交反馈</van-button>
        </div>
        <div class="letterList">
            <div class="letters">
                <p>收到付款离开时间地方克里斯记得付款了离开时间到了付款路上看到经理富士康离开时间地方了</p>
                <span>3084-34-43</span>
                <div class="adminback">
                     <p>商城回复：收到付款离开时间地方克里斯记得付款了</p>
                     <span>3084-34-43</span>
                </div>
               
            </div>
            <div class="letters">
                <p>收到付款离开时间地方克里斯记得付款了离开时间到了付款路上看到经理富士康离开时间地方了</p>
                <span>3084-34-43</span>
            </div>
        </div>
    </div>
  
</template>

<script>
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
            //xfooter
        },
        data(){
            return {
                message:''
            }
        },
        methods:{
            //头部右边点击事件
            onClickLeft(){
                this.$router.push({path:'/totaltab/mine'});
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
    margin-top: 21rem;
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
    text-indent: 2em;
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
