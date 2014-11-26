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
    public class CommonProgramsGrouping
    {
        /// <summary>
        /// Gets or sets primary key attribute.
        /// </summary> 
        public int CommonProgramsGroupingId { get; set; }

        /// <summary>
        /// Gets or sets common grouping name.
        /// </summary>
         [FSDTS.Common.CustomValidators.Unique(ErrorMessage = "Common grouping name already exists.")]
        public string CommonProgramsGroupingName { get; set; }

        /// <summary>
        /// Gets or sets common grouping last edited on.
        /// </summary>
        public DateTime CommonProgramsGroupingLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets common grouping last edited by.
        /// </summary>
        public string CommonProgramsGroupingLastEditedBy { get; set; }

        /// <summary>
        /// Gets or sets IsDeleted: To check, Period deleted or not.
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}