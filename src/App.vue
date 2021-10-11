<template>
    <div id="app">
      <div class="row mb-5">
        <div class="col-md-12 text-center head">
            <img src="https://www.tendencys.com/assets/images/logo.jpg" alt="" srcset="">
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script> 

export default {
  name: "App",
  components: {
    
  },
};
</script>

<style>
 .head{
       background: white;
    padding: 15px;
    border-bottom: 1px solid #e2e2e2;
 }
</style>
