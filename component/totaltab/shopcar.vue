<template>
    <div>
        <xheader :message="title"/>
    </div>
  
</template>

<script>
    import xheader from "../common/header1.vue"
    export default{
        components:{
            xheader
        },
        data(){
        	return {
        		title:"购物车"
        	}
        }
    }
</script>