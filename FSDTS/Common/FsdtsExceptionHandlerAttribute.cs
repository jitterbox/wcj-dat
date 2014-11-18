//-----------------------------------------------------------------------
// <copyright file="FsdtsExceptionHandlerAttribute.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Common
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web;
    using System.Web.Http;
    using System.Web.Http.Filters;
    using System.Web.Mvc;
    using System.Web.UI.WebControls;

    /// <summary>
    /// FsdtsExceptionHandlerAttribute class to handle exceptions.
    /// </summary>
    public class FsdtsExceptionHandlerAttribute : ExceptionFilterAttribute
    {
        /// <summary>
        /// Overriding OnException method of ExceptionFilterAttribute class which will return user friendly messages in response.
        /// </summary>
        /// <param name="httpActionExecutedContext">HttpActionExecutedContext httpActionExecutedContext</param>
        public override void OnException(HttpActionExecutedContext httpActionExecutedContext)
        {
            if (httpActionExecutedContext.Exception != null)
            {
                var exceptionType = httpActionExecutedContext.Exception.GetType();
                string exceptionMessages = httpActionExecutedContext.Exception.Message;

                httpActionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(string.Format(exceptionMessages)),
                    ReasonPhrase = exceptionMessages
                };
            }
        }
    }
}