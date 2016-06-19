angular
  .module('CapmaignApp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state, $ionicLoading, $ionicPopup, $log) {

  $scope.data = {};
  $scope.login    = function () {
      let user = this.email;//"wasanchai@scasset.com";
      
	     Meteor.loginWithLDAP(user, this.password, {  }, function (err) {
        if (err) {
          // login failed
          //  debugger; 
          handleError(err)
          //alert(err);
        }
        else {
          // login successful
          //  debugger;
           //alert($scope.currentUser);
         // alert("hi" + Meteor.user().username);
          location.href = '/';
          //this.$state.go('tab.home');
        }
      });
    }

    function handleError(err) {
      //$log.error('Login error ', err);

      $ionicPopup.alert({
        title: 'ไม่สามารถ Login ได้',
        template: 'รบกวนลองใหม่อีกครั้ง',
        okType: 'button-positive button-clear'
      });
    }
  }
 
