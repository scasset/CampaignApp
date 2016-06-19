angular
  .module('CapmaignApp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl ($scope, $meteor, $state) {
  $scope.logout = logout;

  ////////////

  function logout () {
    $meteor.logout().then(function (err) {
     // alert(err);
      $state.go('login');
    });
  }
}
