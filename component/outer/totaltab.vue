<template>
    <div >
        <router-view></router-view>
        <xfooter />
    </div>
  
</template>

<script>
    import xfooter from "../common/footer.vue"
    export default{
        components:{
        	xfooter
        }
    }
</script>