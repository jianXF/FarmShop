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
            <img :src="src" />
            <span class="table">描述相符--</span>
            <van-circle
                v-model="currentRate"
                :rate="60"
                :speed="100"
                :text="changeCurrent"
                size="3rem"
                color="#EE4F4F"
                layer-color="#eee"
            />
            <p>
                <i class="iconfont icon-less" @click="addCurrent"></i>
                <i class="iconfont icon-moreunfold" @click="downCurrent"></i>
            </p>
            <div class="tag">
                <van-tag plain type="danger" :style="{display:currentRate<=100 && currentRate>80?'block':'none'}">好评</van-tag>
                <van-tag mark type="primary" :style="{display:currentRate<=80 && currentRate>60?'block':'none'}">中评</van-tag>
                <van-tag mark type="success" :style="{display:currentRate<=60 && currentRate>0?'block':'none'}">差评</van-tag>
            </div>
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
    //import xheader from "../common/xheader.vue"
    export default{
        components:{
           
            //xfooter
        },
        data(){
            return {
                src:src,
                //进度条
                currentRate:60,
                //评价
                message:""
            }
        },
        mounted(){

        },
        methods:{
            //标题返回事件
            onClickLeft(){

            },
            //发布评价
            onClickRight(){

            },
            //添加满意度
            addCurrent(){
                
               this.currentRate=this.currentRate==100?this.currentRate: this.currentRate+10;
            },
            //减少满意度
            downCurrent(){
                this.currentRate=this.currentRate==0?this.currentRate:this.currentRate-10;
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
    width: 3rem;
    height: 3rem;
    margin-right: 5%;
}
.giveGrade p{
    display: flex;
    margin-left: 1rem;
    flex-direction: column;
}
.table{
    line-height: 3rem;
    margin-right: 1rem;
}
.giveGrade .tag{
    margin-left:2rem;
    margin-top: 0.7rem;
}
</style>
