/** Directive descriptions
*Used to provide common error window implementation for the application
*Can be used as a element as follows ,
  <error-window option="errorWindowOption"></error-window>
*  $scope.errorWindowOption = {
            showError:true,
            errorMessage:'test error'
        };
*/

'use strict';
fsdtsApp.directive('errorWindow', ['appConstants',
function (appConstants) {
    return {
        restrict: 'E',
        template: '<div class="container-popup" ng-show="option.showError">\
                    <div class="popup">\
                        <ul class="i-am-new" id="noty_topRight_layout_container" style="top: 317px; left: 41%; position: fixed; width: 310px; height: auto; margin: 0px; padding: 0px; list-style-type: none;z-index: 10000000;">\
                            <li style="overflow: hidden; border-top-left-radius: 3px; border-top-right-radius: 3px;border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(51, 51, 51);box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px; color: rgb(255, 255, 255); opacity: 1;width: 310px; background: rgb(51, 51, 51);">\
                                    <div class="noty_bar noty_type_alert" id="noty_1111981354166183400">\
                                        <div class="noty_message" style="font-size: 11px;text-align: left;position: relative;float: left;word-wrap: break-word;">\
                                            <div class="errorWindow noty_text"></div>\
                                               <ul style="float: left;margin: 16px 0 0 0;font-size: 13px;font-weight: normal;width: 230px;">\
                                                <li ng-repeat="errorMessage in option.errorMessages" style="list-style-type: circle;word-wrap: break-word;">\
                                                  {{errorMessage}}\
                                                </li>\
                                              </ul>\
                                        </div>\
                                        <div class="noty_buttons" style="padding: 5px; text-align: right; border-top-width: 0px;background-color: rgb(51, 51, 51);">\
                                            <button type="button" class="btn btn-danger btn-clean" id="button-1" style="margin-left: 5px;" ng-click="onOkHandler()">\
                                            Ok</button>\
                                        </div>\
                                    </div>\
                            </li>\
                        </ul>\
                    </div>\
                   </div>',
        scope: {
            option: '=',
        },
        replace: true,
        transclude: false,
        link: function ($scope, elem, attr, ctrl) {
            // console.log($scope);
        },
        controller: function ($scope, $attrs) {
            $scope.onOkHandler = function () {
                $scope.option.showError = false;
            };
        }
    };
}
]);

