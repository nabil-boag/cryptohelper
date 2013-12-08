var cryptohelperServices = angular.module('cryptohelperServices', ['ngResource']);
 
cryptohelperServices.factory('btceAPI', ['$resource',
  function($resource){
    return $resource('/proxy.php?url=https://btc-e.com/api/2/:endpoint/:action',
      {}, 
      {
        query: {
          method : 'JSON', 
          params : { 
            endpoint: 'ltc_usd',
            action:'ticker'
          }
        }
      }
    );
  }
]);


cryptohelperServices.factory('exchangeDataService', function(){
    return {
      ltc_usd : {},
//      ltc_btc : {},
//      btc_usd : {},
      exchange_fee_percentage: 0.02,
      exchange_fee_rate: 0.98
    };
  }
);

cryptohelperServices.factory('userDataService', function(){
    return {
      num_ltc: 11.88817601,
      //num_btc: 0,
      last_usd_value: 291.8, 
      exchange_weighting: 1,
    };
  }
);
