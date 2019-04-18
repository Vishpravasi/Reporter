var lstFinalDatesForSchemeProd = [];
$(document).ready(function () {
});

 
// $("#setBlockOutDates").click(function () {
angular.module('app', ['gm.datepickerMultiSelect'])
 .controller('AppCtrl', function ($scope, $http) {
     console.log('test');
     this.activeDate;
     this.selectedDates = [new Date().setHours(0, 0, 0, 0)];
     this.type = 'individual';

     this.identity = angular.identity;
     this.removeFromSelected = function (dt) {
         this.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
     }


     $scope.action = function () {
        
         $http.get('text.txt').success(function (data) {
             console.log(data);
             dates = data;
             $scope.disabled = function (date, mode) {
                 lstFinalDatesForSchemeProd.push(dates);
                 lstFinalDatesForSchemeProd.push("24/7/2015");
                 lstFinalDatesForSchemeProd.push("25/7/2015");
                 lstFinalDatesForSchemeProd.push("2/8/2015");
                 lstFinalDatesForSchemeProd.push("23/7/2015");

                 var dd = date.getDate();
                 var mm = date.getMonth() + 1;
                 var yyyy = date.getFullYear();
                 //var disabledate = yyyy + '-' + mm + '-' + dd;
                 var disabledate = dd + '/' + mm + '/' + yyyy;
                 arrdisabledate = {};
                 // arrdisabledate = lstFinalDatesForSchemeProd;

                 $.each(lstFinalDatesForSchemeProd, function (indx, vval) {
                     arrdisabledate[vval] = vval;
                 });
                 console.log(arrdisabledate);
                 //arrdisabledate ['2015-7-28']  = '2015-7-28';
                 //arrdisabledate ['2015-7-29']  = '2015-7-29';
                 //arrdisabledate ['2015-8-5']  = '2015-8-5';
                 return arrdisabledate[disabledate];
             };

         });


         var date = new Date();
         $scope.minDate = new Date();
         $scope.maxDate = date.setDate((new Date()).getDate() + 30);



     }


     $scope.action();


     //   });
     // });


 });


