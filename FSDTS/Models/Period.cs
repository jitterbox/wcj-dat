//-----------------------------------------------------------------------
// <copyright file="Organization.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------
namespace FSDTS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Web;

    /// <summary>
    /// Period class to decide fields.
    /// </summary>
    public class Period
    {
        /// <summary>
        /// Gets or sets PeriodId: Primary key (Auto-generated).
        /// </summary>
        public int PeriodId { get; set; }

        /// <summary>
        /// Gets or sets PeriodTitle: Name of the Period.
        /// </summary>
        [Required(ErrorMessage = "Please enter period title.")]
        [MaxLength(100, ErrorMessage = "Period Title should be less than 100 characters.")]
        public string PeriodTitle { get; set; }

        /// <summary>
        /// Gets or sets PeriodStartDate: Type of the organization.
        /// </summary>
        [Required]
        public DateTime PeriodStartDate { get; set; }

        /// <summary>
        /// Gets or sets PeriodEndDate: End date of period.
        /// </summary>
        [Required]
        public DateTime PeriodEndDate { get; set; }

        /// <summary>
        /// Gets or sets PeriodDeadlineDate: Dead line of period.
        /// </summary>
        public DateTime PeriodDeadlineDate { get; set; }

        /// <summary>
        /// Gets or sets PeriodYear: Start year of period.
        /// </summary>
        [Required]
        [MaxLength(4, ErrorMessage = "Period Year should be less than 5 digits.")]
        public string PeriodYear { get; set; }

        /// <summary>
        /// Gets or sets IsDeleted: To check, Period deleted or not.
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Setting foreign key attribute.
        /// </summary>
        public int ProjectId { get; set; }
    }
}