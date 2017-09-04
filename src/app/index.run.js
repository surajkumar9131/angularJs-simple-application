(function() {
  'use strict';

  angular
    .module('assignment')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places,geometry&sensor=false&key=AIzaSyDRPx762Cw8aHPXQb8qru7FvRCdAnGuSQA';
      script.type = 'text/javascript';
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    $log.debug('runBlock end');
  }

})();
