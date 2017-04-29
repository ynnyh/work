/**
 * Created by Administrator on 2017/2/10.
 */
angular.module('work.note', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/note', {
            templateUrl: 'note/note.html',
            controller: 'noteController'
        });
    }])
    .service('noteService', function () {
        this.getNotes = function () {
            if (localStorage.arr) {
                return JSON.parse(localStorage.arr);
            } else {
                return [];
            }
        };
        this.saveNotes = function (v) {
            localStorage.arr = JSON.stringify(v);
        }
    })
    .controller('noteController', ['$scope', 'noteService', function ($scope, noteService) {
        $scope.lists = noteService.getNotes();
        $scope.$watch('lists', function (v) {
            noteService.saveNotes(v);
        }, true);
        //增
        $scope.add = function (e) {
            var colors = ['primary', 'info', 'success', 'warning', 'danger'];
            var id = $scope.lists.length;
            var title = 'Note';
            var content = '';
            var color = colors[Math.floor(Math.random() * 5)];
            var position = {
                left: e.clientX - 125,
                top: e.clientY - 70
            };
            var eg = {id: id, title: title, color: color, position: position, content: content};
            $scope.lists.push(eg);
        };
//    删
        $scope.del = function (id) {
            var arr = [];
            $scope.lists.forEach(function (v, i) {
                if (v.id !== id) {
                    return arr.push(v);
                }
            });
            $scope.lists = arr;
        };
    }])
    .directive('noteHeader', function () {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'top/header.html'
        }
    })
    .directive('noteContent', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                data: '=',
                position: '=',
                dele: '&',
                colors: '='
            },
            link: function (scope, element, attr) {
                var left = scope.position.left;
                var top = scope.position.top;
                element.on('mousedown', '.panel-heading', function (e) {
                    var x = e.clientX;
                    var y = e.clientY;
                    $(this).closest('.panel').css('z-index', 10000);
                    $(document).on('mousemove', function (e) {
                        left = scope.position.left + e.clientX - x;
                        top = scope.position.top + e.clientY - y;
                        element.css({
                            left: left,
                            top: top
                        })
                    });
                });
                element.on('mouseup', function () {
                    scope.$apply(function () {
                        scope.position = {
                            left: left,
                            top: top
                        }
                    })
                });
                $(document).on('mouseup', '.panel-heading', function () {
                    $(this).closest('.panel').css('z-index', 0);
                    $(document).off('mousemove');
                })
            },
            templateUrl: 'top/card.html'
        }
    })