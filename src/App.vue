<template>
  <div class="headerComponent">
    <Header @change="mudarAba"></Header>
  </div> 
  <div class="bodyComponent">
    <Body :mudar="abaSelecionada"></Body>
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
    data(){
      return{
        abaSelecionada: "",
      }      
    },
    methods:{
      mudarAba({aba}){
        if(aba == 'squad'){
          this.abaSelecionada = "squad"
        }
        else if(aba == 'user'){
          this.abaSelecionada = "user"
        }        
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
  padding-top: 65px;
}

body{
  background-color: #F9FAFC !important
}

</style>
 