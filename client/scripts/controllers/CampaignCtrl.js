
angular
  .module('CapmaignApp')
  .controller('CampaignCtrl', CampaignCtrl);

function CampaignCtrl($meteor, $scope, $reactive, $stateParams, $ionicActionSheet, $state, $timeout, $ionicScrollDelegate, $ionicPopup, $ionicHistory, ionicDatePicker) {
  // $ionicHistory.nextViewOptions({
  //   disableAnimate: true,
  //   disableBack: true
  // });
  //$reactive(this).attach($scope);

  $reactive(this).attach($scope);

  //  alert($scope.currentUser.username);
  console.dir($stateParams);
  //$reactive($scope).attach($scope);
  $scope.CampaignID = $stateParams.CampaignID;
  //  alert($scope.CampaignID);
   $scope.subscribe('Campaigns');
  $scope.SaveCampaign2 = function (objCam) {
    var CampaignID = '55mNtrpAYtcJ4GJQu';
    // alert(CampaignID);
    //    alert(CampaignID);
    $state.go('tab.campaign', { CampaignID });
  }
  $scope.TestReport = function () {
    // alert("Save1");
    // var tmpCam;
    // tmpCam =angular.copy(campaign );
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
  $scope.SaveCampaignFile = function (objCam) {

    Meteor.call('retrieveMedia', function (err, res) {
      // debugger;
      window.open("data:application/pdf;base64, " + res);
    });

  }

    this.SaveCampaign = function (objCam) {
     // alert("Save1");
      // var tmpCam;
      // tmpCam =angular.copy(campaign );
      //  debugger;
      this.callMethod('SaveCampaign', angular.copy(objCam), function (error, result) {
        
        if (error) {
          alert('error:' + error.reason);

        } else {
          this.CampaignID = result;
          var CampaignID = this.CampaignID;
          
        // var  CampaignID = '55mNtrpAYtcJ4GJQu';
         // alert(CampaignID);
          //this.$state.go('tab.campaign',{CampaignID}); // ok
       //   $state.go('tab.campaigns.m',{CampaignID});
        }
      });

    }
    
  $scope.SaveCampaignScope = function (objCam) {
    //$scope.SaveCampaign = function (objCam) {
    //alert("Save1");
    // var tmpCam;
    //tmpCam =angular.copy($scope.Campaign );
    //debugger;
    // $meteor.call('checkTwitter', {}, function (error, result) {

    Meteor.call('SaveCampaign', angular.copy(objCam), function (error, result) {
      // alert(result);
      if (error) {
        console.log('failed', err);
      } else {
        $scope.CampaignID = result;
        var CampaignID = $scope.CampaignID;

        // var  CampaignID = '55mNtrpAYtcJ4GJQu';
        // alert(CampaignID);
        //$scope.$state.go('tab.campaign',{CampaignID}); // ok
        //  $scope.Campaign = { Status: 'A', Medias: [{}] };
        //  debugger;
        if ($stateParams.CampaignID == "NEW") {
          $scope.Campaign = { Status: 'A', Medias: [{}] };

        }
//        $state.go('tab.campaigns.m', { CampaignID });

      }
    });


  }
  $scope.RemoveCampaign = function (objCam) {
    // alert("Save1");
    // var tmpCam;
    // tmpCam =angular.copy(campaign );
    //  debugger;
    $scope.callMethod('RemoveCampaign', objCam, function (error, result) {
      // debugger;
      if (error) {
        alert('error:' + error.reason);

      } else {
        var Campaign = Campaigns.findOne();
        if (Campaign) {
          var CampaignID = Campaigns.findOne()._id;
          $state.go('tab.campaigns.m', { CampaignID });



        } else {
          $scope.Campaign = {};
        }
        //$state.go('tab.campaigns');
        // alert(result);
      }
    });

  }

  $scope.ShowURL = function (campaign, media) {
    //debugger;
    var myPopup = $scope.$ionicPopup.show({
      template: '<textarea style="height:50px" onclick="this.select()" >'
      + campaign.URL
      + '?utm_medium=banner'
      + '&utm_campaign=' + campaign.CampaignCode
      + '&utm_source=' + media.MediaCode + "</textarea>",
      title: 'URL Add Google Analytic',
      subTitle: 'Please select all and copy.',
      // scope: $scope,
      buttons: [
        { text: 'Cancel' }
      ]
    });

  }
  $scope.RemoveMedia = function (campaign, index) {

    campaign.Medias.splice(index, 1);


  }
  $scope.NewMedia = function (campaign) {
    var newMedia = {};
    campaign.Medias.splice(campaign.Medias.length, 0, newMedia);
    $timeout(() => {
      $scope.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
    //   delete campaign.Medias[index];
    //  alert(index);

  }



  $scope.currentDate = new Date();
  $scope.minDate = new Date(2105, 6, 1);
  $scope.maxDate = new Date(2015, 6, 31);

  $scope.datePickerCallback = function (val) {
    if (!val) {
      console.log('Date not selected');
    } else {
      console.log('Selected date is : ', val);
    }
  };

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
  $scope.SelectMedia = function (thisCtrl, campaign, curObj, curIndex) {
    //  $scope.currMedia  = curObj;
    // Show the action sheet
    var MediaCodes = ["facebook", "twitter", "think"];
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Show URL' },
        { text: 'FaceBook' },
        { text: 'Twitter' }
        ,
        { text: 'Think' }
      ],
      destructiveText: 'Delete',
      titleText: 'Select Media',
      cancelText: 'Cancel',
      destructiveButtonClicked: function () {
        // debugger;
        // this.$scope.RemoveMedia(curObj, curIndex);
        campaign.Medias.splice(curIndex, 1);
        return true;
        // alert(curObj.MediaCode);
      },
      cancel: function () {
        // add cancel code..
      },
      buttonClicked: function (index) {
        if (index == 0) {
          thisCtrl.ShowURL(campaign, curObj);
        } else {
          curObj.MediaCode = MediaCodes[index - 1];
        }
        return true;
      }
    });
  }
  // this.data = Campaigns.findOne($scope.campaignId);
  console.log("id:" + $scope.CampaignID);

  if ($scope.CampaignID == "NEW") {

    this.Campaign = { Status: 'A', Medias: [{}] };
    // $scope.data = $scope.$meteorCollection(Chats, false);
  } else {
    //  debugger;
    TempCampaign = Campaigns.findOne($scope.CampaignID);
    if (!TempCampaign) {

     this.Campaign = {};
       // alert("Clear")
      //        debugger;




      //      $scope.Campaign = {};
    } else {
    console.log("Find:" +  $scope.CampaignID);
    this.CampaignID = $scope.CampaignID;
   // $scope.Campaign=Campaigns.findOne($scope.CampaignID);
      //  $scope.Campaign=    $scope.$meteorCollection(function () {
                  
      //                return Campaigns.find($scope.CampaignID);
      //              }, false);
      
          this.helpers({

      Campaign() {
        return Campaigns.findOne(this.CampaignID);
      }
    });
    }
    // debugger;
    //$scope.campaign= $scope.$meteorObject(Campaigns, $scope.CampaignID , false)
    /*           $scope.Campaign =    $meteorCollection(function () {
                     return Campaigns.findOne(  $scope.CampaignID );
                   }, false);
                   */

  }
  
 
  var StartDateObj = {
    callback: function (val) {  //Mandatory
      this.Campaign.StartDate = new Date(val);
      //debugger;
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      StartDateObj.inputDate = new Date(val);
    },
    inputDate:  this.Campaign && this.Campaign.StartDate ? this.Campaign.StartDate : new Date(),      //Optional
  };
  var ipObj1 = {
    callback: function (val) {  //Mandatory
        setvalue(val);
      //this.Campaign.StartDate = new Date(val);
      //debugger;
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      ipObj1.inputDate = new Date(val);
    },
    inputDate: this.Campaign && this.Campaign.StartDate ? this.Campaign.StartDate : new Date(),      //Optional
  };
//debugger;
//thisCtrl
  this.OpenStartDatePicker = function () {
    // debugger;
    //tt.Campaign.StartDate = new Date();
    ionicDatePicker.openDatePicker({
      callback: function (val) {  //Mandatory
        //debugger;
        thisCtrl.Campaign.StartDate = new Date(val);
             // setvalue(val);
      //  this.x.xx= "dddd";
        //this.x.Campaign.StartDate = new Date();
        //debugger;
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        this.inputDate = new Date(val);
      },
      inputDate:thisCtrl.Campaign && thisCtrl.Campaign.StartDate ? thisCtrl.Campaign.StartDate : new Date(),      //Optional
     // x:$scope 
    });


  };
  var thisCtrl=this;
  function setvalue(val) {
    
     tmp.Campaign.EndDate = new Date(val)
  }
  $scope.OpenEndDatePicker = function () {
    // debugger;
    ionicDatePicker.openDatePicker({
      callback: function (val) {  //Mandatory
        thisCtrl.Campaign.EndDate = new Date(val);
       // setvalue(val);
        //this.Campaign.EndDate = new Date(val);
        //debugger;
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        this.inputDate = new Date(val);
      },
      inputDate: thisCtrl.Campaign && thisCtrl.Campaign.EndDate ? thisCtrl.Campaign.EndDate : new Date(),      //Optional
    });


  };

  $scope.openDatePicker = function () {
    ionicDatePicker.openDatePicker(ipObj1);
  };
 
}



