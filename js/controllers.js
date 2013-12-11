'use strict';

/* Controllers */

var cryptohelperControllers = angular.module('cryptohelperControllers', []);

cryptohelperControllers.controller('ExchangeData', ['$scope', 'exchangeDataService',
  function($scope, exchangeDataService) {
    $scope.exchangeDataService = exchangeDataService;
  }
]);

cryptohelperControllers.controller('UserData', ['$scope', 'userDataService',
  function($scope, userDataService) {
    $scope.userDataService = userDataService;
  }
]);

cryptohelperControllers.controller('RawData', ['$scope', 
  'exchangeDataService',
  function($scope, exchangeDataService) {
    $scope.exchangeDataService = exchangeDataService;
  }
]);

cryptohelperControllers.controller('SellHelperCtrl', ['$scope', 
  'exchangeDataService', 'userDataService', 'conversionService',
  function($scope, exchangeDataService, userDataService, conversionService) {
    $scope.exchangeDataService = exchangeDataService;
    $scope.userDataService = userDataService;
  }
]);

cryptohelperControllers.controller('BuyHelperCtrl', ['$scope', 
  'exchangeDataService', 'userDataService', 'conversionService',
  function($scope, exchangeDataService, userDataService, conversionService) {
    $scope.exchangeDataService = exchangeDataService;
    $scope.userDataService = userDataService;
    //$scope.conversionService = conversionService;
    
    $scope.$watch( function () { return exchangeDataService.ltc_usd.ticker; }, function (data) {
      $scope.potential_ltc = conversionService.convert_currency('usd', 'ltc', userDataService.num_usd, true);
      $scope.potential_ltc_value = conversionService.convert_currency('ltc', 'usd', $scope.potential_ltc, false);
      $scope.difference_potential_ltc = $scope.potential_ltc - userDataService.last_ltc_num;
      $scope.difference_potential_ltc_class = ($scope.difference_potential_ltc >0) ? 'text-success' : 'text-danger';
      $scope.difference_potential_ltc_value = $scope.potential_ltc_value - userDataService.last_usd_num;
      $scope.difference_potential_ltc_value_class = ($scope.difference_potential_ltc_value >0) ? 'text-success' : 'text-danger';
    }, true);
    
    
  }
]);

