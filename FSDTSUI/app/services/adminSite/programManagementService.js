/**  Service descriptions
 *Used to provide all the functionality required for program module
 *Expose method :
    addprogram(programInfo)
    post data format :
        var postData = {
            "ProgramsName": "sample string 1",
            "ProgramsDescription": "sample string 3",
            "CommonPrograms": "sample string 4",
            "ProgramsStatus": true,
            "OrganizationsId": 1
        }
  getCourseDetails(coursesId)
  editCourse(courseInfo)
*/

'use strict';
fsdtsApp.factory('programManagementService', ['httpHelper', 'appConstants', 'userProfileService',
function (httpHelper, appConstants, userProfileService) {
    var serviceInstance = {};

    /** Adding new program 
    * Method:   addProgram
    * Access:   Public 
    * @param    programInfo object
    * @return   promise
    */
    serviceInstance.addProgram = function (programInfo) {
        var postData = getPostData(programInfo);
        return httpHelper.post(appConstants.API_END_POINTS.ADD_PROGRAM, postData);
    };

    /** Adding edit existing program 
    * Method:   editProgram
    * Access:   Public 
    * @param    programInfo object
    * @return   promise
    */
    serviceInstance.editProgram = function (programInfo) {
        var postData = getPostData(programInfo, appConstants.OPERATION_TYPE.EDIT);
        return httpHelper.put(appConstants.API_END_POINTS.EDIT_PROGRAM + userProfileService.profile.params.programId, postData);
    };

    /** Return program details by courseId
    * Method:   getProgramDetails
    * Access:   Public 
    * @param    programId
    * @return   promise
    */
    serviceInstance.getProgramDetails = function (programId) {
        if (programId) {//If not pass programId then it returns all program
            return httpHelper.get(appConstants.API_END_POINTS.GET_PROGRAM + programId);
        } else {
            return httpHelper.get(appConstants.API_END_POINTS.GET_PROGRAM + '?Oid=' + userProfileService.profile.params.organizationId);
        }
    };

    /** Return client program data model by mapping to the server data model
    * Method:   populateProgramModel
    * Access:   Public 
    * @param    Program details server  response
    * @return   programInfo object
    */
    serviceInstance.populateProgramModel = function (serverResponseObj) {
        var programInfo = {};
        if (serverResponseObj) {
            programInfo = {
                'programId': serverResponseObj.ProgramId,
                'name': serverResponseObj.ProgramName || '', //If ProgramName is null or undefine then initialized with empty string
                'description': serverResponseObj.ProgramDescription || '',
                'commonProgramName': serverResponseObj.CommonPrograms || '',
                'status': serverResponseObj.ProgramStatus,
                'organizationId': serverResponseObj.OrganizationId,
                'editedOn': serverResponseObj.ProgramLastEditedOn,
                'editedBy': serverResponseObj.ProgramLastEditedBy
            };
        }
        return programInfo;
    };

    /** Create the post data required by service for add/edit/get program 
    * Method:   getPostData
    * Access:   Private 
    * @param    Program details server  response
    * @return   postData object
    */
    var getPostData = function (programInfo, actionType) {
        var postData = null;
        try {
            postData = {
                'ProgramName': programInfo.name,
                'ProgramDescription': programInfo.description,
                'CommonPrograms': programInfo.commonProgramName,
                'ProgramStatus': programInfo.status,
                'OrganizationId': userProfileService.profile.params.organizationId,
                "programLastEditedOn": new Date().yyyymmdd(),//"2014-11-05T12:31:29.5629962+05:30",
                "programLastEditedBy": userProfileService.profile.credentials.userName
            };
            if (actionType === appConstants.OPERATION_TYPE.EDIT) {
                postData.ProgramId = userProfileService.profile.params.programId;
            }
        } catch (e) {
            console.log('Error on creating postData', e);
        }
        return postData;
    };

    return serviceInstance;
} ]);