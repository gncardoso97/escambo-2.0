var app = angular.module('escambo', []);

app.controller('ServicosController', function($scope, $http){
    $scope.modalInfo = {};
    
    $http ({
            method : "GET",
            url :"http://45.55.82.101:3000/api/servicos",
            dataType: 'json'
        }).then(function mySucess (response){

            $scope.servicos = response.data;
            // console.log($scope.servicos);
        }, 
        function myError (response) {
            // console.log(response.statusText);
        });

        $scope.modal = function(servico){
            $scope.modalInfo = servico;
        }

    // $scope.dados = {};
    // $scope.tarefas = [];

    // //atribuição de funções ao $scope
    // $scope.inserirTarefa = function()
    // {
    //   var tarefa = {
    //       nome: $scope.dados.nome,
    //       feita: false
    //   };

    //   if(tarefa.nome != ""){
    //     $scope.tarefas.push(tarefa);
    //     $scope.dados.nome = "";
    // }
    // };

    // $scope.fazerTarefa = function(tarefa)
    // {
    //   tarefa.feita = true;
    // };

    // $scope.limparTarefas = function()
    // {
    //   //Remove todas as tarefas
    //   $scope.tarefas = [];
    // };

    // $scope.apagar = function(tarefa)
    // {
    //   //pega o index da tarefa
    //   var index = $scope.tarefas.indexOf(tarefa);
    //    //Remove a tarefa selecionada
    //   $scope.tarefas.splice(index, 1 );
    // };

});
