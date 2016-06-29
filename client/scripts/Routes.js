angular
  .module('CapmaignApp')
  .config(config)
.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2015, 1, 1),
      to:  new Date(new Date().getFullYear()+1, 12, 31),
      showTodayButton: false,
      dateFormat: 'dd/MM/yyyy',
      closeOnSelect: true,
   //   disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  });
function config ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
$ionicConfigProvider.views.transition('none');
   $ionicConfigProvider.tabs.position('bottom'); 
 
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/Tabs.html' ,
      resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }],
          
        // chats: ['$meteor', function ($meteor) {
        //   return $meteor.subscribe('chats');
        // }],
        Campaigns: ['$meteor', function ($meteor) {
          return $meteor.subscribe('Campaigns');
        }],
        Medias: ['$meteor', function ($meteor) {
          return $meteor.subscribe('Medias');
        }],
        // userData: ['$meteor', function ($meteor) {
        //   return $meteor.subscribe('userData');
        // }]
      }        
      })
 .state('tab.test', {
      url: '/test',
      views: {
        'tab-test': {
          templateUrl: 'client/templates/Test.html',
          controller: 'TestCtrl'
        }
      }
    })
 .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'client/templates/Home.html',
          controller: 'HomeCtrl'
        }
      }
    })

 .state('tab.campaigns', {
      url: '/campaigns',
         cache: false,
      views: {
        'tab-campaigns': {
          templateUrl: 'client/templates/Campaigns.html',
          controller: 'CampaignsCtrl as campaignsCtrl',
           resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }]
          
      }        
        }
      }
    })
     .state('tab.campaigns.detail', {
         cache: false,
         url: '/detail/:CampaignID',
        views: {
          'tab-campaigns-detail': {
            templateUrl: 'client/templates/Campaign.html',
            controller: 'CampaignCtrl as campaignCtrl'
          }
        }
      })  
 .state('tab.campaignReport', {
        url: '/home/:CampaignID',
        views: {
          'tab-home': {
            templateUrl: 'client/templates/CampaignReport.html',
            controller: 'CampaignReportCtrl as campaignReportCtrl'
          }
        }
      }) 
//  .state('tab.campaign', {
//         url: '/campaigns/:CampaignID',
//         views: {
//           'tab-campaigns': {
//             templateUrl: 'client/templates/Campaign.html',
//             controller: 'CampaignCtrl'
//           }
//         }
//       })    
	.state('tab.reports', {
      url: '/reports',
      views: {
        'tab-reports': {
          templateUrl: 'client/templates/Reports.html',
          controller: 'ReportsCtrl as x'
        }
      }
    })    
//      .state('tab.chats', {
//         url: '/chats',
//         views: {
//           'tab-chats': {
//             templateUrl: 'client/templates/chats.html',
//             controller: 'ChatsCtrl as chats'
//           }
//         }
//       })
//       .state('tab.chat', {
//         url: '/chats/:chatId',
//         views: {
//           'tab-chats': {
//             templateUrl: 'client/templates/chat.html',
//             controller: 'ChatCtrl as chat'
//           }
//         }
//       })
      .state('login', {
        url: '/login',
        templateUrl: 'client/templates/Login.html',
        controller: 'LoginCtrl'
      })
       
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'client/templates/Settings.html',
            controller: 'SettingsCtrl',
          }
        }
      })
       .state('tab.medias', {
      url: '/medias',
         cache: false,
      views: {
        'tab-medias': {
          templateUrl: 'client/templates/Medias.html',
          controller: 'MediasCtrl as mediasCtrl',
           resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }]
          
      }        
        }
      }
    })
     .state('tab.medias.detail', {
         cache: false,
         url: '/detail/:MediaID',
        views: {
          'tab-medias-detail': {
            templateUrl: 'client/templates/Media.html',
            controller: 'MediaCtrl as mediaCtrl'
          }
        }
      })  

      ;

    $urlRouterProvider.otherwise('tab/home');
}
