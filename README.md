# angular-autocomplete
Native AngularJS (Angular) directives for auto complete.

npm install angularjs-auto-complete.

bower install angularjs-auto-complete.

DEMO:

&lt;ng-auto-complete auto-options="options" auto-select="selectItem" auto-key="text" auto-change="changeInputVal(val)"&gt; &lt;/ng-auto-complete&gt;

How to use:

1、Add module to app:

<div style='background:#333;color:#fff;line-height:32px;'>
  angular.module('app', ['ng.autocomplete']);
</div>

2、angular controller:

<div style=\"border:1px solid #333;\">

  app.controller('MainCtrl', ['$scope',<br/>

    &nbsp;&nbsp;function ($scope) {<br/>

      &nbsp;&nbsp;&nbsp;&nbsp;$scope.options = [{text:'text1',id:1,val:1},{text:'text2',id:2,val:2}];<br/>

      &nbsp;&nbsp;&nbsp;&nbsp;$scope.selectItem = $scope.options[0]<br/>

      &nbsp;&nbsp;&nbsp;&nbsp;$scope.changeInputVal = function(val){<br/>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//filter data with val<br/>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope.$apply(function(){<br/>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope.options = _filterData;<br/>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br/>

      &nbsp;&nbsp;&nbsp;&nbsp;}<br/>

      &nbsp;&nbsp;&nbsp;&nbsp;$scope.saveData = function(){<br/>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//$scope.selectItem will change when select change<br/>

      &nbsp;&nbsp;&nbsp;&nbsp;}<br/>

    &nbsp;&nbsp;}<br/>
  ]);
</div>

API：

autoOptions:The option's array.

autoSelect:The selected item will set to this field.

autoKey:The option's field that use to display on the input.

autoChange:The changeInputVal Fun will trigger when input value change,and it can use to filter options by input key.