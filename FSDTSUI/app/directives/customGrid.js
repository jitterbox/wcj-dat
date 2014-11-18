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
                        <div class="searchbtn"><input type="text" ng-model="filterOptions.search" placeholder="Search by Name" class="form-control" /></div>\
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
            $scope.totalServerItems = 0;
            $scope.filterOptions = {
                filterText: "",
                useExternalFilter: true,
                search: ''
            };
            $scope.pagingOptions = {
                pageSizes: [10, 15, 20],
                pageSize: 10,
                currentPage: 1
            };
            var defaultOptions = {
                data: 'myData',
                columnDefs: $scope.cols,
                selectedItems: $scope.selectedItems,
                enablePaging: true,
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
                    //   $scope.$apply();
                }
            };
            $scope.getPagedDataAsync = function (pageSize, page, searchText) {
                //  setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    // $http.get('largeLoad.json').success(function (largeLoad) {
                    //                    data = $scope.gridData.filter(function (item) {
                    //                        return (JSON.stringify(item).toLowerCase().indexOf(ft) != -1);
                    //                    });
                    data = $scope.gridData.filter(function (item) { // filter by name
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
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                //  }
            }, true);
            // $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

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

            $scope.onActionClick = function (selectedRow, actionName) {
                var actionObject = { 'selectedRow': selectedRow, 'actionName': actionName }
                $scope.actionHandler({ 'actionObject': actionObject });
            };

            $scope.rowSelection = function () {
                //Need to be implemented as required 
            };

        }

    };
}
]);

