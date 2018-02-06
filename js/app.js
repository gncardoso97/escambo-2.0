var app = angular.module('escambo', ['ngAnimate']);

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

})

app.controller('CadastroController', function($scope, $http){
    $scope.showServico = false;
    $scope.showUsuario = true;
    $scope.nome = "";

    $scope.salvarUsuario = function(usuario){
        $scope.nome = usuario._id;

        $http ({
            method : "POST",
            url :"http://45.55.82.101:3000/api/usuarios/criar",
            data: usuario
        }).then(function mySuccess (response){
            $scope.showUsuario = false;
            $scope.showServico = true;
            console.log("response sucess: " + response);
            $scope.servicos = response.data;
            // console.log($scope.servicos);
        }, 
        function myError (response) {
            // console.log(response.statusText);
        });
        
    };

    $scope.salvarServico = function(servico){
        
        servico._id = $scope.usuario._id + "." + servico.nome.trim().replace(" ","");
        servico.id_prestador = $scope.usuario._id;
        servico.disponivel = true;

        console.log("servico");
        $http ({
            method : "POST",
            url :"http://45.55.82.101:3000/api/servicos/criar",
            data: servico
        }).then(function mySuccess (response){
            $scope.showServico = false;
            $scope.sucesso = true;
            $scope.mensagem = "Serviço cadastrado com sucesso!";
            console.log("response servico: " + response);
            $scope.servicos = response.data;
            // console.log($scope.servicos);
        }, 
        function myError (response) {
            // console.log(response.statusText);
        });
        
    };
    
});
