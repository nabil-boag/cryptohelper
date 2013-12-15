'use strict';

/* App Module */

var cryptohelperApp = angular.module('cryptohelperApp', [
  'ngRoute',
  'cryptohelperControllers',
  'cryptohelperServices',
]);

cryptohelperApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/sell_helper', {
        templateUrl: 'partials/sell.html',
        controller: 'SellHelperCtrl'
      }).
      when('/buy_helper', {
        templateUrl: 'partials/buy.html',
        controller: 'BuyHelperCtrl'
      }).
      otherwise({
        redirectTo: '/sell_helper'
      });
  }]);