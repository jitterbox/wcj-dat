/**  Service descriptions
 *Used to provide all the functionality required for course module
    
 *Expose method :
    addCourse(courseInfo)
    post data format :
    var postData = {
            "CourseName": "Course-1",
            "CourseDescription": "sample string 3",
            "CourseStatus": true,
            "OrganizationsId": 1
        };

    editCourse(courseInfo)
    getCourseDetails(courseId)
*/

'use strict';
fsdtsApp.factory('courseManagementService', ['httpHelper', 'appConstants', 'userProfileService',
    function (httpHelper, appConstants, userProfileService) {
        var serviceInstance = {};

        /** Adding new course 
        * Method:   addCourse
        * Access:   Public 
        * @param    courseInfo object
        * @return   promise
        */
        serviceInstance.addCourse = function (courseInfo) {
            var postData = getPostData(courseInfo);
            return httpHelper.post(appConstants.API_END_POINTS.COURSE, postData);
        };

        /** Edit existing course 
        * Method:   editCourse
        * Access:   Public 
        * @param    courseInfo object
        * @return   promise
        */
        serviceInstance.editCourse = function (courseInfo) {
            var postData = getPostData(courseInfo, appConstants.OPERATION_TYPE.EDIT);
            return httpHelper.put(appConstants.API_END_POINTS.COURSE + userProfileService.profile.params.courseId, postData);
        };

        /** Return course details by courseId
        * Method:   getCourseDetails
        * Access:   Public 
        * @param    coursesId
        * @return   promise
        */
        serviceInstance.getCourseDetails = function (coursesId) {
            if (coursesId) {//If not pass programId then it returns all courses
                return httpHelper.get(appConstants.API_END_POINTS.COURSE + coursesId);
            } else {
                return httpHelper.get(appConstants.API_END_POINTS.COURSE+'?Oid=' + userProfileService.profile.params.organizationId);
            }
        };

        /** Return client course data model by mapping to the server data model
        * Method:   populateCourseModel
        * Access:   Public 
        * @param    Course details server  response
        * @return   courseInfo object
        */
        serviceInstance.populateCourseModel = function (serverResponseObj) {
            var courseInfo = {};
            if (serverResponseObj) {
                courseInfo = {
                    'courseId': serverResponseObj.CourseId || '', //If courseId is null or undefine then initialized with empty string
                    'name': serverResponseObj.CourseName || '',
                    'description': serverResponseObj.CourseDescription || '',
                    'status': serverResponseObj.CourseStatus,
                    'editedOn': serverResponseObj.CourseLastEditedOn,
                    'editedBy': serverResponseObj.CourseLastEditedBy
                };
            }
            return courseInfo;

        };

        /** Create the post data required by service for add/edit/get course 
        * Method:   getPostData
        * Access:   Private 
        * @param    courseInfo object
        * @return   postData object
        */
        var getPostData = function (courseInfo, actionType) {
            var postData = null;
            try {
                postData = {
                    'CourseName': courseInfo.name,
                    'CourseDescription': courseInfo.description,
                    'CourseStatus': courseInfo.status,
                    'OrganizationId': userProfileService.profile.params.organizationId,
                    "CourseLastEditedOn": new Date().yyyymmdd(),//"2014-11-05T12:31:29.5629962+05:30",
                    "CourseLastEditedBy": userProfileService.profile.credentials.userName
                };
                if (actionType === appConstants.OPERATION_TYPE.EDIT) {
                    postData.CourseId = userProfileService.profile.params.courseId;
                }
            } catch (e) {
                console.log('Error on creating postData', e);
            }
            return postData;
        };

        return serviceInstance;
    }
]);