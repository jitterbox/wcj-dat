//-----------------------------------------------------------------------
// <copyright file="Program.cs" company="FSD">
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
    /// Program class to decide fields.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Gets or sets ProgramId: Primary key (Auto-generated).
        /// </summary>
        public int ProgramId { get; set; }

        /// <summary>
        /// Gets or sets ProgramName: Name of the program.
        /// </summary>
        [Required(ErrorMessage = "Please enter program name.")]
        [MaxLength(100, ErrorMessage = "Program name should be less than 100 characters.")]
        public string ProgramName { get; set; }

        /// <summary>
        /// Gets or sets ProgramDescription: Description of the Program.
        /// </summary>

        [Required(ErrorMessage = "Please enter program description.")]
        [MaxLength(500, ErrorMessage = "Program description should be less than 500 characters.")]
        public string ProgramDescription { get; set; }

        /// <summary>
        /// Gets or sets CommonPrograms: Description of the Common Program
        /// </summary>
        public string CommonPrograms { get; set; }

        /// <summary>
        /// Gets or sets ProgramStatus: Status (Active or inactive)
        /// </summary>
        [Required]
        public string ProgramStatus { get; set; }

        /// <summary>
        /// Gets or sets OrganizationId: Foreign key from Organization table.
        /// </summary>
        public int OrganizationId { get; set; }


        [Required]
        public DateTime ProgramLastEditedOn { get; set; }

        [Required]
        public string ProgramLastEditedBy { get; set; }
    }
}