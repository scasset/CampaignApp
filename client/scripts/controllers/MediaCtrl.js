
angular
  .module('CapmaignApp')
  .controller('MediaCtrl', MediaCtrl);

function MediaCtrl($meteor, $scope, $reactive, $stateParams, $ionicActionSheet, $state, $timeout, $ionicScrollDelegate, $ionicPopup, $ionicHistory, ionicDatePicker,$ionicSideMenuDelegate) {
  // $ionicHistory.nextViewOptions({
  //   disableAnimate: true,
  //   disableBack: true
  // });
  //$reactive(this).attach($scope);

  $reactive(this).attach($scope);

  //  alert($scope.currentUser.username);
  console.dir($stateParams);
  //$reactive($scope).attach($scope);
  $scope.MediaID = $stateParams.MediaID;
  //  alert($scope.MediaID);
 
  $scope.SaveMedia2 = function (objCam) {
    var MediaID = '55mNtrpAYtcJ4GJQu';
    // alert(MediaID);
    //    alert(MediaID);
    $state.go('tab.media', { MediaID });
  }
  $scope.TestReport = function () {
    // alert("Save1");
    // var tmpCam;
    // tmpCam =angular.copy(media );
    //  debugger;
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
  $scope.SaveMediaFile = function (objCam) {

    Meteor.call('retrieveMedia', function (err, res) {
      // debugger;
      window.open("data:application/pdf;base64, " + res);
    });

  }

    this.SaveMedia = function (objCam) {
     // alert("Save1");
      // var tmpCam;
      // tmpCam =angular.copy(media );
      //  debugger;
      this.callMethod('SaveMedia', angular.copy(objCam), function (error, result) {
        
        if (error) {
          alert('error:' + error.reason);

        } else {
          this.MediaID = result;
          var MediaID = this.MediaID;
          
        // var  MediaID = '55mNtrpAYtcJ4GJQu';
         // alert(MediaID);
          //this.$state.go('tab.media',{MediaID}); // ok
       //   $state.go('tab.medias.m',{MediaID});
        }
      });

    }
    
  $scope.SaveMediaScope = function (objCam) {
    //$scope.SaveMedia = function (objCam) {
    //alert("Save1");
    // var tmpCam;
    //tmpCam =angular.copy($scope.Media );
    //debugger;
    // $meteor.call('checkTwitter', {}, function (error, result) {

    Meteor.call('SaveMedia', angular.copy(objCam), function (error, result) {
      // alert(result);
      if (error) {
        console.log('failed', err);
      } else {
        $scope.MediaID = result;
        var MediaID = $scope.MediaID;

        // var  MediaID = '55mNtrpAYtcJ4GJQu';
        // alert(MediaID);
        //$scope.$state.go('tab.media',{MediaID}); // ok
        //  $scope.Media = { Status: 'A', Medias: [{}] };
        //  debugger;
        if ($stateParams.MediaID == "NEW") {
          $scope.Media = { Status: 'A', Medias: [{}] };

        }
//        $state.go('tab.medias.m', { MediaID });

      }
    });


  }
  $scope.RemoveMedia = function (objCam) {
    // alert("Save1");
    // var tmpCam;
    // tmpCam =angular.copy(media );
    //  debugger;
    $scope.callMethod('RemoveMedia', objCam, function (error, result) {
      // debugger;
      if (error) {
        alert('error:' + error.reason);

      } else {
        var Media = Medias.findOne();
        if (Media) {
          var MediaID = Medias.findOne()._id;
          $state.go('tab.medias.m', { MediaID });



        } else {
          $scope.Media = {};
        }
        //$state.go('tab.medias');
        // alert(result);
      }
    });

  }


  $scope.RemoveMedia = function (media, index) {

    media.Medias.splice(index, 1);


  }
  $scope.NewMedia = function (media) {
    var newMedia = {};
    media.Medias.splice(media.Medias.length, 0, newMedia);
    $timeout(() => {
      $scope.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
    //   delete media.Medias[index];
    //  alert(index);

  }




  //  var myPopup = $scope.$ionicPopup.show({
  //     template: '<textarea  rows="2" cols="80" style="height:50px" onclick="$scope.select()">xxxx'   + "</textarea>",
  //     title: 'URL Add Google Analytic',
  //     subTitle: 'Please select all and copy.',
  //     //scope: $scope,
  //     buttons: [
  //       { text: 'Cancel' } 
  //     ]
  //   });
  // $scope.currMedia= {};

  // this.data = Medias.findOne($scope.mediaId);
  console.log("id:" + $scope.MediaID);

  if ($scope.MediaID == "NEW") {

    this.Media = { Status: 'A', Medias: [{}] };
    // $scope.data = $scope.$meteorCollection(Chats, false);
  } else {
    //  debugger;
    TempMedia = Medias.findOne($scope.MediaID);
    if (!TempMedia) {

     this.Media = {};
       //  alert("Clear")
      //        debugger;




      //      $scope.Media = {};
    } else {
    console.log("Find:" +  $scope.MediaID);
    this.MediaID = $scope.MediaID;
   // $scope.Media=Medias.findOne($scope.MediaID);
      //  $scope.Media=    $scope.$meteorCollection(function () {
                  
      //                return Medias.find($scope.MediaID);
      //              }, false);
      
          this.helpers({

      Media() {
        return Medias.findOne(this.MediaID);
      }
    });
    }
    // debugger;
    //$scope.media= $scope.$meteorObject(Medias, $scope.MediaID , false)
    /*           $scope.Media =    $meteorCollection(function () {
                     return Medias.findOne(  $scope.MediaID );
                   }, false);
                   */

  }
  


  var thisCtrl=this;
 

 
}



