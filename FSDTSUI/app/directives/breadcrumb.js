/** Directive descriptions
* Used to provide breadcrumb support to the application
*Can be used as a element as follows ,
    <breadcrumb></breadcrumb>
*
*/
//TODO: Optimization : Optimization required 
'use strict';
fsdtsApp.directive('breadcrumb', ['$location', '$compile',
    function ($location, $compile) {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            transclude: true,
            /*jshint multistr: true */
            template: '<div>\
                        <div ng-transclude></div>\
                     </div>',
            link: function (scope, iElement, attr, ctrl) {
                scope.$watch('breadcrumbs', function () {
                    //Remove all existing breadcrumbs
                    iElement.find("*").remove();
                    //Getting the last breadcrumb element
                    var ultimo = scope.breadcrumbs[scope.breadcrumbs.length - 1];
                    var e; var t = '<ol class="breadcrumb" >';
                    angular.forEach(scope.breadcrumbs, function (value, key) {
                        if (ultimo == value) {
                            t = t + '<li class="active">' + value.label + '</li>';
                        }
                        else {
                            t = t + '<li><a  ng-href="#' + value.path + '" >' + value.label + '</a> </li>';
                        }
                    });

                    t = t + '</ol>';
                    e = angular.element(t);
                    var c = $compile(e)(scope);
                    iElement.append(c);
                }, true)
               
            },
            controller: function ($scope, $element, $attrs, $cookieStore) {

            }

        };
    }
]);