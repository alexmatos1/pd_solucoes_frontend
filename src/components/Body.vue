<template>
    <div class="listInfo">
        <div class="">
            <img src="../../public/Emoji.png" alt="">      
            <p class="text-info">Nenhuma squad cadastrada. Crie uma squad para começar.</p>   
        </div>
        <div>
            <button class="btn-create">Criar Squad</button>
        </div>
    </div>

    <div class="listInfo">
        <div class="">
            <img src="../../public/Emoji.png" alt="">      
            <p class="text-info">Nenhuma Usuário cadastrado. Crie um Usuário para começar.</p>   
        </div>
        <div>
            <button class="btn-create">Criar Usuário</button>
        </div>
    </div>

</template>

<script>
    export default{
        name: 'Header',
        data(){
            return{
              
            }
        },
        methods:{
            
        }
    }
</script>

<style>

.listInfo{
    height: 411px;
    width: 490px;
    left: 168px;
    top: 355px;
    border-radius: 12px;
    padding: 64px 32px 64px 32px;
    background-color: #FFF;
    text-align: center;
}

.text-info{
    color: #ACB5BD;
    font-size: 16px;
    margin-top: 20px;
}

.btn-create{
    width: 182px;
    height: 48px;
    background-color: #4263EB;
    color: #FFF;
    border-radius: 8px;
    border: none;
    margin-top: 70px;
    cursor: pointer;
}

.btn-create:hover{
    background-color: #5d7bf5;
}
</style>