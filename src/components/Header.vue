<template>
    <div>
        <img class="img-ajust" src="img/pds-logo.png" alt="">

        <a class="text-ajust">Interface para lançamento de horas</a>       
    </div>
    <div>
        <h1 class="mainTitle">{{ titulo }}</h1>
        <button class="btn-ajust" @click="showReport()">Lançar horas</button>
    </div>
    <div class="bottom-header-btn">
        <button class="btn-aba" @click="$emit('change', {aba: 'squad'})">Squads</button>
        <button class="btn-aba" @click="$emit('change', {aba: 'user'})">Usuários</button>
    </div>

    <div v-if="showCreateReport" class="modal-create-report"> 
        <p class="title-report-create">Criar Lançamento</p>
        
        <div class="div-imput-report">
            <label class="label-report" for="cadastro">id do usuário</label>
            <br>
            <input type="number" name="cadastro" v-model="usuarioId" placeholder="Digite o ID do usuário">
        </div>
        <div class="div-imput-report">
            <label class="label-report" for="cadastro">Horas Gastas</label>
            <br>
            <input type="number" name="cadastro" v-model="horasGastas" placeholder="Digite a quantidade de Horas">
        </div>
        <div class="div-imput-report">
            <label class="label-report" for="cadastro">descrição</label>
            <br>
            <input type="text" name="cadastro" v-model="descricao" placeholder="Adicione uma descrição">
        </div>        
        
        <button class="btn-create" @click="createReport()">Criar lançamento</button>
    </div>
</template>

<script>
import axios from 'axios';
    export default{
        name: 'Header',
        emits:['change'],
        data(){
            return{
               titulo: "PD Hours",
               showCreateReport: false,
               usuarioId: 0,
               horasGastas: 0,
               descricao: ""
            }
        },
        methods:{
            showReport(){
                this.showCreateReport = !this.showCreateReport
            },

            async createReport(){
                let descricao = this.usuarioId
               let userId = this.horasGastas
               let horas = this.descricao

               let result = await axios.post(`/report`, {description: descricao, employeeId: userId, spentHours: horas});   
               
               if(result.status == 200){
                    this.usuarioId = 0
                    this.horasGastas = 0
                    this.descricao = ""
                    this.showCreateReport = false

                    alert("Lançamento criado com sucesso")
                }
                else{
                    alert("Erro ao criar Lançamento")
                }
            },
        }
    }
</script>


<style scoped>

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


input[type="text"] { 
    width: 350px;
    height: 100px;
    font-size: 20px;
    border-radius: 8px;
    border: 1px solid #DDE2E5;
}

input[type="number"] { 
    width: 350px;
    height: 56px;
    font-size: 20px;
    border-radius: 8px;
    border: 1px solid #DDE2E5;
}

.title-report-list{
    font-size: 28px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
}

.title-report-create{
    font-size: 38px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-bottom: 55px;
}

.text-report-list{
    color: #4263EB;
    font-size: 50px;
}

::placeholder {
  font-size: 21px;
  color: #DDE2E5;
  padding-left: 20px;
}

.modal-create-report{
    width: 414px;
    height: 396px;
    position: absolute;
    background-color: #FFF;
    text-align: center;
    margin-left: 540px;
    margin-top: 0px;
}

.div-imput-report{
    text-align: left; 
    margin-left: 7%;
}

.label-report{
    color: #ACB5BD; 
    font-size: 12px; 
    text-transform: uppercase; 
    font-weight: 500;
}

</style>