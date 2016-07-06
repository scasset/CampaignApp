
angular
  .module('CapmaignApp')
  .controller('MediaCtrl', MediaCtrl);

function MediaCtrl($meteor, $scope, $reactive, $stateParams, $ionicActionSheet, $state, $timeout, $ionicScrollDelegate, $ionicPopup, $ionicHistory, $ionicSideMenuDelegate, $ionicLoading) {

  $reactive(this).attach($scope);

  //  alert($scope.currentUser.username);
  console.dir($stateParams);
  //$reactive($scope).attach($scope);
  $scope.MediaID = $stateParams.MediaID;


  $scope.TestReport = function () {

    $scope.testResult = {};
    $scope.callMethod('SaleGroup', 99, function (error, result) {

      if (error) {
        alert('error:' + error.reason);

      } else {
        $scope.testResult = result;
        alert(result);
      }
    });

  }
  $scope.SaveMediaFile = function (objMedia) {

    Meteor.call('retrieveMedia', function (err, res) {

      window.open("data:application/pdf;base64, " + res);
    });

  }

  function showError(message) {

    var myPopup = $ionicPopup.show({
      template: "<font color=red>" + message + "</font>",
      title: 'พบข้อผิดพลาด',
      scope: $scope,
      buttons: [
        { text: 'ตกลง' }
      ]
    });
  }

  this.SaveMedia = function (objMedia) {

    this.callMethod('SaveMedia', angular.copy(objMedia), function (error, result) {

      if (error) {
        showError(error.reason);
        //  $ionicLoading.show({ template: error.reason, noBackdrop: true, duration: 500 });
      } else {
        this.MediaID = result;
        var MediaID = this.MediaID;

        $state.go('tab.medias.detail', { MediaID });
      }
    });

  }



  $scope.RemoveMedia = function (objMedia) {
    if (window.confirm('ยืนยันลบข้อมูล')) {
    $scope.callMethod('RemoveMedia', objMedia, function (error, result) {

      if (error) {
        alert('error:' + error.reason);

      } else {

        $scope.Media = {};


      }
    });
    }
  }



  console.log("id:" + $scope.MediaID);

  if ($scope.MediaID == "NEW") {

    this.Media = { Status: 'A' };
  } else {

    TempMedia = Medias.findOne($scope.MediaID);
    if (!TempMedia) {

      this.Media = { Status: 'A' };

    } else {
      console.log("Find:" + $scope.MediaID);
      this.MediaID = $scope.MediaID;

      this.helpers({

        Media() {
          return Medias.findOne(this.MediaID);
        }
      });
    }


  }



  var thisCtrl = this;



}



