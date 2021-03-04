<template>
  <div id="Mew-Soysia">
    <headbar/>
    <sidebar/>
    <cantent/>
  </div>
</template>
<script>
  import headbar from './components/layout/headbar'
  import sidebar from './components/layout/sidebar'
  import cantent from './components/layout/cantent'

  export default {
    name: "Mew-Soysia",
    components:{
      headbar,sidebar,cantent
    },

  }
</script>
<style lang="scss">
#Mew-Soysia{
  --headbarHeight:64px;
  --sidebarWidth:220px;
  --wrapperWidth:1200px;
  --cantentGap:20px;
  height: 100vh;
}

</style>
