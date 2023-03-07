<template>
  <div class="headerComponent">
    <Header @change="mudarAba"></Header>
  </div> 
  <div class="bodyComponent">
    <Body></Body>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Body from './components/Body.vue';

  export default{
    name: 'App',
    components:{
      Header,
      Body
    },    
    methods:{
      mudarAba(){
        console.log("mudando aba");
      }
    }
  }
</script>

<style>
/* #app{
  
} */

.headerComponent{
  height: 235px;
  padding-left: 160px;
  padding-right: 160px;
  border-bottom: 1px solid #DDE2E5; 
  background-color: #FFF;
}

.bodyComponent{
  padding-left: 160px;
  padding-right: 160px;
  padding-top: 120px;
}

body{
  background-color: #F9FAFC !important
}

</style>
 