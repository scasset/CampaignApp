angular
  .module('CapmaignApp')
  .controller('CampaignReportCtrl', CampaignReportCtrl);

function CampaignReportCtrl ($scope, $reactive, $meteor,$stateParams, $state,$ionicHistory) {
 
    //  $scope.subscribe('Campaigns');
    $scope.SumBudget  = function (obj) { 
    
    return 22;
  
  }
    
 // $scope.Campaigns = $scope.$meteorCollection(Campaigns, false);
    $reactive(this).attach($scope);
    $scope.CampaignID =  $stateParams.CampaignID;
      this.CampaignID =  $stateParams.CampaignID;
   // alert(this.CampaignID);
  //  $scope.subscribe('Campaigns');
    $scope.labels = ["01/04", "02/04", "02/04", "03/04", "03/04", "03/04", "04/04", "05/04", "06/04"];
		$scope.series = ['Visit', 'Goal'];
		    this.dataVisit = [
          [65, 59, 80, 81, 56, 65, 82,19, 10, 31],
		[15/10, 19/10, 10/10, 31/10, 6/10, 5/10, 40/10,19/10, 10/10, 31/10] 
    ];
		$scope.dataGoal = [
			[65, 59, 80, 81, 56, 65, 82]
    ];
    
              this.helpers({

      Campaign() {
        return Campaigns.findOne(this.CampaignID);
      }
    });
    
          //  $scope.Campaign=    $scope.$meteorCollection(function () {
                  
          //            return Campaigns.find($scope.CampaignID);
          //          }, false);
  //$scope.Campaign =  Campaigns.findOne($scope.CampaignID );
  //alert($scope.CampaignID);
}
  