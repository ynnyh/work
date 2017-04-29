/**
 * Created by Administrator on 2017/2/15.
 */
angular.module('work.contact', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'contact/contact.html',
            controller: 'contactController'
        })
    }])
    .controller('contactController', ['$scope','contactService',function ($scope,contactService) {
            $scope.lists=[];
            contactService.getLists().then(function(res){
                $scope.lists=res.data;
                $scope.lists.forEach(function(v,i){
                    v.checked=false;
                })
            });
            //增
            $scope.add=function(){
                contactService.addContact('').then(function(res){
                    var person={
                        id:res.data,
                        name:'',
                        phone:'',
                        checked:false
                    };
                    $scope.lists.push(person);
                })
            };
            //改
            $scope.updateName=function(id,v){
                contactService.updateContact(id,'name',v);
            };
            $scope.updatePhone=function(id,v){
                contactService.updateContact(id,'phone',v);
            };
//    删
            $scope.delete=function(){
                var ids=[];
                $scope.lists.forEach(function(v,i){
                    if(v.checked){
                        ids.push(v.id);
                    }
                });
                contactService.delete(ids).then(function(res){
                    var newarr=[];
                    $scope.lists.forEach(function(v,i){
                        if($.inArray(v.id,ids)=== -1){
                            newarr.push(v);
                        }
                    });
                    $scope.lists=newarr;
                })
            };
            $scope.toggleCheck=function(){
                if($scope.checkAll){
                    $scope.lists.forEach(function(v,i){
                        v.checked=true;
                    })
                }else{
                    $scope.lists.forEach(function(v,i){
                        v.checked=false;
                    })
                }
            };
            $scope.$watch('lists',function(v){
                var flag=true;
                v.forEach(function(v,i){
                    if(!v.checked){
                        flag=false;
                    }
                });
                $scope.checkAll=flag;
            },true);
    }])
.service('contactService',['$http',function($http){
    this.getLists=function(){
        return $http.get('/contact');
    };
    this.addContact=function(name){
        return $http.post('/contact',{name:name})
    };
    this.updateContact=function(id,key,value){
        return $http.put('/contact',{
            id:id,
            key:key,
            value:value
        })
    };
    this.delete=function(ids){
        return $http({
            url:'/deleteContact',
            method:'post',
            data:{
                id:JSON.stringify(ids)
            }
        })
    }
}])

