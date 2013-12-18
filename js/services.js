angular.module('configuration', []).constant('API_TIMEOUT', 5000);

var cryptohelperServices = angular.module('cryptohelperServices', [/*'ngResource',*/
  'configuration']);
 
//cryptohelperServices.factory('btceAPI', ['$resource',
//  function($resource){
//    return $resource('/proxy.php?url=https://btc-e.com/api/2/:endpoint/:action',
//      {}, 
//      {
//        query: {
//          method : 'JSON', 
//          params : { 
//            endpoint: 'ltc_usd',
//            action:'ticker'
//          }
//        }
//      }
//    );
//  }
//]);

cryptohelperServices.factory('LTCUSDPoller', ['$http', '$timeout', 'API_TIMEOUT',
  function($http, $timeout, API_TIMEOUT) {
    var data = { ticker: {}};
    var poller = function() {
      $http.get('/proxy.php?url=https://btc-e.com/api/2/ltc_usd/ticker').then(
        function(response) {
          var timeout = API_TIMEOUT;
          if ( ! response.data.contents.ticker) {
            timeout *= 2;
          } else {
            data.ticker = response.data.contents.ticker;
          }
          $timeout(poller, timeout);
        }
      );
    };
    poller();

    return data;
  }
]);

cryptohelperServices.factory('LTCBTCPoller', ['$http', '$timeout', 'API_TIMEOUT',
  function($http, $timeout, API_TIMEOUT) {
    var data = { ticker: {}};
    var poller = function() {
      $http.get('/proxy.php?url=https://btc-e.com/api/2/ltc_btc/ticker').then(
        function(response) {
          var timeout = API_TIMEOUT;
          if ( ! response.data.contents.ticker) {
            timeout *= 2;
          } else {
            data.ticker = response.data.contents.ticker;
          }
          $timeout(poller, timeout);
        }
      );
    };
    poller();

    return data;
  }
]);

cryptohelperServices.factory('BTCUSDPoller', ['$http', '$timeout', 'API_TIMEOUT',
  function($http, $timeout, API_TIMEOUT) {
    var data = { ticker: {}};
    var poller = function() {
      $http.get('/proxy.php?url=https://btc-e.com/api/2/btc_usd/ticker').then(
        function(response) {
          var timeout = API_TIMEOUT;
          if ( ! response.data.contents.ticker) {
            timeout *= 2;
          } else {
            data.ticker = response.data.contents.ticker;
          }
          $timeout(poller, timeout);
        }
      );
    };
    poller();

    return data;
  }
]);

cryptohelperServices.run(['LTCUSDPoller', 'LTCBTCPoller', 'BTCUSDPoller',   
  function(LTCUSDPoller, LTCBTCPoller, BTCUSDPoller) {}]);

cryptohelperServices.factory('exchangeDataService', ['LTCUSDPoller', 
  'LTCBTCPoller', 'BTCUSDPoller',
  function(LTCUSDPoller, LTCBTCPoller, BTCUSDPoller){
    return {
      ltc_usd : LTCUSDPoller,
      ltc_btc : LTCBTCPoller,
      btc_usd : BTCUSDPoller,
      exchange_fee_percentage: 0.02,
      exchange_fee_rate: 0.9998
    };
  }
]);


cryptohelperServices.run(function(exchangeDataService) {});


cryptohelperServices.factory('userDataService', function(){
    return {
      num_ltc: 10.95073279,
      num_usd: 382.79,
      num_btc: 0,
      last_usd_num: 382.79,
      last_ltc_num: 10.95073279,
      exchange_weighting: 1,
    };
  }
);


cryptohelperServices.factory('conversionService', ['exchangeDataService', 
  function(exchangeDataService){
    return {
      convert_currency : function(current_currency, required_currency, ammount, include_fees) {
        // convert 210 usd into LTC
        var converted_ammount = ammount;
        if (current_currency === 'usd') {
          // If the user has 'usd' they are buying
          if (required_currency === 'ltc') {
            converted_ammount /= exchangeDataService.ltc_usd.ticker.buy;
          }
          if (required_currency === 'btc') {
            converted_ammount /= exchangeDataService.btc_usd.ticker.buy;
          }
        } else if (current_currency === 'ltc') {
          // If the user has 'usd' they are buying
          if (required_currency === 'usd') {
            converted_ammount *= exchangeDataService.ltc_usd.ticker.sell;
          }
          if (required_currency === 'btc') {
            converted_ammount *= exchangeDataService.ltc_bst.ticker.sell;
          }
        } else if (current_currency === 'btc') {
          // If the user has 'usd' they are buying
          if (required_currency === 'usd') {
            converted_ammount *= exchangeDataService.ltc_usd.ticker.sell;
          }
          if (required_currency === 'ltc') {
            converted_ammount /= exchangeDataService.ltc_bst.ticker.buy;
          }
        } else {
          return null;
        }
        if (!include_fees) {
          return converted_ammount;
        }
        return converted_ammount * exchangeDataService.exchange_fee_rate;
      }
    };
  }
]);
