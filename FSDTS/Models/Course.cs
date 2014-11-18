//-----------------------------------------------------------------------
// <copyright file="Course.cs" company="FSD">
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
    /// Course class to decide fields.
    /// </summary>
    public class Course
    {
        /// <summary>
        /// Gets or sets CourseId: Primary key (Auto-generated).
        /// </summary>
        public int CourseId { get; set; }

        /// <summary>
        /// Gets or sets CourseName: Name of the course.
        /// </summary>
        [Required(ErrorMessage="Please enter course name.")]
        [MaxLength(100, ErrorMessage = "Course name should be less than 100 characters.")]
        public string CourseName { get; set; }

        /// <summary>
        /// Gets or sets CourseDescription: Description of the course.
        /// </summary>
        [Required(ErrorMessage = "Please enter course description.")]
        [MaxLength(500, ErrorMessage = "Course description should be less than 500 characters.")]
        public string CourseDescription { get; set; }

        /// <summary>
        /// Gets or sets CourseStatus: Status (Active or inactive)
        /// </summary>
        [Required]
        public string CourseStatus { get; set; }

        /// <summary>
        /// Gets or sets OrganizationId: Foreign key from Organization table.
        /// </summary>
        [Required]
        public int OrganizationId { get; set; }

        /// <summary>
        /// Gets or sets Course Last Edited On date.
        /// </summary>
        [Required]
        public DateTime CourseLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets Course Last Edited By name.
        /// </summary>
        [Required]
        public string CourseLastEditedBy { get; set; }

        ////public virtual Organizations Organizations { get; set; }
    }
}