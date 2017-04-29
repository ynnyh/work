/**
 * Created by Administrator on 2017/2/14.
 */
angular.module('work.index', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'views/index.html',
            controller: 'indexController'
        });
    }])

.service('search',['$http',function($http){
    this.showPlay=function(){
        return $http.get('/contact');
    }
}])

.controller('indexController',['$scope','search',function($scope,search){
    $scope.lists=[];
    search.showPlay().then(function(res){
        var newarr=[];
        var dic=[];
        res.data.forEach(function(v){
            var pin= v.pinyin[0];
            if(!dic[pin]){
                var o={
                    index: pin,
                    peo:[]
                };
                o.peo.push(v);
                newarr.push(o);
                dic[pin]=true;
            }else{
                newarr.forEach(function(d){
                    if(d.index==pin){
                        d.peo.push(v);
                    }
                })
            }
        });
        newarr.sort(function(a,b){
            return a.index>b.index;
        })
        $scope.lists=newarr;
    });
    $scope.jump=function(i){
        var bg=document.getElementsByClassName('lia');
        var height=bg[i].offsetTop+52;
        console.log(height);
        $('html,body').animate({scrollTop:height},500);
    }
}])