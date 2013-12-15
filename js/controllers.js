'use strict';

/* Controllers */
//angular.module('LocalStorageModule').value('prefix', 'crypto');

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

cryptohelperControllers.controller('BuyHelperCtrl', ['$scope', 
  'exchangeDataService', 'userDataService', 'conversionService',
  function($scope, exchangeDataService, userDataService, conversionService) {
//    $scope.exchangeDataService = exchangeDataService;
//    $scope.userDataService = userDataService;
    
    // Watch the LTC-USD exchange for changes and update the 
    $scope.$watch( function () { return exchangeDataService.ltc_usd.ticker; }, 
      function (data) {
        // How many LTCs would you have if you bought at this time (Includes fees)
        $scope.potential_ltc = conversionService.convert_currency(
          'usd', 
          'ltc', 
          userDataService.num_usd, 
          true // Include fees
        );
        // If you bought the LTCs now how much would they be worth in USD (Excludes fees)
        $scope.potential_ltc_value = conversionService.convert_currency(
          'ltc', 
          'usd', 
          $scope.potential_ltc, 
          false // Exclude fees
        );
      
        // Calculate the difference between how many LTCs you had previously
        $scope.difference_potential_ltc = 
          $scope.potential_ltc - userDataService.last_ltc_num;
        // If the difference is greater than zero use success class otherwise danger
        $scope.difference_potential_ltc_class = 
          ($scope.difference_potential_ltc > 0) ? 
          'text-success' : 
          'text-danger';
        
        // Calculate the difference between the potential USD value of LTC's and 
        // USD currently owned
        $scope.difference_potential_ltc_value = 
          $scope.potential_ltc_value - userDataService.last_usd_num;
        // If the difference is greater than zero use success class otherwise danger
        $scope.difference_potential_ltc_value_class = 
          ($scope.difference_potential_ltc_value > 0) ? 
          'text-success' : 
          'text-danger';
      },
      true
    );
  }
]);

cryptohelperControllers.controller('SellHelperCtrl', ['$scope', 
  'exchangeDataService', 'userDataService', 'conversionService',
  function($scope, exchangeDataService, userDataService, conversionService) {
//    $scope.exchangeDataService = exchangeDataService;
//    $scope.userDataService = userDataService;
    
    // Watch the LTC-USD exchange for changes and update the 
    $scope.$watch( function () { return exchangeDataService.ltc_usd.ticker; }, 
      function (data) {
        // How many USDs would you have if you sold at this time (Includes fees)
        $scope.potential_usd = conversionService.convert_currency(
          'ltc', 
          'usd', 
          userDataService.num_ltc, 
          true // Include fees
        );
//        // If you sold the LTCs now how much would they be worth in USD (Excludes fees)
//        $scope.potential_ltc_value = conversionService.convert_currency(
//          'ltc', 
//          'usd', 
//          $scope.potential_ltc, 
//          false // Exclude fees
//        );
      
        // Calculate the difference between how many USDs you had previously
        $scope.difference_potential_usd = 
          $scope.potential_usd - userDataService.last_usd_num;
        // If the difference is greater than zero use success class otherwise danger
        $scope.difference_potential_usd_class = 
          ($scope.difference_potential_usd > 0) ? 
          'text-success' : 
          'text-danger';
        
//        // Calculate the difference between the potential USD value of LTC's and 
//        // USD currently owned
//        $scope.difference_potential_ltc_value = 
//          $scope.potential_ltc_value - userDataService.last_usd_num;
//        // If the difference is greater than zero use success class otherwise danger
//        $scope.difference_potential_ltc_value_class = 
//          ($scope.difference_potential_ltc_value > 0) ? 
//          'text-success' : 
//          'text-danger';
      },
      true
    );
  }
]);

