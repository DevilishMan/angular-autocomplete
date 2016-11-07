/**
 * angular-autocomplete
 * angular auto complete
 * version:1.0.0
 * auto complete directive for AngularJS
 */
(function(){
  angular.module('ng.autocomplete', ['autocomplete/template/auto-complete-header.html','autocomplete/template/auto-complete-body.html','autocomplete/template/auto-complete-ul.html'] )
    .factory('ngAutoCompleteService',function(){
      return {
        element:null,
        canCloseOptions:true,
        optionsContainer:null,
        optionsElement:null
      }
    })
    .directive('ngAutoComplete',[
      'ngAutoCompleteService',
      '$templateRequest',
      '$compile',
      '$timeout',
      function (ngAutoCompleteService,$templateRequest,$compile,$timeout) {
        return {
          restrict: 'EA',
          templateUrl:'autocomplete/template/auto-complete-header.html',
          replace:true,
          scope: {
            autoSelect:'=',
            autoOptions:'=',
            autoKey:'@',
            autoChange:'&'
          },
          link: function($scope, $element, $attrs) {
            $scope.loadingOptions = true;
            $scope.$watch('autoSelect',function(selectVal){
              if(selectVal){
                $scope.selectItemText = $scope.autoSelect[$scope.autoKey]
              }
            },true)
            //position
            var setOptionsPosition = function(lineHeight,isLoading){
              $scope.optionsStyle = {};
              var selectElementWidth = $(ngAutoCompleteService.element).width();
              var selectElementHeight = $(ngAutoCompleteService.element).height();
              var selectElementOffset = $(ngAutoCompleteService.element).offset();
              var documentWidth = $(document).width();
              var documentHeight = $(document).height();
              $scope.optionsStyle.width = selectElementWidth+'px';
              var allOptionsHeight = lineHeight;
              if(!isLoading){
                allOptionsHeight = lineHeight * $scope.autoOptions.length;
              }
              var bottomHeight = documentHeight - (selectElementOffset.top + selectElementHeight);
              var topHeight = selectElementOffset.top;
              if(allOptionsHeight < bottomHeight){
                $scope.optionsStyle.left = selectElementOffset.left+'px';
                $scope.optionsStyle.top = (selectElementOffset.top + selectElementHeight)+'px';

              }else if(allOptionsHeight < topHeight){
                $scope.optionsStyle.left = selectElementOffset.left+'px';
                $scope.optionsStyle.top = (selectElementOffset.top - allOptionsHeight)+'px';
              }else{
                $scope.optionsStyle.left = selectElementOffset.left+'px';
                if(bottomHeight < topHeight){
                  $scope.optionsStyle.top = 0
                  $scope.optionsStyle.height = topHeight + 'px';
                  $scope.optionsStyle.overflowY = 'auto';
                }else{
                  $scope.optionsStyle.top = (selectElementOffset.top + selectElementHeight)+'px';
                  $scope.optionsStyle.height = bottomHeight + 'px';
                  $scope.optionsStyle.overflowY = 'auto';
                }
              }
              console.log('all options height2:',$scope.optionsStyle);
              $(ngAutoCompleteService.optionsContainer).css('display','block');
            }


            //draw list container
            var drawAutoCompleteOptionsContainer = function(){
              if(!ngAutoCompleteService.optionsContainer){
                $templateRequest('autocomplete/template/auto-complete-body.html').then(function(html){
                  var template = angular.element(html);
                  $('body').append(template);
                  ngAutoCompleteService.optionsContainer = template;
                  $compile(template)($scope);
                  $timeout(function(){
                    setOptionsPosition($('.loading').height(),true);
                    template.bind('mouseover',function(e){
                      ngAutoCompleteService.canCloseOptions = false;
                    });
                    template.bind('mouseout',function(e){
                      ngAutoCompleteService.canCloseOptions = true;
                    });
                    if(!ngAutoCompleteService.canCloseOptions){
                      $(ngAutoCompleteService.optionsContainer).remove();
                      ngAutoCompleteService.optionsContainer = null;
                      $scope.optionsStyle = {};
                      ngAutoCompleteService.canCloseOptions = true;
                    }
                  })
                })
              }
            }
            //draw list
            var drawAutoCompleteOptions = function(){
              if(ngAutoCompleteService.optionsContainer){
                if(ngAutoCompleteService.optionsElement){
                  $(ngAutoCompleteService.optionsElement).remove();
                }
                $templateRequest('autocomplete/template/auto-complete-ul.html').then(function(html){
                  var template = angular.element(html);
                  ngAutoCompleteService.optionsElement = template;
                  $(ngAutoCompleteService.optionsContainer).append(template);
                  $compile(template)($scope);
                  $timeout(function() {
                    var liHeight = 0;
                    if($(template).find('>li').length > 0){
                      liHeight = $(template).find('>li:first').height();
                    }else{
                      clearAutoCompleteOptionsContainer();
                    }
                    $(ngAutoCompleteService.optionsContainer).css('display','none');
                    setOptionsPosition(liHeight, false);
                    $(template).find('>li').bind('click',function(){
                      var _index = $(this).prevAll().length;
                      var selectOptionItem = $scope.autoOptions[_index];
                      $scope.$apply(function(){
                        $scope.autoSelect = selectOptionItem;
                      })

                      //console.log('select option item:',$scope.ngModel);
                      ngAutoCompleteService.element = null;
                      $('.auto-complete-options').remove();
                      ngAutoCompleteService.optionsContainer = null;
                      ngAutoCompleteService.optionsElement = null;
                      $scope.optionsStyle = {};
                    })
                  });
                });
              }
            }
            var clearAutoCompleteOptionsContainer = function(){
              if(ngAutoCompleteService.canCloseOptions){
                $('.auto-complete-options').remove();
                ngAutoCompleteService.optionsContainer = null;
                ngAutoCompleteService.optionsElement = null;
                $scope.optionsStyle = {};
              }
            }

            $element.find('input').bind('focus',function(){
              ngAutoCompleteService.element = $element;
            })

            $element.find('input').bind('input',function(){
              if(ngAutoCompleteService.element){
                $scope.loadingOptions = true;
                clearAutoCompleteOptionsContainer();
                drawAutoCompleteOptionsContainer();
                $scope.autoChange({val:$(this).val()});
              }
            })

            $scope.$watch('autoOptions',function(val){
              //console.log('directive -> auto options has change:',val);
              $scope.loadingOptions = false;
              if(!!ngAutoCompleteService.optionsContainer){
                drawAutoCompleteOptions();
              }
            })

            $element.find('input').bind('blur',function(){
              ngAutoCompleteService.element = null;
              clearAutoCompleteOptionsContainer();
            });

          }
        }
      }
    ]);

  angular.module('autocomplete/template/auto-complete-header.html', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('autocomplete/template/auto-complete-header.html',
      '<div class="auto-complete-input">'+
      '  <input type="text" ng-model="selectItemText"/>'+
      '</div>'+
      '');
  }]);

  angular.module('autocomplete/template/auto-complete-body.html', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('autocomplete/template/auto-complete-body.html',
      '<div class="scrollbar auto-complete-options" ng-style="optionsStyle">'+
      '  <div ng-if=\"loadingOptions\" class=\"loading\">正在加载...</div>'+
      ' </div> '+
      '');
  }]);

  angular.module('autocomplete/template/auto-complete-ul.html', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('autocomplete/template/auto-complete-ul.html',
      '  <ul> '+
      '    <li ng-repeat="item in autoOptions"><a ng-bind="item[autoKey]"></a></li> '+
      '  </ul> '+
      '');
  }]);
})()