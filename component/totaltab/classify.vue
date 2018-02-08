<template>
    <div class="classify">
        <xheader />
        <div class="allkind">
	        <ul class="kind">
	        	<li v-for="i in arr" v-text="i.name" :class="i.id==xid?'li_c':' '"  @click="changeXid(i.id)"></li>
	        </ul>
	        <div class="kind_l"></div>
	        <div class="kind_r">
	        	<ul>
	        		<li>
	        			<a href="#/goodsinfo"><img :src="xsrc"/></a>
	        			<p>白酒</p>
	        		</li>
	        		<li>
	        			<a href="#/goodsinfo"><img :src="xsrc"/></a>
	        			<p>白酒</p>
	        		</li>
	        		<li>
	        			<a href="#/goodsinfo"><img :src="xsrc"/></a>
	        			<p>白酒</p>
	        		</li>
	        		<li>
	        			<a href="#/goodsinfo"><img :src="xsrc"/></a>
	        			<p>白酒</p>
	        		</li>
	        		<li>
	        			<a href="#/goodsinfo"><img :src="xsrc"/></a>
	        			<p>白酒啊打发啊实打实大所多</p>
	        		</li>
	        	</ul>
	        </div>
		</div>
    </div>
  
</template>

<script>
    import xheader from "../common/header.vue";
    import src from "../../img/user.jpg";
    export default{
        components:{
            xheader
        },
        data(){
        	return {
        		xkind:"干果零食",
        		xid:0,
        		xsrc:src,
        		arr:[{
					id:0,
					name:"干果零食",
				},{
					id:1,
					name:"绿色水果",
				},{
					id:2,
					name:"有机蔬菜",
				},{
					id:3,
					name:"优质家禽",
				},{
					id:4,
					name:"柴米油盐",
				},{
					id:5,
					name:"手工制品",
				},{
					id:6,
					name:"当地特产",
				}]
        	}
       },
       methods:{
       	//改变选中的商品类型xid
       		changeXid(id){
       			this.xid=id;
       		}
       }
    }
</script>
<style scoped>
	.classify{
		padding-bottom:3.8rem ;		
	}
	.allkind{
		display: flex;
		padding-top:4.2rem;
	}
	.kind{
		width:30%;
		display: flex;
		flex-direction: column;
		position: fixed;
		left:0;
		top:4.2rem;
		z-index: 1;
		background-color: white;
		height: 100%;
	}
	.kind>li{
		height:3.5rem;
		line-height: 3.5rem;
		font-size: 1.6rem;
		text-align: center;
		border-bottom:1px solid #F6F6F6;
	}
	.allkind>.kind_l{
		width: 30%;
	}
	.allkind>.kind_r{
		width: 70%;
		box-sizing: border-box;
		padding: 10px 0 5px;
	}

	.kind_r>ul{
		display: flex;
		flex-wrap: wrap;
	}
	.kind_r li{
		width:33%;
		text-align: center;
		margin-top:0.5rem ;
	}
	.kind_r li img{
		width: 6rem;
	}
	.kind_r li p{
		width: 80%;
		margin: 0 auto;
		overflow: hidden;
		white-space: pre;
		text-align: center;		
		line-height: 2rem;
		font-size: 1.4rem;
	}
	.li_c{
		color:#EE4F4F;
		border-left:5px solid #EE4F4F;
	}
</style>