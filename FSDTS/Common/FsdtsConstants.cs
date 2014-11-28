//-----------------------------------------------------------------------
// <copyright file="FsdtsConstants.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Common
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Mail;
    using System.Web;

    /// <summary>
    /// FsdtsConstants class contains all constant values required in overall application.
    /// </summary>
    public class FsdtsConstants
    {
        /// <summary>
        /// In case Course returns Null.
        /// </summary>
        public const string CourseNotFound = "Course you are searching not found.";

        /// <summary>
        /// In case Program returns Null.
        /// </summary>
        public const string ProgramNotFound = "Program you are searching not found.";

        /// <summary>
        /// In case Project returns Null.
        /// </summary>
        public const string ProjectNotFound = "Project you are searching not found.";

        /// <summary>
        /// In case User returns Null. 
        /// </summary>
        public const string UserNotFound = "User you are searching not found.";

        /// <summary>
        /// In case Period returns Null.
        /// </summary>
        public const string PeriodNotFound = "Period you are searching not found.";

        /// <summary>
        /// In case Organization returns Null. 
        /// </summary>
        public const string OrganizationNotFound = "Organization you are searching not found.";

        /// <summary>
        /// In case Measure returns Null. 
        /// </summary>
        public const string MeasureNotFound = "Measure you are searching not found.";

        /// <summary>
        /// In case Credential returns Null.
        /// </summary>
        public const string CredentialNotFound = "Credential you are searching not found.";

        /// <summary>
        /// In case Item returns Null.
        /// </summary>
        public const string ItemNotFound = "Item you are searching not found.";

        #region Fields used for Notification (Email) functionality

        public const string SenderEmailId = "extentia1@gmail.com"; ////  "webauth@extentia.com"

        public const string SenderPassword = "Mobile1234"; //// Mobile1234  !^EhP@authsite291

        public const string SMTPHost = "smtp.gmail.com"; //// smtp.gmail.com  mail.extentia.com

        public const int SMTPPort = 587;

        public const System.Net.Mail.SmtpDeliveryMethod SMTPDeliveryMethod = SmtpDeliveryMethod.Network;
        
        #endregion

        #region Generic fields used across all the controllers
        /// <summary>
        /// For Get() method (Ex. GetCourse(), GetProgram() etc.)
        /// </summary>
        public const string GettingItemList = "Getting item list.";

        /// <summary>
        /// Giving plane message.
        /// </summary>
        public const string ItemWithSpecificID = "Item with ID: ";

        /// <summary>
        /// Giving plane message.
        /// </summary>
        public const string InvalidModelState = "ModelState is not valid.";

        /// <summary>
        /// Giving plane message.
        /// </summary>
        public const string UpdatingDatabase = "Saving changes to database.";

        /// <summary>
        /// Giving plane message.
        /// </summary>
        public const string ExceptionOccured = "Exception occured.";

        /// <summary>
        /// Giving plane message.
        /// </summary>
        public const string SendingStatusCode = "Sending StatusCode as: ";

        /// <summary>
        /// Giving plane message.
        /// </summary>
        public const string AddingNewItem = "Adding new item as: ";
        #endregion
    }

    public class FsdtsEnums
    {
        public enum SearchByIDResult
        {
            Success = 1,
            Failure = 2
        }
    }
}