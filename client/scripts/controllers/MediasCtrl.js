angular
  .module('CapmaignApp')
  .controller('MediasCtrl', MediasCtrl);

function MediasCtrl($scope, $reactive, $meteor, $state,$ionicSideMenuDelegate) {
  $reactive(this).attach($scope);
  //$scope.subscribe('Campaigns');
  // $scope.Campaigns = $scope.$meteorCollection(Campaigns, false);
  // $scope.Campaigns = Campaigns
  this.helpers({

    Medias() {
      return Medias.find({}, {  });
    }
  });
 

// $scope.updated = 0;
//     var watcher = $scope.$watch('Cam',function(newVal,oldVal){
//         $scope.updated++;
//     });
//       watcher();

//     $scope.stop = function(){
//        watcher();
//       alert('stop');
//     };
  //  $scope.Campaigns =    $scope.$meteorCollection(function () {

  //                    return Campaigns.find( {});
  //                  }, false);
  //  debugger;
      var cc=0;
  this.TestRender = function () {
//    debugger;
cc++;
  //  console.log("cc=" + cc);
    // this.$state.go('tab.reports');
  }
 $scope.NewMedia = function () {
    //  alert("new");
    var MediaID = "NEW";
   $state.go('tab.medias.detail', { MediaID }); //err
   //  this.$state.go('tab.medias.detail', { MediasID }); //err
  }


  $scope.$on( "$ionicView.enter", function( scopes, states ) {
 
        if( states.stateName == "tab.medias.detail" ) {
 
               $ionicSideMenuDelegate.toggleLeft(true);
 
        }
    });
  
 
  $scope.RemoveMedia = function (objMedia) {
    //alert("remove");
    // var tmpCam;
    // tmpCam =angular.copy(campaign );
    //  debugger;
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


