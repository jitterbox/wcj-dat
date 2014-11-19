/**  Service descriptions
 *Used to provide all the functionality required for project module
    
 *Expose method :
    addprogram(projectInfo)
    post data format :
    var postData = {
        "ProjectId": 1,
        "ProjectName": "sample string 2",
        "ProjectDescription": "sample string 3",
        "ProjectStartYear": "sample string 4",
        "ProjectEndYear": "sample string 5",
        "ProjectSponsor": "sample string 6",
        "ProjectsLastEditedOn": "2014-11-05T12:31:29.5629962+05:30",
        "ProjectsLastEditedBy": "sample string 8"
  }
   editProject(projectInfo)
   geProjectDetails(projectId)
*/

'use strict';
fsdtsApp.factory('projectManagementService', ['httpHelper', '$q', 'appConstants', 'userProfileService',
function (httpHelper, $q, appConstants, userProfileService) {
    var serviceInstance = {};

    /** Adding new project
    * Method:   addProject
    * Access:   Public 
    * @param    projectInfo object
    * @return   promise
    */
    serviceInstance.addProject = function (projectInfo) {
        var postData = getPostData(projectInfo);
        return httpHelper.post(appConstants.API_END_POINTS.ADD_PROJECT, postData);
    };

    /** Edit existing project 
    * Method:   editProject
    * Access:   Public 
    * @param    projectInfo object
    * @return   promise
    */
    serviceInstance.editProject = function (projectInfo) {
        var postData = getPostData(projectInfo, appConstants.OPERATION_TYPE.EDIT);
        return httpHelper.put(appConstants.API_END_POINTS.EDIT_PROJECT + userProfileService.profile.params.projectId, postData);
    };

    /** Return project details by projectId
    * Method:   getProjectDetails
    * Access:   Public 
    * @param    projectId
    * @return   promise
    */
    serviceInstance.getProjectDetails = function (projectId) {
        if (projectId) {//If not pass programId then it returns all courses
            return httpHelper.get(appConstants.API_END_POINTS.GET_PROJECT + projectId);
        } else {
            return httpHelper.get(appConstants.API_END_POINTS.GET_PROJECT);
        }
    };

    /**
    Populate project UI model by mapping server model
    */

    /** Return client project data model by mapping to the server data model
    * Method:   populateProjectModel
    * Access:   Public 
    * @param    Project details server  response
    * @return   projectInfo object
    */
    serviceInstance.populateProjectModel = function (serverResponseObj) {
        var projectInfo = {};
        if (serverResponseObj) {
            projectInfo = {
                'projectId': serverResponseObj.ProjectId || '', //If courseId is null or undefine then initialized with empty string
                'name': serverResponseObj.ProjectName || '',
                'type': serverResponseObj.ProjectType || '',
                'description': serverResponseObj.ProjectDescription || '',
                'sponcer': serverResponseObj.ProjectSponsor || '',
                'startYear': serverResponseObj.ProjectStartYear || '',
                'endYear': serverResponseObj.ProjectEndYear || '',
                'status': serverResponseObj.ProjectStatus,
                'editedOn': serverResponseObj.ProjectsLastEditedOn,
                'editedBy': serverResponseObj.ProjectsLastEditedBy
            };
        }
        return projectInfo;
    };

    /** Create the post data required by service for add/edit/get project 
    * Method:   getPostData
    * Access:   Private 
    * @param    projectInfo object
    * @return   postData object
    */

    var getPostData = function (projectInfo, actionType) {
        var postData = {
            'ProjectName': projectInfo.name,
            'ProjectDescription': projectInfo.description,
            'ProjectStartYear': projectInfo.startYear,
            'ProjectEndYear': projectInfo.endYear,
            'ProjectSponsor': projectInfo.sponcer,
            'ProjectStatus': projectInfo.status,
            'ProjectsLastEditedOn':new Date().yyyymmdd(),//"2014-11-05T12:31:29.5629962+05:30",
            'ProjectsLastEditedBy': userProfileService.profile.credentials.userName
        };
        if (actionType === appConstants.OPERATION_TYPE.EDIT) {
            postData.ProjectId = userProfileService.profile.params.projectId;
        }
        return postData;
    };

    return serviceInstance;
}
]);