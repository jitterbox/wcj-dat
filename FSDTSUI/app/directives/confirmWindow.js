﻿/** Directive descriptions
*Used to provide common grid implementation for the application
*Can be used as a element as follows ,
    <custom-grid  
    grid-data="gridData"  
    cols="columnDefs"
    selected-items="selectedItems"
    custom-options="gridOptions"
    papulate-grid="papulateGrid"
    action-handler="onActionClick(actionObject)">
    </custom-grid>
*
*/

'use strict';
fsdtsApp.directive('confirmWindow', ['appConstants', '$location', 'userProfileService',
function (appConstants, $location, userProfileService) {
    return {
        restrict: 'E',
        template: '<div class="container-popup" ng-show="option.showConfirm">\
                    <div class="popup">\
                        <ul class="i-am-new" id="noty_topRight_layout_container" style="top: 317px; left: 41%; position: fixed; width: 310px; height: auto; margin: 0px; padding: 0px; list-style-type: none;z-index: 10000000;">\
                            <li style="overflow: hidden; border-top-left-radius: 3px; border-top-right-radius: 3px;border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid rgb(51, 51, 51);box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px; color: rgb(255, 255, 255); opacity: 1;width: 310px; background: rgb(51, 51, 51);">\
                                    <div class="noty_bar noty_type_alert" id="noty_1111981354166183400">\
                                        <div class="noty_message" style="font-size: 11px; line-height: 14px; text-align: left;padding: 8px 10px 9px; width: auto; position: relative;">\
                                            <span class="noty_text">Do you want to continue?</span>\
                                        </div>\
                                        <div class="noty_buttons" style="padding: 5px; text-align: right; border-top-width: 0px;background-color: rgb(51, 51, 51);">\
                                            <button type="button" class="btn btn-success btn-clean" id="button-0" style="margin-left: 0px;" ng-click="onOkHandler()">\
                                            Ok</button>\
                                            <button type="button" class="btn btn-danger btn-clean" id="button-1" style="margin-left: 5px;" ng-click="OnCancelHandler()">\
                                            Cancel</button>\
                                        </div>\
                                    </div>\
                            </li>\
                        </ul>\
                    </div>\
                   </div>',
        scope: {
            option:'=',
            actionHandler: '&',
        },
        replace: true,
        transclude: false,
        link: function ($scope, elem, attr, ctrl) {
        },
        controller: function ($scope, $attrs) {
            //on ok handler
            $scope.onOkHandler = function () {
                $scope.option.showConfirm=false;
                $scope.actionHandler({'actionType':$scope.option.actionType,'isConfirmed':true});
            };
            //on cancel handler
            $scope.OnCancelHandler = function () {
                $scope.option.showConfirm=false;
                $scope.actionHandler({'actionType':$scope.option.actionType,'isConfirmed':false});
            };

        }

    };
}
]);

