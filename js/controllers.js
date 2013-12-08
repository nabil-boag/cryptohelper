'use strict';

/* Controllers */

var cryptohelperControllers = angular.module('cryptohelperControllers', []);

cryptohelperControllers.controller('ExchangeData', ['$scope', 'btceAPI', 
  'exchangeDataService', '$timeout',
  function($scope, btceAPI, exchangeDataService, $timeout) {
    $scope.exchangeDataService = exchangeDataService;
    
    (function tick() {
        btceAPI.get({action: 'ticker', endpoint: 'ltc_usd'}, function(response) {
          $scope.exchangeDataService.ltc_usd = response.contents.ticker;
          // Poll the server every 5 seconds
          $timeout(tick, 5000);
        });
    })();
    
    (function tick() {
        btceAPI.get({action: 'ticker', endpoint: 'ltc_btc'}, function(response) {
          $scope.exchangeDataService.ltc_btc = response.contents.ticker;
          // Poll the server every 5 seconds
          $timeout(tick, 5000);
        });
    })();
    
    (function tick() {
        btceAPI.get({action: 'ticker', endpoint: 'btc_usd'}, function(response) {
          $scope.exchangeDataService.btc_usd = response.contents.ticker;
          // Poll the server every 5 seconds
          $timeout(tick, 5000);
        });
    })();
  }
]);

cryptohelperControllers.controller('UserData', ['$scope', 'userDataService',
  function($scope, userDataService) {
    $scope.userDataService = userDataService;
  }
]);

cryptohelperControllers.controller('RawData', ['$scope', 
  'exchangeDataService', 'userDataService',
  function($scope, exchangeDataService, userDataService) {
    $scope.exchangeDataService = exchangeDataService;
    $scope.userDataService = userDataService;
  }
]);
