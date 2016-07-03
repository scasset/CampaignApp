angular
  .module('CapmaignApp')
  .controller('CampaignsCtrl', CampaignsCtrl);

function CampaignsCtrl($scope, $reactive, $meteor, $state,$ionicSideMenuDelegate) {
  $reactive(this).attach($scope);

  this.helpers({

    Campaigns() {

      return Campaigns.find({}, { sort: { 'CampaignName': -1 } });
    }
  });
 this.sort = 1;
 $scope.sort = function () {
   if(this.sort == 1) {

   }else {
     
   }
   
  }
 
  $scope.NewCampaign = function () {
    // alert("new");
    var CampaignID = "NEW";
    $state.go('tab.campaigns.detail', { CampaignID }); //err
    // this.$state.go('tab.reports');
  }


function showError(message) {
 
   var myPopup = $ionicPopup.show({
      template: "<font color=red>" + message + "</font>",
      title: 'พบข้อผิดพลาด' ,
      scope: $scope,
      buttons: [
        { text: 'ตกลง' }
      ]
    }); 
}
  $scope.$on( "$ionicView.enter", function( scopes, states ) {
 
        if( states.stateName == "tab.campaigns.detail" ) {
 
               $ionicSideMenuDelegate.toggleLeft(true);
 
        }
    });
  //ลบจาก Slide list
  this.RemoveCampaign = function (objCam) {
    $scope.callMethod('RemoveCampaign', objCam, function (error, result) {
      if (error) {
       showError(error.reason);
      }  
    });
  }
}


