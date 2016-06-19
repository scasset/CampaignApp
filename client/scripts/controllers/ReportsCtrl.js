angular
  .module('CapmaignApp')
  .controller('ReportsCtrl', ReportsCtrl);

function ReportsCtrl ($scope, $meteor, $state) {
 
 
		$scope.labels = ["Facebook", "Think of living", "instagram", "Google Ad", "Gold Traders", "bangkok biz news", "Email"];
		$scope.series = ['Visit', 'Goal'];
		    $scope.data = [
		[2, 1.5, 1.2, 0.6, 2, 1, 3] 
    ];
		$scope.dataGoal = [
			[65, 59, 80, 81, 56, 65, 82]
    ];
		$scope.options =  {
        tooltipTemplate: "<%= value %>",
        
        showTooltips: true,
        
        onAnimationComplete: function()
        {    
            this.showTooltip(this.datasets[0].bars, true);          
        },
        tooltipEvents: []
    };
 
	}




 

 

