!function(){angular.module("ng.autocomplete",["autocomplete/template/auto-complete-header.html","autocomplete/template/auto-complete-body.html","autocomplete/template/auto-complete-ul.html"]).factory("ngAutoCompleteService",function(){return{element:null,canCloseOptions:!0,optionsContainer:null,optionsElement:null}}).directive("ngAutoComplete",["ngAutoCompleteService","$templateRequest","$compile","$timeout",function(t,e,o,n){return{restrict:"EA",templateUrl:"autocomplete/template/auto-complete-header.html",replace:!0,scope:{autoSelect:"=",autoOptions:"=",autoKey:"@",autoChange:"&"},link:function(l,i,p){l.loadingOptions=!0,l.$watch("autoSelect",function(t){t&&(l.selectItemText=l.autoSelect[l.autoKey])},!0);var a=function(e,o){l.optionsStyle={};var n=$(t.element).width(),i=$(t.element).height(),p=$(t.element).offset(),a=($(document).width(),$(document).height());l.optionsStyle.width=n+"px";var u=e;o||(u=e*l.autoOptions.length);var m=a-(p.top+i),c=p.top;u<m?(l.optionsStyle.left=p.left+"px",l.optionsStyle.top=p.top+i+"px"):u<c?(l.optionsStyle.left=p.left+"px",l.optionsStyle.top=p.top-u+"px"):(l.optionsStyle.left=p.left+"px",m<c?(l.optionsStyle.top=0,l.optionsStyle.height=c+"px",l.optionsStyle.overflowY="auto"):(l.optionsStyle.top=p.top+i+"px",l.optionsStyle.height=m+"px",l.optionsStyle.overflowY="auto")),console.log("all options height2:",l.optionsStyle),$(t.optionsContainer).css("display","block")},u=function(){t.optionsContainer||e("autocomplete/template/auto-complete-body.html").then(function(e){var i=angular.element(e);$("body").append(i),t.optionsContainer=i,o(i)(l),n(function(){a($(".loading").height(),!0),i.bind("mouseover",function(e){t.canCloseOptions=!1}),i.bind("mouseout",function(e){t.canCloseOptions=!0}),t.canCloseOptions||($(t.optionsContainer).remove(),t.optionsContainer=null,l.optionsStyle={},t.canCloseOptions=!0)})})},m=function(){t.optionsContainer&&(t.optionsElement&&$(t.optionsElement).remove(),e("autocomplete/template/auto-complete-ul.html").then(function(e){var i=angular.element(e);t.optionsElement=i,$(t.optionsContainer).append(i),o(i)(l),n(function(){var e=0;$(i).find(">li").length>0?e=$(i).find(">li:first").height():c(),$(t.optionsContainer).css("display","none"),a(e,!1),$(i).find(">li").bind("click",function(){var e=$(this).prevAll().length,o=l.autoOptions[e];l.$apply(function(){l.autoSelect=o}),t.element=null,$(".auto-complete-options").remove(),t.optionsContainer=null,t.optionsElement=null,l.optionsStyle={}})})}))},c=function(){t.canCloseOptions&&($(".auto-complete-options").remove(),t.optionsContainer=null,t.optionsElement=null,l.optionsStyle={})};i.find("input").bind("focus",function(){t.element=i}),i.find("input").bind("input",function(){t.element&&(l.loadingOptions=!0,c(),u(),l.autoChange({val:$(this).val()}))}),l.$watch("autoOptions",function(e){l.loadingOptions=!1,t.optionsContainer&&m()}),i.find("input").bind("blur",function(){t.element=null,c()})}}}]),angular.module("autocomplete/template/auto-complete-header.html",[]).run(["$templateCache",function(t){t.put("autocomplete/template/auto-complete-header.html",'<div class="auto-complete-input">  <input type="text" ng-model="selectItemText"/></div>')}]),angular.module("autocomplete/template/auto-complete-body.html",[]).run(["$templateCache",function(t){t.put("autocomplete/template/auto-complete-body.html",'<div class="scrollbar auto-complete-options" ng-style="optionsStyle">  <div ng-if="loadingOptions" class="loading">正在加载...</div> </div> ')}]),angular.module("autocomplete/template/auto-complete-ul.html",[]).run(["$templateCache",function(t){t.put("autocomplete/template/auto-complete-ul.html",'  <ul>     <li ng-repeat="item in autoOptions"><a ng-bind="item[autoKey]"></a></li>   </ul> ')}])}();