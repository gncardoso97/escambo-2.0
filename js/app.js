var app = angular.module('escambo', []);

app.controller('ServicosController', function($scope){
    //declaração de variáveis
    $scope.servico = "oi"; 
    $scope.dados = {};
    $scope.tarefas = [];

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
