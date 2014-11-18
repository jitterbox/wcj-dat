//-----------------------------------------------------------------------
// <copyright file="ProjectItemMatch.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------
namespace FSDTS.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    /// <summary>
    /// ProjectItemMatch class to decide fields.
    /// </summary>
    public class ProjectItemMatch
    {
        /// <summary>
        /// Gets or sets key attribute.
        /// </summary>
        public int ProjectItemMatchId { get; set; }

        /// <summary>
        /// Gets or sets foreign key attribute.
        /// </summary>
        public int ProjectId { get; set; }

        /// <summary>
        /// Gets or sets foreign key attribute.
        /// </summary>
        public int ItemId { get; set; }
    }
}