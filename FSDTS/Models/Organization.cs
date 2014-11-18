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
    /// Organization class to decide fields.
    /// </summary>
    public class Organization
    {
        /// <summary>
        /// Gets or sets OrganizationId: Primary key (Auto-generated).
        /// </summary>
        public int OrganizationId { get; set; }

        /// <summary>
        /// Gets or sets OrganizationName: Name of the organization.
        /// </summary>
        [Required(ErrorMessage = "Please enter organization name.")]
        [MaxLength(100, ErrorMessage = "Organization name should be less than 100 characters.")]
        public string OrganizationName { get; set; }

        /// <summary>
        /// Gets or sets OrganizationType: Type of the organization.
        /// </summary>
        [Required]
        public string OrganizationType { get; set; }

        /// <summary>
        /// Gets or sets OrganizationAddressLine1: Primary address of the organization.
        /// </summary>
        [Required(ErrorMessage = "Please enter address.")]
        [MaxLength(500, ErrorMessage = "Address should be less than 500 characters.")]
        public string OrganizationAddressLine1 { get; set; }

        /// <summary>
        /// Gets or sets OrganizationAddressLine2: Secondary address of the organization.
        /// </summary>
        public string OrganizationAddressLine2 { get; set; }

        /// <summary>
        /// Gets or sets OrganizationCity: City of the organization.
        /// </summary>
        [Required(ErrorMessage = "Please select your city.")]
        public string OrganizationCity { get; set; }

        /// <summary>
        /// Gets or sets OrganizationState: State of the organization.
        /// </summary>
        [Required(ErrorMessage = "Please select your state.")]
        public string OrganizationState { get; set; }

        /// <summary>
        /// Gets or sets OrganizationZip: Zip of the organization.
        /// </summary>
        [Required(ErrorMessage = "Please enter zip code.")]
        [MaxLength(20, ErrorMessage = "Please enter valid zip code.")]
        public string OrganizationZip { get; set; }

        /// <summary>
        /// Gets or sets OrganizationNotes: Notes related to organization.
        /// </summary>
        public string OrganizationNotes { get; set; }

        /// <summary>
        /// Gets or sets OrganizationStatus: Status (Active or inactive)
        /// </summary>
        [Required]
        public string OrganizationStatus { get; set; }

        /// <summary>
        /// Gets or sets Organization Last Edited On date.
        /// </summary>
        [Required]
        public DateTime OrganizationLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets Organization Last Edited By name.
        /// </summary>
        [Required]
        public string OrganizationLastEditedBy { get; set; }

        /// <summary>
        /// Gets or sets Program object associated with Organization.
        /// </summary>
        public virtual ICollection<Program> Program { get; set; }

        /// <summary>
        /// Gets or sets Course object associated with Organization.
        /// </summary>
        public virtual ICollection<Course> Course { get; set; }

        /// <summary>
        /// Gets or sets Credential object associated with Organization.
        /// </summary>
        public virtual ICollection<Credential> Credential { get; set; }
    }
}