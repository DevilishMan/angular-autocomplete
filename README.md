# angular-autocomplete
Native AngularJS (Angular) directives for auto complete.

npm install angularjs-auto-complete.

bower install angularjs-auto-complete.

DEMO:

&lt;ng-auto-complete auto-options="options" auto-select="selectItem" auto-key="text" auto-change="changeInputVal(val)"&gt; &lt;/ng-auto-complete&gt;

autoOptions:The option's array.

autoSelect:The selected item will set to this field.

autoKey:The option's field that use to display on the input.

autoChange:The changeInputVal Fun will trigger when input value change,and it can use to filter options by input key.

How to use:

1、Add module to app:

<div style='background:#333;color:#fff;line-height:32px;'>
  angular.module('app', ['ng.autocomplete']);
</div>

angular controller:

<div style=\"border:1px solid #333;\">

  app.controller('MainCtrl', ['$scope',<br/>

    function ($scope) {<br/>

      $scope.options = [{text:'text1',id:1,val:1},{text:'text2',id:2,val:2}];<br/>

      $scope.selectItem = $scope.options[0]<br/>

      $scope.changeInputVal = function(val){<br/>

          //filter data with val<br/>

          $scope.$apply(function(){<br/>

            $scope.options = _filterData;<br/>

          })<br/>

      }<br/>

      $scope.saveData = function(){<br/>

        //$scope.selectItem will change when select change<br/>

      }<br/>

    }<br/>
  ]);
</div>