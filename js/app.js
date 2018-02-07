var app = angular.module('escambo', ['ngAnimate']);
app.run(['$rootScope',
function ($rootScope) {

   $rootScope.logado = false;
   $rootScope.usuario = {};

}]);

app.controller('ServicosController', ['$scope', '$rootScope', '$http',
function ($scope, $rootScope, $http){
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

}])

app.controller('CadastroController', ['$scope', '$rootScope','$http',
function ($scope, $rootScope, $http){
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
    
}])

app.controller('PerfilController', ['$scope', '$rootScope','$http',
function ($scope, $rootScope, $http){
    
    $scope.login = function(usuario){
        $http ({
                method : "POST",
                url :"http://45.55.82.101:3000/api/usuarios/login",
                data: usuario
            }).then(function mySucess (response){
                if(response.data._id == undefined || response.data._id == ""){
                    $scope.mensagem = "Usuário e/ou Senha incorreto! :(";
                    return;
                }
                
                $rootScope.logado = true;
                $rootScope.usuario = response.data;
                // console.log($scope.servicos);
            }, 
            function myError (response) {
                $scope.mensagem = "Usuário e/ou Senha incorreto! :("
                // console.log(response.statusText);
            });
    }

}])
