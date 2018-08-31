<template>
  <div></div>
</template>
<script>
  export default {
    mounted(){
      localStorage.clear();
      window.location = this.$store.state.oldyqzjUrl+'/Login/logout';
    }
  }
</script>
