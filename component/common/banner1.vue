<template>
  <swiper :options="swiperOption" ref="mySwiper" >
<swiper-slide v-for="i in bannberImg"><img :src="i" class="swipersrc"/></swiper-slide>
<!-- <swiper-slide><img :src="imgsrc[1]" class="swipersrc"/></swiper-slide>
<swiper-slide><img :src="imgsrc[0]" class="swipersrc"/></swiper-slide> -->
<div class="swiper-pagination" slot="pagination"></div>
 </swiper>
  
</template>
<script>
	import src1 from "../../img/logo.jpg";
	import src2 from "../../img/user.jpg";
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper';
	Vue.use(VueAwesomeSwiper) 
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import '../../img/swiper-4.1.0.min.css';
	 export default{
		 props:["bannberImg"],
	 	components:{
	 		swiper,
	 		swiperSlide
	 	},
    data(){
      return {
      	imgsrc:[],
		swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
		        notNextTick: true, 
//		        autoplay: {
//		       	delay:2000,        	
//		       	disableOnInteraction:false        
//		        },
		        loop: true,
		        direction: 'horizontal',
		        grabCursor: true,
		        setWrapperSize: true,
		        autoHeight: true,
		        pagination: {
		          el: '.swiper-pagination'
		        },
		        centeredSlides: true,
		        paginationClickable: true,
		        navigation: {
		          nextEl: '.swiper-button-next',
		          prevEl: '.swiper-button-prev'
		        },
		        keyboard: true,
		        mousewheelControl: true,
		        observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
		        debugger: true
		     }
    }
	},
	mounted(){
	
	}
}
</script>
<style  scoped>
.swipersrc{
	width:100%;
	height:20rem;
}
.swiper-pagination-bullet-active{
	background-color:#EE4F4F ;
	background: #EE4F4F;
}
</style>