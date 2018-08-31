<template>
  <div class="wrap">
    <yqzj-Head></yqzj-Head>
    <div class="pd_center" :style="{height:conHeights+'px'}">
      <img src="../../images/no_qx.png" class="pd_center_images">
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'

  export default{
      data(){
          return {
              conHeights:0
          }
      },
    components:{
      yqzjHead,
      yqzjFooter
    },
    mounted(){
     var heights =  document.body.offsetHeight;
     this.conHeights = heights-46;
    }
  }
</script>
<!--scoped-->
<style scoped>
  .pd_center{margin-top: 60px;min-height: 750px;background-color: #f5f5f5;overflow: hidden;}
  .pd_center .pd_center_images{display: block;margin: 70px auto 0;}
</style>
