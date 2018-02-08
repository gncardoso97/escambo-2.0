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
                $rootScope.perfil = true;
                $rootScope.usuario = response.data;
                // console.log($scope.servicos);
            }, 
            function myError (response) {
                $scope.mensagem = "Usuário e/ou Senha incorreto! :("
                // console.log(response.statusText);
            });
    };

    $scope.salvarServico = function(servico){
        console.log(servico);
        servico._id = $rootScope.usuario._id + "." + servico.nome.trim().replace(" ","");
        servico.id_prestador = $rootScope.usuario._id;
        servico.disponivel = true;

        console.log("servico");
        $http ({
            method : "POST",
            url :"http://45.55.82.101:3000/api/servicos/criar",
            data: servico
        }).then(function mySuccess (response){
            $scope.formServico = false;
            $scope.sucesso = true;
            $scope.mensagemServico = "Serviço cadastrado com sucesso!";
            console.log("response servico: " + response);
            $scope.servico = {};
            // console.log($scope.servicos);
        }, 
        function myError (response) {
            $scope.mensagemServico = "Erro ao cadastrar :(";
            // console.log(response.statusText);
        });
        
    };

}])

//Add controller
app.controller('chatController', ['$scope', function($scope) {
  //Add default messages to object
  $scope.messages = [
      {text:'Oi! tudo bem? Terça dia 14 você vai estar disponível ? =D', from: 'message-remote'},
    //   {text:'Top of the morning to you governor.', from:'message-remote'}
  ];
  //Function to add message
  $scope.addMessage = function() {
    
    //Check if message is empty and stop function
    if($scope.chatText === '' || $scope.chatText === undefined ){
     //message empty focus input to write message
      angular.forEach(document.querySelectorAll('#message-input'), function(elem) { elem.focus(); });
      return false;
    }
    //message ok push message to $scope.messages
    $scope.messages.push({text:$scope.chatText , from:'message-local'});
      //reset input
      $scope.chatText = '';
  }
  //run addMessage on pressing enter.
  $scope.triggerSubmit = function() { $scope.addMessage(); }
  
  }])
//Add directive to handle enter key
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

