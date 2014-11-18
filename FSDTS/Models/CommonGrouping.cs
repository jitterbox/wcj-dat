//-----------------------------------------------------------------------
// <copyright file="CommonGrouping.cs" company="FSD">
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
    /// CommonGrouping class to decide fields.
    /// </summary>
    public class CommonGrouping
    {
        /// <summary>
        /// Gets or sets primary key attribute.
        /// </summary>
        public int CommonGroupingId { get; set; }

        /// <summary>
        /// Gets or sets common grouping name.
        /// </summary>
        public string CommonGroupingName { get; set; }

        /// <summary>
        /// Gets or sets common grouping last edited on.
        /// </summary>
        public DateTime CommonGroupingLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets common grouping last edited by.
        /// </summary>
        public string CommonGroupingLastEditedBy { get; set; }
    }
}