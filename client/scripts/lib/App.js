angular
  .module('CapmaignApp', [
    'angular-meteor',
    'ionic',
    'angularMoment' , 'chart.js', 'ionic-datepicker'
  ]);

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

function onReady() {
  angular.bootstrap(document, ['CapmaignApp']);
}
