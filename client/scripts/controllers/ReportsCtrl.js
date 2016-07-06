angular
  .module('CapmaignApp')
  .controller('ReportsCtrl', ReportsCtrl);

function ReportsCtrl($scope, $meteor, $state) {

  $scope.labels = [];
  $scope.datas = [];
  $scope.visitDatas = [[]];
  $scope.goalDatas = [];
 
  $scope.series = ['Visit', 'Goal'];
  $scope.callMethod('MediaReport', 99, function (error, result) {

    if (error) {
      alert('error:' + error.reason);

    } else {
      $scope.testResult = result;
      visits = [];
      goals = [];
      labels = [];
      //   debugger;
      tmpMedias = _.sortBy(result, function (media) { return media.CostPerVisit; })
      var totalVisit = 0;
      for (i in result) {
        data = result[i];
        media = Medias.findOne({MediaCode:data._id.MediaCode});
     //   debugger;
        if(media) {
         labels[i] = media.MediaName;
        } else {
            labels[i] = data.MediaName;
        }
        visits[i] = data.CostPerVisit.toFixed(2);
        goals[i] = data.CostPerGoal.toFixed(2);
        totalVisit += data.TotalActualVisit;
        // visits[i] = (data.TotalBudgetExpense / data.TotalActualVisit).toFixed(2);
        // goals[i] = (data.TotalBudgetExpense  / data.TotalActualGoal).toFixed(2);
        //  debugger;
      }
      var tmpVisitByMedia = [];
      for (i in result) {
        data = result[i];
        tmpVisitByMedia[i] = Math.round((data.TotalActualVisit / totalVisit) * 100);

        //  debugger;
      }
      //  $scope.VisitByMedia = [54,46];
      $scope.VisitByMedia = tmpVisitByMedia;
      $scope.datas = [visits, goals];
      //*$scope.visitDatas = [10,20];
      $scope.visitDatas = [visits];
      $scope.goalDatas = [goals];
      $scope.labels = labels;
      // debugger;
      // alert(result);
    }
  });
  // $scope.LabelVisitByMedia = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  //$scope.VisitByMedia = [54,46];



  //	$scope.labels = ["Facebook", "Think of living", "instagram", "Google Ad", "Gold Traders", "bangkok biz news", "Email"];

		//     $scope.data = [
		// [2, 1.5, 1.2, 0.6, 2, 1, 3] 
  // ];
		// $scope.dataGoal = [
		// 	[65, 59, 80, 81, 56, 65, 82]
  // ];

 

  $scope.options3 = {
    tooltipTemplate: "<%= value %>",
    showTooltips: true,

    onAnimationComplete: function () {
      //  this.showTooltip(this.datasets[1].bars, true);   


      var ctx = this.chart.ctx;
      ctx.font = this.scale.font;
      ctx.fillStyle = this.scale.textColor
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      this.datasets.forEach(function (dataset) {
        dataset.points.forEach(function (bar) {
          ctx.fillText(bar.value, bar.x, bar.y - 5);
        });
      })
    },
    tooltipEvents: []
  };

		$scope.optionsBar = {
    tooltipTemplate: "<%= value %>",


    showTooltips: true,

    onAnimationComplete: function () {
      //  this.showTooltip(this.datasets[1].bars, true);   


      var ctx = this.chart.ctx;
      ctx.font = this.scale.font;
      ctx.fillStyle = this.scale.textColor
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      this.datasets.forEach(function (dataset) {
        dataset.bars.forEach(function (bar) {
          ctx.fillText(bar.value, bar.x, bar.y - 5);
        });
      })
    },
    tooltipEvents: []
  };
  $scope.optionBar1 = {
//scaleFontSize: 5,
    tooltipTemplate: "<%= value %>",

    showTooltips: true,

    onAnimationComplete: function () {
      this.showTooltip(this.datasets[0].bars, true);
    },
    tooltipEvents: []
  };
  $scope.option2 = {

    tooltipTemplate: "<%= value %>",
    showTooltips: true,

    onAnimationComplete: function () {
      this.showTooltip(this.segments, true);
    },
    tooltipEvents: []
  };

}








