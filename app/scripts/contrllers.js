/**
 * Created by huangzhibiao on 16/11/5.
 */

app.controller('MainCtrl', ['$scope', '$http','$timeout',
  function ($scope, $http,$timeout) {
    console.log('man contrller!');
    $scope.main ={
      name:'黄志彪'
    }
    $scope.options = []
    $scope.inputVal = '黄志彪';
    var dataArr = [
      {
        text:'黄志彪001',
        id:0,
        name:'黄志彪'
      },
      {
        text:'黄志彪002',
        id:1,
        name:'黄志彪'
      }
      ,
      {
        text:'黄志彪003',
        id:2,
        name:'黄志彪'
      },
      {
        text:'黄志彪004',
        id:3,
        name:'黄志彪'
      },
      {
        text:'黄志彪005',
        id:4,
        name:'黄志彪'
      },
      {
        text:'黄志彪006',
        id:5,
        name:'黄志彪'
      },
      {
        text:'黄志彪007',
        id:6,
        name:'黄志彪'
      },
      {
        text:'黄志彪008',
        id:7,
        name:'黄志彪'
      },
      {
        text:'黄志彪009',
        id:8,
        name:'黄志彪'
      },
      {
        text:'黄志彪010',
        id:9,
        name:'黄志彪'
      }
    ]
    $scope.selectItem = dataArr[0];
    $scope.selectItem1 = dataArr[2];
    $scope.changeInputVal = function(val){
      console.log('change input val ctrl:',val);
      var _filterData = []
      for(var i=0;i<dataArr.length;i++){
        var item = dataArr[i];
        if(item.text.indexOf(val) >= 0){
          _filterData.push(item);
        }
      }
      $timeout(function(){
        $scope.$apply(function(){
          $scope.options = _filterData;
        })
      })
    }

    $scope.changeInputVal1 = function(val){
      console.log('change input val ctrl1:',val);
      var _filterData = []
      for(var i=0;i<dataArr.length;i++){
        var item = dataArr[i];
        if(item.text.indexOf(val) >= 0){
          _filterData.push(item);
        }
      }
      $timeout(function(){
        $scope.$apply(function(){
          $scope.options1 = _filterData;
        })
      })
    }

    $scope.save = function(){
      console.log('save item val:',$scope.selectItem,$scope.selectItem1);
    }
  }])