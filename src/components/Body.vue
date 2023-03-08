<template>   
    <h2 v-if="mudar=='squad'">Lista de Squads</h2>      
    <h2 v-if="mudar=='user'">Lista de Usuários</h2>      

    <div v-if="mudar=='squad'" class="listInfo">
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
                    <td><button class="btn-table">Visitar Squad</button></td>
                </tr>
            </table>
        </div>
        <div>
            <button class="btn-create">Criar Squad</button>
        </div>
    </div>

    <div v-if="mudar == 'user'" class="listInfo">
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
                    <!-- <td><button class="btn-table">Visitar Squad</button></td> -->
                </tr>
            </table>
        </div>
        <div>
            <button class="btn-create">Criar Usuário</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { stringifyExpression } from '@vue/compiler-core';

    export default{
        name: 'Header',
        props:{
            mudar: String
        },
        data(){
            return{
               allSquad:[],
               allEmployee:[],
               haveSquad: false,
               haveEmployee: false,
               tituloAba: "",

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


h2{
    font-weight: 500;
    font-size: 38px;
    margin-bottom: 30px;
}
</style>