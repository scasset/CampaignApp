angular
  .module('CapmaignApp')
  .controller('CampaignReportCtrl', CampaignReportCtrl);

function CampaignReportCtrl($scope, $reactive, $meteor, $stateParams, $state, $ionicHistory) {

  // Meteor.subscribe('ReportByMedia');
  //   this.helpers({
  //   ReportByMedia() {
  // return Posts.find();

  //   }

  //  $scope.subscribe('Campaigns');
  $scope.SumBudget = function (obj) {

    return 22;

  }
  this.GetLabel = function (stats) {
    // for()
    var labels = ["01/04", "02/04", "02/04"];

    return labels;

  }
  this.GetData = function (stats) {
    var datas = [
      [65, 59, 80],
      [15 / 10, 19 / 10, 10 / 10]
    ];

    return datas;

  }

  // $scope.Campaigns = $scope.$meteorCollection(Campaigns, false);
  $reactive(this).attach($scope);
  $scope.CampaignID = $stateParams.CampaignID;
  this.CampaignID = $stateParams.CampaignID;
  // alert(this.CampaignID);
  //  $scope.subscribe('Campaigns');
  this.labels = ["01/04", "02/04", "02/04", "03/04", "03/04"];
		this.series = ['Visit', 'Goal'];
  this.dataVisit = [
    [65, 59, 80, 81, 22],
    [1, 2, 3, 4, 3]
  ];
  this.dataVisit1 = [
    [
      10,
      10,
      8,
      60,
      12
    ],
    [
      5,
      5,
      2,
      8,
      8
    ]
  ];
		this.dataGoal = [
    [65, 59, 80, 81, 56, 65, 82]
  ];

  //   $scope.$meteorSubscribe('Medias').then(function () {
  //   $scope.rep = $scope.$meteorCollection(function () {
  //     return Medias.find({});
  //   }, false);
  // });


  $scope.$meteorSubscribe('Medias');
  //     $scope.rep = $scope.$meteorCollection(ReportByMedia);

  // //   $scope.rep = 112;
  //  $scope.$meteorSubscribe('Medias').then(function() {
  // //    This swill get you the articles from the local collection
  //    this.articles =$scope.$meteorCollection(Medias);

  //   //  then you need to get the related Categories for the articles
  //     $scope.getCategories = function(article) {
  //         return $scope.$meteorObject(Categoris, article._id);
  //     }
  // });


  Meteor.subscribe('ReportByMedia');
  //      $scope.rep = $scope.$meteorCollection(function () {
  //         return ReportByMedia.find({});
  //      }, false);


  // this.helpers({

  //   articles() {
  //     return Medias.find({});
  //   }
  // });
  $scope.optionsLine = {
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
         // debugger;
          if (bar.y < 15) {
            ctx.fillText(bar.value, bar.x + 10, bar.y + 10);
          } else {
            ctx.fillText(bar.value, bar.x, bar.y + -5);
          }

          //  ctx.fillText(bar.value, bar.x, bar.y - 5);
        });
      })
    },
    tooltipEvents: []
  };
  this.helpers({

    Campaign() {
      return Campaigns.findOne(this.CampaignID);
    },
    Medias() {
      return Medias.find({});
    }


    ,
    c() {

      return ReportByMedia.find({})
    }
  });

  //  $scope.Campaign=    $scope.$meteorCollection(function () {

  //            return Campaigns.find($scope.CampaignID);
  //          }, false);
  //$scope.Campaign =  Campaigns.findOne($scope.CampaignID );
  //alert($scope.CampaignID);
}
