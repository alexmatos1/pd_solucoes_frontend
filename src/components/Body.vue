<template>   
    <h2 v-if="mudar=='squad'">Lista de Squads</h2>      
    <h2 v-if="mudar=='user'">Lista de Usuários</h2>      

    <div v-if="mudar=='squad' && !squadHours" class="listInfo">
        <div v-if="!haveSquad" class="">
            <img src="img/Emoji.png" alt="">      
            <p class="text-info">Nenhuma squad cadastrada. Crie uma squad para começar.</p>   
        </div>
        <div v-else>      
            <table class="table" cellspacing="0">
                <tr class="titulo">
                    <th class="squad-table-left">ID</th>
                    <th>Nome</th>
                    <th class="squad-table-right"></th>
                </tr>
                <tr class="tableData" v-for="(squad, index) in allSquad" :key="squad.id">
                    <td>{{ squad.id }}</td>
                    <td>{{ squad.name }}</td>                   
                    <td><button class="btn-table" @click="squadSelected(squad.id)">Visitar Squad</button></td>
                </tr>
            </table>
        </div>
        <div>
            <button class="btn-create" @click="squadShow()">Criar Squad</button>
        </div>
    </div>

    <div v-if="mudar == 'user' && !squadHours" class="listInfo">
        <div v-if="!haveEmployee">
            <img src="img/Emoji.png" alt="">      
            <p class="text-info">Nenhuma Usuário cadastrado. Crie um Usuário para começar.</p>   
        </div>
        <div v-else>
            <table class="table" cellspacing="0">
                <tr class="titulo">
                    <th class="user-table-left">Nome</th>
                    <th >Horas</th>
                    <th class="user-table-right">Squad ID</th>
                </tr>
                <tr class="tableData" v-for="(employee, index) in allEmployee" :key="employee.id">
                    <td class="user-table-left">{{ employee.name }}</td>
                    <td>{{ employee.estimatedHours }}</td>
                    <td>{{ employee.squadId }}</td>
                </tr>
            </table>
        </div>
        <div>
            <button class="btn-create2" @click="userShow()">Criar Usuário</button>
        </div>
    </div>

    <div v-if="squadHours" class="listSquad">
        <div v-if="!haveEmployee">
            <img src="img/Emoji.png" alt="">      
            <p class="text-info">Nenhuma Usuário cadastrado. Crie um Usuário para começar.</p>   
        </div>
        <div v-else>            
            <input type="date" name="" id="" v-model="dataInicial">
            <input type="date" name="" id="" v-model="dataFinal">
            <button class="btn-filtro" @click="listSquadTime(squadId)">Filtrar por data</button>

            <p class="title-squad-list">Horas por membro</p>

            <table class="table" cellspacing="0">
                <tr class="titulo">
                    <th class="list-table-left">Membro</th>
                    <th class="list-table-middle">Descrição</th>
                    <th>Horas</th>
                    <th class="list-table-right">Criado em</th>
                </tr>
                <tr class="tableData" v-for="(stime, index) in squadTime" :key="index">
                    <td class="list-table-left">{{ stime.name }}</td>
                    <td>{{ stime.description }}</td>
                    <td>{{ stime.spentHours }}</td>
                    <td>{{ stime.createdAt }}</td>
                </tr>
            </table>

            <div v-if="quantidade > 0">
                <p class="title-squad-list">Horas totais da Squad</p>
                <p class="text-squad-list">{{ squadTotal.squadHours<=1 ? squadTotal.squadHours+" Hora": squadTotal.squadHours+" Horas"}}</p>
            </div>
            <div v-if="quantidade > 0">
                <p class="title-squad-list">Média de horas por dia</p>
                <p class="text-squad-list">{{ (squadTotal.squadHours/quantidade)<=1 ? (squadTotal.squadHours/quantidade)+" Hora/Dia": (squadTotal.squadHours/quantidade)+" Horas/Dia"}}</p>
            </div>
        </div>
        <div>
            <button class="btn-create" @click="userShow()">Adicionar Usuário</button>
        </div>
    </div>

    <div v-if="showCreateSquad" class="modal-create-squad">
        <p class="title-squad-create">Criar Squad</p>
        <div class="div-imput-squad">
            <label class="label-squad" for="cadastro">nome da squad</label>
            <br>
            <input type="text" name="cadastro" v-model="nomeSquad" placeholder="Digite o nome da squad">
        </div>
        
        <button class="btn-create" @click="createSquad()">Criar squad</button>
    </div>


    <div v-if="showCreateUser" class="modal-create-user">
        <p class="title-squad-create">Criar Usuário</p>
        <div class="div-imput-squad">
            <label class="label-squad" for="cadastro">Nome do usuário</label>
            <br>
            <input type="text" name="cadastro" v-model="nomeUsuario" placeholder="Digite o nome do usuário">
        </div>
        <div class="div-imput-squad">
            <label class="label-squad" for="cadastro">Horas estimadas de trabalho</label>
            <br>
            <input type="number" name="cadastro" v-model="horasEstimadas" placeholder="Digite a quantidade de Horas">
        </div>
        <div class="div-imput-squad">
            <label class="label-squad" for="cadastro">Squad</label>
            <br>
            <input type="number" name="cadastro" v-model="idSquad" placeholder="Digite o ID da squad">
        </div>        
        
        <button class="btn-create" @click="createUser()">Criar usuário</button>
    </div>

</template>

<script>
import axios from 'axios';

    export default{
        name: 'Header',
        props:{
            mudar: String
        },
        data(){
            return{
               allSquad:[],
               allEmployee:[],
               squadTime:[],
               haveSquad: false,
               haveEmployee: false,
               tituloAba: "",
               squadHours: false,
               squadId: 0,
               dataInicial:"",
               dataFinal:"",
               quantidade: 0,
               squadTotal:{},
               nomeSquad: "",
               showCreateSquad: false,
               showCreateUser: false,
               nomeUsuario: "",
               horasEstimadas: 0,
               idSquad: 0

            }
        },
        methods:{
           async getSquads(){
                let results = await axios.get('/squad');
                this.allSquad = results.data;

                if(results.data.length > 0){
                    this.haveSquad = true
                    this.tituloAba = "Lista de Squads"
                }

            },
            
            async getEmployee(){
                let results = await axios.get('/employee');
                this.allEmployee = results.data;

                if(results.data.length > 0){
                    this.haveEmployee = true
                    this.tituloAba = "Lista de Usuários"
                }

            },

            squadSelected(id){
                this.squadId = id
                this.squadHours = true;
                this.showCreateSquad = false
                this.showCreateUser = false
            },

            async listSquadTime(id){
                this.quantidade = 0;
                let dataInicio = this.dataInicial;
                let dataFim = this.dataFinal;

                let results = await axios.post(`/reportList/${id}/${dataInicio}/${dataFim}`);
                this.squadTime = results.data;

                this.quantidade = results.data.length

                this.squadTotalTime(id)
            },

            async squadTotalTime(id){
          
                let results = await axios.post(`/squadTime/${id}`);
                this.squadTotal = results.data[0];                
            },

            async createSquad(){
                let nome = this.nomeSquad
                this.showCreateUser = false
                let result = await axios.post(`/squad`, {name: nome}); 
              

                if(result.status == 200){
                    this.nomeSquad = ""
                    this.showCreateSquad = false

                    alert("Squad criado com sucesso")
                }
                
            },

            async createUser(){
                let nome = this.nomeUsuario
               let horas = this.horasEstimadas
               let squadId = this.idSquad
               this.showCreateSquad = false

               let result = await axios.post(`/employee`, {name: nome, estimatedHours: horas, squadId: squadId});   
               
               if(result.status == 200){
                this.nomeUsuario = ""
                this.horasEstimadas = 0
                this.idSquad = 0
                this.showCreateUser = false
                    alert("Usuário criado com sucesso")
                }
            },

            squadShow(){
                this.showCreateSquad = !this.showCreateSquad
                this.showCreateUser = false
            },

            userShow(){
                this.showCreateUser = !this.showCreateUser
                this.showCreateSquad = false
            }
           
        },     
        mounted() {
            this.getSquads();
            this.getEmployee();
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

.listSquad{
    height: 788px;
    width: 100%;
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

.btn-create2{
    width: 182px;
    height: 48px;
    background-color: #4263EB;
    color: #FFF;
    border-radius: 8px;
    border: none;
    margin-top: 20px;
    cursor: pointer;
}

.btn-create2:hover{
    background-color: #5d7bf5;
}


.table{
    width: 100%; 
}

.btn-table{
    width: 122px;
    height: 33px;
    background-color: #4263EB;
    color: #FFF;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}

.btn-create:hover{
    background-color: #5d7bf5;
}

.titulo{
    background-color: #4263EB;
    color: #FFF;
    border-top-right-radius: 5px ;
    border-top-left-radius: 5px;
    font-size: 16px;
    font-weight: 700;
}

.titulo th{
    border: none;
    font-size: 16px;
    font-weight: 700;
}

.tableData{
    background: #fafafa !important;
    border: none !important;
    height: 43px;
}
tr td{
    border-bottom: 1px solid #dcdcdc !important;
}

.squad-table-left{
    border-top-left-radius: 5px !important;
    width: 15%;
}

.squad-table-right{
    border-top-right-radius: 5px !important;
    width: 40%;
}

.user-table-left{
    border-top-left-radius: 5px !important;
    width: 60%;
    text-align: left;
    padding-left: 10px;
}

.user-table-right{
    border-top-right-radius: 5px !important;
    width: 20%;
}

.list-table-left{
    width: 30%;
    border-top-left-radius: 5px !important
}

.list-table-middle{
    width: 40%;
}

.list-table-right{
    width: 15%;
    border-top-right-radius: 5px !important
}

h2{
    font-weight: 500;
    font-size: 38px;
    margin-bottom: 30px;
}

.btn-filtro{
    width: 182px;
    height: 40px;
    background-color: #4263EB;
    color: #FFF;
    border-radius: 8px;
    border: none;
    margin-top: 70px;
    cursor: pointer;    
}

.btn-filtro:hover{
    background-color: #5d7bf5;
}

input[type="date"] { 
  background: transparent;  
  height: 40px;
  border-radius: 8px;
  border: 1px solid #DDE2E5;
  margin-right: 10px;
}

input[type="text"] { 
    width: 350px;
    height: 56px;
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

.title-squad-list{
    font-size: 28px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
}

.title-squad-create{
    font-size: 38px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-bottom: 55px;
}

.text-squad-list{
    color: #4263EB;
    font-size: 50px;
}

::placeholder {
  font-size: 21px;
  color: #DDE2E5;
  padding-left: 20px;
}

.modal-create-squad{
    width: 414px;
    height: 396px;
    position: absolute;
    background-color: #FFF;
    text-align: center;
    margin-left: 540px;
    margin-top: -425px;
}

.modal-create-user{
    width: 414px;
    height: 618px;
    position: absolute;
    background-color: #FFF;
    text-align: center;
    margin-left: 540px;
    margin-top: -425px;
}

.div-imput-squad{
    text-align: left; 
    margin-left: 7%;
}

.label-squad{
    color: #ACB5BD; 
    font-size: 12px; 
    text-transform: uppercase; 
    font-weight: 500;
}

</style>