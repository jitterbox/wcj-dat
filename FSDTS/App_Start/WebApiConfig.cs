//-----------------------------------------------------------------------
// <copyright file="WebApiConfig.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------
namespace FSDTS
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Cors;
    using Microsoft.Owin.Security.OAuth;
    using Newtonsoft.Json.Serialization;
    //using System.Web.Http.OData;

    /// <summary>
    /// WebApiConfig class.
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// Register method of WebApiConfig class.
        /// </summary>
        /// <param name="config">HttpConfiguration config</param>
        public static void Register(HttpConfiguration config)
        {
            //// Web API configuration and services
            //// Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            ////config.EnableQuerySupport();
            ////var cors = new EnableCorsAttribute("*", "*", "*");
            ////config.EnableCors(cors);

            //// Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            config.Formatters.Remove(config.Formatters.XmlFormatter);

            var json = config.Formatters.JsonFormatter;

            json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
            json.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
        }
    }
}
