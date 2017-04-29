/**
 * Created by Administrator on 2017/2/7.
 */
angular.module('work.todo', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/todo', {
            templateUrl: 'todo/todo.html',
            controller: 'todoController'
        });
    }])
.controller('todoController',['$scope',function($scope){
    if(localStorage.list){
        $scope.list=JSON.parse(localStorage.list);
    }else{
        $scope.list=[];
    }
    $scope.save=function(){
      localStorage.list=JSON.stringify($scope.list);
    };
    //$scope.list=[
    //    {name:"事件1",isDone:true},
    //    {name:"事件2",isDone:false},
    //    {name:"事件3",isDone:false}
    //];
    $scope.add=function(){
        if($scope.key){
            $scope.list.push({name:$scope.key,isDone:false});
            $scope.key="";
        }
    };
    $scope.del=function(i){
        $scope.list.splice(i,1);
    };
    $scope.change=function(v){
        v.isDone= !v.isDone;
    };
    $scope.state=0;
    $scope.fn=function(v){
        var s=$scope.state;
      if(s==0){
        return true;
      }else if(s==1){
          return v.isDone;
      }else if(s==2){
          return !v.isDone;
      }
    };
    $scope.fn1=function(v){
        return true;
    };
    $scope.fn2=function(v){
        return v.isDone;
    };
    $scope.fn3=function(v){
        return !v.isDone;
    }
}])