/**
 * Created by Administrator on 2017/2/15.
 */
angular.module('work',[
    'ngRoute',
    'work.todo',
    'work.contact',
    'work.note',
    'work.index'
])
.config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo:'/todo'});
}])