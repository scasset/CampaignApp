
angular
  .module('CapmaignApp')
  .controller('CampaignCtrl', CampaignCtrl);

function CampaignCtrl($meteor, $scope, $reactive, $stateParams, $ionicActionSheet, $state, $timeout, $ionicScrollDelegate, $ionicPopup, $ionicHistory, ionicDatePicker, $ionicSideMenuDelegate, $ionicLoading) {
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


  this.SaveCampaign = function (objCam) {
    // alert("Save1");
    // var tmpCam;
    // tmpCam =angular.copy(campaign );
    //  debugger;
    this.callMethod('SaveCampaign', angular.copy(objCam), function (error, result) {

      if (error) {
        //alert('error:' + error.reason);
        showError(error.reason);

      } else {
        this.CampaignID = result;
        var CampaignID = this.CampaignID;

        // var  CampaignID = '55mNtrpAYtcJ4GJQu';
        //  alert(CampaignID);
        $state.go('tab.campaigns.detail', { CampaignID }); // ok
        //   $state.go('tab.campaigns.m',{CampaignID});
      }
    });

  }


  $scope.RemoveCampaign = function (objCam) {
    // alert("Save1");
    // var tmpCam;
    // tmpCam =angular.copy(campaign );
    //  debugger;
    if (window.confirm('ยืนยันลบข้อมูล')) { 
    $scope.callMethod('RemoveCampaign', objCam, function (error, result) {
      // debugger;
      if (error) {
        //  alert('error:' + error.reason);
        showError(error.reason);
      } else {
        var Campaign = Campaigns.findOne();
        if (Campaign) {
          var CampaignID = Campaigns.findOne()._id;
          $state.go('tab.campaigns.detail', { CampaignID });



        } else {
          $scope.Campaign = {};
        }
        //$state.go('tab.campaigns');
        // alert(result);
      }
    });
  }
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
  this.ShowURL = function (campaign, media) {
    debugger;
    var myPopup = $ionicPopup.show({
      template: '<textarea style="height:50px" onclick="this.select()" >'
      + campaign.URL
      + (campaign.URL.indexOf("?")>=0?"&":"?")
      + 'utm_medium=banner'
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
  var thisCtrl = this;
  this.NewMedia = function (campaign) {
    var newMedia = {};
    if (campaign.Medias) {
      campaign.Medias.splice(campaign.Medias.length, 0, newMedia);
    } else {
      campaign.Medias = [ newMedia ];
    }
    $timeout(() => {
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);


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


  $scope.SelectMedia = function (thisCtrl, campaign, curObj, curIndex) {

    var DeleteText = null;
    if (campaign.Medias.length > 1) {
      DeleteText = "ลบช่องทาง";
    }
    var buttonArr = [{ text: 'Show URL' }];
    data = Medias.find({}, { sort: { MediaName: 1 } }).fetch();
    data.forEach(function (row) {
      console.log(row.name)

      buttonArr.push({ text: row.MediaName });
    });


    var hideSheet = $ionicActionSheet.show({
      buttons: buttonArr,
      destructiveText: DeleteText,
      titleText: 'เลือกช่องทาง',
      cancelText: 'Cancel',
      destructiveButtonClicked: function () {
        //    debugger;
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
          //media = Medias.findOne({MediaName});
          //debugger;
          curObj.MediaCode = data[index - 1].MediaCode;
          curObj.MediaName = data[index - 1].MediaName;
          curObj.MediaID = data[index - 1]._id;
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

      this.Campaign = { Status: 'A', Medias: [{}] };

    } else {
      console.log("Find:" + $scope.CampaignID);
      this.CampaignID = $scope.CampaignID;

      this.helpers({

        Campaign() {
          return Campaigns.findOne(this.CampaignID);
        }
      });
    }


  }




  this.OpenStartDatePicker = function () {

    ionicDatePicker.openDatePicker({
      callback: function (val) {

        thisCtrl.Campaign.StartDate = new Date(val);

        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        this.inputDate = new Date(val);
      },
      inputDate: thisCtrl.Campaign && thisCtrl.Campaign.StartDate ? thisCtrl.Campaign.StartDate : new Date(),      //Optional

    });


  };
  var thisCtrl = this;

  $scope.OpenEndDatePicker = function () {
    // debugger;
    ionicDatePicker.openDatePicker({
      callback: function (val) {
        thisCtrl.Campaign.EndDate = new Date(val);
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        this.inputDate = new Date(val);
      },
      inputDate: thisCtrl.Campaign && thisCtrl.Campaign.EndDate ? thisCtrl.Campaign.EndDate : new Date(),      //Optional
    });


  };



}



