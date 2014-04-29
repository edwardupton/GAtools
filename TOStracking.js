//Logs the time on the site, every 10 seconds
(function (tos) {
   var inFocus = true;
   var tif = 0;
   var nonInteractive = true; //if true all events fired by script will be non-interactive, so will not impact the existing default bounce rate measure
   var fnBlur = function(){inFocus = false; };
   var fnFocus = function(){inFocus= true; };
   if (window.addEventListener) {
      window.addEventListener ('blur',fnBlur,true);
      window.addEventListener ('focus',fnFocus,true);
   }   
   else if (window.attachEvent) {
     window.attachEvent ('onblur',fnBlur); 
     window.attachEvent ('onfocus',fnFocus); 
   }
   var formatMS = function(t){
      return Math.floor(t/60) +':'+ (t%60==0?'00':t%60);
   }
   var timeLog = window.setInterval(function () {
      tos = tos+10;
       if (inFocus){
         tif = tif+10;
         if (typeof _gaq === 'object') {
            _gaq.push(['_trackEvent', 'Time', 'Log', formatMS(tif),tif,nonInteractive]);
         }
         else if (typeof ga === 'function') {
            ga('send', {hitType: 'event', eventCategory: 'Time', eventAction: 'Log', eventLabel: formatMS(tif), eventValue: 10, nonInteraction: 'true'});
            // console.log('tos: ' + tos + ' ' + formatMS(tos) + ' tif:' + tif + ' ' + formatMS(tif));
         }
       }
       
     }, 10000);
   window.setTimeout(function () { clearInterval(timeLog); },601000); //stops after 10 minutes
})(0);
