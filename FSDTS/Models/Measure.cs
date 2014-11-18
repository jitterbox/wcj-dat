//-----------------------------------------------------------------------
// <copyright file="Measure.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Web;

    /// <summary>
    /// Measure class to decide fields.
    /// </summary>
    public class Measure
    {
        /// <summary>
        /// Gets or sets MeasureId: Primary key (Auto-generated).
        /// </summary>
        public int MeasureId { get; set; }

        /// <summary>
        /// Gets or sets MeasureDescription: Description of the measure.
        /// </summary>
        [Required(ErrorMessage = "Please enter measure description.")]
        [MaxLength(500, ErrorMessage = "Measure description should be less than 500 characters.")]
        public string MeasureDescription { get; set; }

        /// <summary>
        /// Gets or sets Measure Last Edited On date.
        /// </summary>
        [Required]
        public DateTime MeasureLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets Measure Last Edited By name.
        /// </summary>
        [Required]
        public string MeasureLastEditedBy { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether it is deleted or not (Field used for Soft delete functionality). 
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Gets or sets foreign key attribute. 
        /// </summary>
        public int ProjectId { get; set; }
    }
}