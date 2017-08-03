angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats,$ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {


  //$scope.chats = Chats.all();

    $ionicLoading.show({
          template: 'Carregando...'
      }).then(function(){
          $scope.chats = [];
    });


    var ref = firebase.database().ref("/users").once("value",function(valor){
      $ionicLoading.hide().then(function(){
            $scope.chats= valor.val();
      });
  });
    
  });

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.add = function(){


    firebase.database().ref('/users').set(
    { 
       1: {username: 'Max',email: 'max@maxwell.com.br', profile_picture : 'http://lorempixel.com/400/200/sports/'}, 
        2: {username: 'Scott', email: 'lucky@mccoy.com.br', profile_picture : 'http://lorempixel.com/400/200/sports/'} 
                  
    }

    );
  }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
