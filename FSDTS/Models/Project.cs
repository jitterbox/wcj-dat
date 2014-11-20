//-----------------------------------------------------------------------
// <copyright file="Project.cs" company="FSD">
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
    /// Project class to decide fields.
    /// </summary>
    public class Project
    {
        /// <summary>
        /// Gets or sets ProjectId: Primary key (Auto-generated).
        /// </summary>
        public int ProjectId { get; set; }

        /// <summary>
        /// Gets or sets ProjectName: Name of the project.
        /// </summary>
        [Required(ErrorMessage = "Please enter project name.")]
        [MaxLength(ErrorMessage = "Project name should be less than 100 characters.")]
        public string ProjectName { get; set; }

        /// <summary>
        /// Gets or sets ProjectType: Type of the project.
        /// </summary>
        public string ProjectType { get; set; }

        /// <summary>
        /// Gets or sets ProjectDescription: Description of the project.
        /// </summary>
        [Required(ErrorMessage = "Please enter project description.")]
        [MaxLength(ErrorMessage = "Project description should be less than 500 characters.")]
        public string ProjectDescription { get; set; }

        /// <summary>
        /// Gets or sets ProjectStartYear: Start Year of the project.
        /// </summary>
        [Required]
        [RegularExpression("^[a-zA-Z]$", ErrorMessage = "Please add numbers as a year and not alphabets.")]
      //  [DataType(, ErrorMessage= "Please add numbers as a year and not alphabets.")]
        [FSDTS.Common.CustomValidators.ValidateYear(ErrorMessage = "Start year has to be less than end year.")]
        public string ProjectStartYear { get; set; }

        /// <summary>
        /// Gets or sets ProjectEndYear: End Year of the project.
        /// </summary>
        [Required]
    //    [RegularExpression("^[a-zA-Z]$", ErrorMessage = "Please add numbers as a year and not alphabets.")]
        public string ProjectEndYear { get; set; }

        /// <summary>
        /// Gets or sets ProjectSponsor: Project Sponsor of the project.
        /// </summary>
        public string ProjectSponsor { get; set; }

        /// <summary>
        /// Gets or sets ProjectStatus: Project Status of the project.
        /// </summary>
        [Required]
        public string ProjectStatus { get; set; }

        /// <summary>
        /// Gets or sets Project Last Edited On date.
        /// </summary>
        [Required]
        public DateTime ProjectsLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets Project Last Edited By name.
        /// </summary>
        [Required]
        public string ProjectsLastEditedBy { get; set; }
    }
}