//-----------------------------------------------------------------------
// <copyright file="FilterConfig.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS
{
    using System.Web;
    using System.Web.Mvc;

    /// <summary>
    /// Class FilterConfig.
    /// </summary>
    public class FilterConfig
    {
        /// <summary>
        /// RegisterGlobalFilters method of FilterConfig class.
        /// </summary>
        /// <param name="filters">Global Filter Collection filters</param>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
