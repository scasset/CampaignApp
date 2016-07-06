angular
  .module('CapmaignApp')
  .controller('MediasCtrl', MediasCtrl);

function MediasCtrl($scope, $reactive, $meteor, $state, $ionicSideMenuDelegate) {
  $reactive(this).attach($scope);
  this.helpers({

    Medias() {
      return Medias.find({}, { sort: { 'MediaName': -1 }} );
    }
  });
  $scope.NewMedia = function () {
    //  alert("new");
    var MediaID = "NEW";
    $state.go('tab.medias.detail', { MediaID }); //err
    //  this.$state.go('tab.medias.detail', { MediasID }); //err
  }


  $scope.$on("$ionicView.enter", function (scopes, states) {

    if (states.stateName == "tab.medias.detail") {

      $ionicSideMenuDelegate.toggleLeft(true);

    }
  });


  $scope.RemoveMedia = function (objMedia) {

 
      $scope.callMethod('RemoveMedia', objMedia, function (error, result) {
        // debugger;
        if (error) {
          alert('error:' + error.reason);

        } else {

          $scope.Media = {};


        }
      });

  
  }
}


