angular
  .module('CapmaignApp')
  .controller('CampaignsCtrl', CampaignsCtrl);

function CampaignsCtrl($scope, $reactive, $meteor, $state) {
  $reactive(this).attach($scope);
  //$scope.subscribe('Campaigns');
  // $scope.Campaigns = $scope.$meteorCollection(Campaigns, false);
  // $scope.Campaigns = Campaigns
  this.helpers({

    Campaigns() {
      return Campaigns.find({}, { sort: { 'CampaignName': -1 } });
    }
  });
$scope.Cam = [
/* 1 */
{
    "_id" : "k4vh4cxrpCR2Figa3",
    "CampaignName" : "2ddss",
    "CampaignCode" : "ssssss",
    "Status" : "A" 
    
}
,
{
    "_id" : "gPXBpZNNyNPQbEXew",
    "CampaignName" : "133dd",
    "CampaignCode" : "ssss",
    "Status" : "A", 
    "URL" : "นนนนน"
}

 


];

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
  $scope.NewCampaign = function () {
    // alert("new");
    var CampaignID = "NEW";
    $state.go('tab.campaigns.m', { CampaignID }); //err
    // this.$state.go('tab.reports');
  }




  $scope.remove = function (chat) {
    $scope.callMethod('removeChat', chat._id);
  }
}


