/** Directive descriptions
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
fsdtsApp.directive('customGrid', ['appConstants', '$location', 'userProfileService','$compile','$timeout',
function (appConstants, $location, userProfileService, $compile, $timeout) {
    return {

        restrict: 'E',
        template: '<div>\
                    <!--Grid window-->\
                    <div  >\
                        <div class="searchbtn"><input type="text" ng-model="filterOptions.search" placeholder="Search by {{searchPlaceHolder}}" class="form-control" /></div>\
                        <div class="gridStyle" ng-grid="gridOptions" ></div>\
                    </div>\
                  </div>',
        scope: {
            gridData: '=',
            cols: '=',
            selectedItems: '=',
            customOptions: '=',
            papulateGrid: '=',
            showSpin: '=',
            actionHandler: '&',
            rowSelection: '&'
        },
        replace: true,
        transclude: false,
        link: function ($scope, elem, attr, ctrl) {
            // console.log($scope);
        },
        controller: function ($scope, $attrs, $element) {
            $scope.searchPlaceHolder = 'Name';
            $scope.totalServerItems = 0;
            $scope.filterOptions = {
                filterText: "",
                useExternalFilter: true,
                search: ''
            };
            
            //Check for pagination option
            if ($scope.customOptions && $scope.customOptions.pagingOptions) {//Custom pagination option
                $scope.pagingOptions = $scope.customOptions.pagingOptions;
            } else {//Take default configuration from config file
                $scope.pagingOptions = appConstants.GRID_PAGING_OPTION;
            }

            var defaultOptions = {
                data: 'myData',
                columnDefs: $scope.cols,
                selectedItems: $scope.selectedItems,
                enablePaging: $scope.pagingOptions.enablePaging,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                filterOptions: $scope.filterOptions,
                enableRowSelection: true,
                multiSelect: false,
                enableSorting: false
            };
            $scope.gridOptions = {};
            $scope.dataLoaded = false;
            angular.extend($scope.gridOptions, defaultOptions);

            //If custom placeholder is provided
            if ($scope.customOptions && $scope.customOptions.searchPlaceHolder) {
                $scope.searchPlaceHolder = $scope.customOptions.searchPlaceHolder;
            }

            $scope.setPagingData = function (data, page, pageSize) {
                var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
                $scope.myData = pagedData;
                $scope.totalServerItems = data.length;
                //Logic for no record found
                //if ($scope.myData.length > 0) {
                //    $timeout(function () {
                //        $element.find('.noRecordFoundMsg').remove();
                //    }, 0)
                    
                //} else {
                //    var msg = 'No matching records found';//(attrs.showEmptyMsg) ? attrs.showEmptyMsg : 'Nothing to display';
                //    var template = "<p class='noRecordFoundMsg'  ng-hide='data.length'>" + msg + "</p>";
                //    var tmpl = angular.element(template);
                //    $compile(tmpl)($scope);
                //    $timeout(function () {
                //        $element.find('.noRecordFoundMsg').remove();
                //        $element.find('.ngViewport').append(tmpl);
                //    }, 0);
                //}

                if (!$scope.$$phase) {
                      // $scope.$apply();
                }
            };

            $scope.getPagedDataAsync = function (pageSize, page, searchText) {
                //  setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    
                    data = $scope.gridData.filter(function (item) {
                        //Custom search by column
                        if ($scope.customOptions && $scope.customOptions.searchByColumn) {
                            return (JSON.stringify(item[$scope.customOptions.searchByColumn]).toLowerCase().indexOf(ft) != -1);
                        }

                        //By default seach by column is name
                        return (JSON.stringify(item.name).toLowerCase().indexOf(ft) != -1);
                    });
                    $scope.setPagingData(data, page, pageSize);
                    //  });
                } else {
                    // $http.get('largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData($scope.gridData, page, pageSize);
                    //   });
                }
                //  }, 10);
            };

            $scope.$watch('papulateGrid', function (newVal, oldVal) {
                //if (newVal !== oldVal) {
                if ($scope.pagingOptions.enablePaging === true) {// If paging is not enabled then pagesize is same as total number of record 
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                } else {
                    $scope.getPagedDataAsync($scope.gridData.length, 1);
                }
                //  }
            }, true);
            
            $scope.$watch('pagingOptions', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);

            $scope.$watch('filterOptions', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);

            $scope.$watch('filterOptions.search', function (value) {
                $scope.gridOptions.filterOptions.filterText = value;
            });

            //OnAction button click handler
            $scope.onActionClick = function (selectedRow, actionName) {
                var actionObject = { 'selectedRow': selectedRow, 'actionName': actionName }
                //Call to callBack method
                $scope.actionHandler({ 'actionObject': actionObject });
            };

            //OnRow
            $scope.rowSelection = function () {
                //Need to be implemented as required 
            };

        }

    };
}
]);

