using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;

namespace FSDTS.Common
{
    public class FsdtsCommonMethods
    {
        [FsdtsExceptionHandler]
        public static void NullValueHandler(string itemType)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage.StatusCode = HttpStatusCode.NotFound;

            switch (itemType)
            {
                case "Courses":
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.CourseNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.CourseNotFound);
                    break;
                case "Programs":
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.ProgramNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.ProgramNotFound);
                    break;
                case "Projects" :
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.ProjectNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.ProjectNotFound);
                    break;
                case "Users":
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.UserNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.UserNotFound);
                    break;
                case "Periods":
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.PeriodNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.PeriodNotFound);
                    break;
                case "Organizations":
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.OrganizationNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.OrganizationNotFound);
                    break;
                case "Measures":
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.MeasureNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.MeasureNotFound);
                    break;
                case "Credentials":
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.CredentialNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.CredentialNotFound);
                    break;
                default:
                    httpResponseMessage.ReasonPhrase = FsdtsConstants.ItemNotFound;
                    httpResponseMessage.Content = new StringContent(FsdtsConstants.ItemNotFound);
                    break;
            }
            throw new HttpResponseException(httpResponseMessage);
        }


        public static bool SendEmail(string toEmailId, string subject, string body)
        {
           // FsdtsCommonMethods.SendEmail("sender's email id", "testsubject", "testbody");
             NetworkCredential NetworkCredentials = new System.Net.NetworkCredential(FsdtsConstants.SenderEmailId, FsdtsConstants.SenderPassword);
            
                SmtpClient smtpClient = new SmtpClient
                {
                    Host = FsdtsConstants.SMTPHost,
                    Port = FsdtsConstants.SMTPPort,
                    EnableSsl = true,
                    DeliveryMethod = FsdtsConstants.SMTPDeliveryMethod,
                    Credentials = NetworkCredentials,
                    Timeout = 30000,
                };

                MailMessage message = new MailMessage(FsdtsConstants.SenderEmailId, toEmailId, subject, body);

                smtpClient.Send(message);

                return true;
        }
    }
}