
angular
  .module('CapmaignApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $state) {
      var cc=0;
  //.fetch()
  //$scope.Campaigns = $scope.$meteorCollection(Campaigns, false);
 

  $scope.Campaigns = $scope.$meteorCollection(function () {
    console.log("Refresh Campaigns home")
    return Campaigns.find({});
  }, false);
  $scope.SumBudget2 = function () {
    console.log("SumBudget2");
  }
  $scope.SumBudget = function (campaign, sumResult) {
    cc++;
    console.log("cc2=" + cc);

    //console.log("SumBudget" + campaign.CampaignCode); 
    //         var result = Campaigns.aggregate(
    //      [ { $unwind : "$Medias" },
    //        {
    //          $group : {
    //              _id : { _id: '$_id' }, 
    //             TotalGoal: { $sum: "$Medias.BudgetExpense" } 
    //           }
    //         }
    //      ]
    //   )
    //debugger;
    sumResult = {
      BudgetExpense: 0,
      BudgetVisit: 0,
      BudgetGoal: 0,
      ActualVisit: 0,
      ActualGoal: 0
    }
    if (campaign.Medias) {
      campaign.Medias.forEach(media => {
        sumResult.BudgetExpense += media.BudgetExpense;
        sumResult.BudgetVisit += media.BudgetVisit;
        sumResult.BudgetGoal += media.BudgetGoal;
        sumResult.ActualVisit += media.ActualVisit ? media.ActualVisit : 0;
        sumResult.ActualGoal += media.ActualGoal ? media.ActualGoal : 0;
      });
      //campaign.x = sumResult.BudgetVisit;

    }
    return sumResult;
    // return 1;

  }


  this.TestRender = function () {
//    debugger;
cc++;
    console.log("cc=" + cc);
    // this.$state.go('tab.reports');
  }

  $scope.FormatNumber = function (i) {

    return Math.round(i);

  }



}

