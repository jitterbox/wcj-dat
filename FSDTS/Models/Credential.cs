//-----------------------------------------------------------------------
// <copyright file="Credential.cs" company="FSD">
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
    /// Credential class to decide fields.
    /// </summary>
    public class Credential
    {
        /// <summary>
        /// Gets or sets CredentialId: Primary key (Auto-generated).
        /// </summary>
        public int CredentialId { get; set; }

        /// <summary>
        /// Gets or sets CredentialName: Name of the credential.
        /// </summary>
        [Required(ErrorMessage = "Please enter credential name.")]
        [MaxLength(100, ErrorMessage = "Credential name should be less than 100 characters.")]
        public string CredentialName { get; set; }

        /// <summary>
        /// Gets or sets CredentialDescription: Description of the credential.
        /// </summary>
        [Required(ErrorMessage = "Please enter credential description.")]
        [MaxLength(500, ErrorMessage = "Credential description should be less than 500 characters.")]
        public string CredentialDescription { get; set; }

        /// <summary>
        /// Gets or sets CredentialStatus: Status (Active or inactive)
        /// </summary>
        [Required]
        public string CredentialStatus { get; set; }

        /// <summary>
        /// Gets or sets OrganizationId: Foreign key from Organization table.
        /// </summary>
        [Required]
        public int OrganizationId { get; set; }

        /// <summary>
        /// Gets or sets Credential Last Edited On date.
        /// </summary>
        [Required]
        public DateTime CredentialLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets Credential Last Edited By name.
        /// </summary>
        [Required]
        public string CredentialLastEditedBy { get; set; }

        ////public virtual Organizations Organizations { get; set; }
    }
}