<template>
    <div>
        <img class="img-ajust" src="../../public/pds-logo.png" alt="">

        <a class="text-ajust">Interface para lançamento de horas</a>       
    </div>
    <div>
        <h1 class="mainTitle">{{ titulo }}</h1>
        <button class="btn-ajust">Lançar horas</button>
    </div>
    <div class="bottom-header-btn">
        <button class="btn-aba" @click="$emit('change')">Squads</button>
        <button class="btn-aba">Usuários</button>
    </div>
</template>

<script>
    export default{
        name: 'Header',
        emits:['change'],
        data(){
            return{
               titulo: "PD Hours"
            }
        }
    }
</script>


<style>

.img-ajust{
    margin-top: 14px;
}

.text-ajust{
    float: right;
    margin-top: 24px;
    color: #ACB5BD;   
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

.btn-ajust:hover{
    background-color: #5d7bf5;
}

.btn-ajust{
    width: 182px;
    height: 48px;
    background-color: #4263EB;
    color: #FFF;
    border-radius: 8px;
    border: none;
    float: right;
    margin-right: 10px;
    margin-top: 70px;
    cursor: pointer;
}


.mainTitle{
    position: absolute;
    width: 217px;
    height: 59px;
    top: 70px;    
    font-weight: 500;
    font-size: 50px;
    line-height: 59px;

    color: #212429;
}

.bottom-header-btn{
    margin-top: 138px;    
}

.btn-aba{
    background-color: #FFF;
    border: none;
    color: #ACB5BD;
    padding-bottom: 13px;
    font-size: 16px;
    margin-right: 10px;
}

.btn-aba:hover{
    border-bottom: 5px solid #4263EB;
    cursor: pointer;
}
</style>