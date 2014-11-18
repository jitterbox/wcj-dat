//-----------------------------------------------------------------------
// <copyright file="User.cs" company="FSD">
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
    /// User class to decide fields.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Gets or sets UserId: Primary key (Auto-generated).
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets UserFirstName: First Name of the user.
        /// </summary>
        [Required(ErrorMessage = "Please enter your first name.")]
        [MaxLength(100, ErrorMessage = "First name should be less than 100 characters.")]
        public string UserFirstName { get; set; }

        /// <summary>
        /// Gets or sets UserLastName: Last Name of the user.
        /// </summary>
        [Required(ErrorMessage = "Please enter your last name.")]
        [MaxLength(100, ErrorMessage = "Last name should be less than 100 characters.")]
        public string UserLastName { get; set; }

        /// <summary>
        /// Gets or sets UserEmail: Email address of the user.
        /// </summary>
        [EmailAddress(ErrorMessage = "Please enter valid email address.")]
        public string UserEmail { get; set; }

        /// <summary>
        /// Gets or sets UserAddressLine1: Primary address of the user.
        /// </summary>
        [Required(ErrorMessage = "Please enter your address.")]
        [MaxLength(500, ErrorMessage="Address should be less than 500 characters.")]
        public string UserAddressLine1 { get; set; }

        /// <summary>
        /// Gets or sets UserAddressLine2: Secondary address of the user.
        /// </summary>
        [MaxLength(500, ErrorMessage="Address should be less than 500 characters.")]
        public string UserAddressLine2 { get; set; }

        /// <summary>
        /// Gets or sets UserCity: City of the user.
        /// </summary>
        [Required(ErrorMessage = "Please enter city.")]
        [MaxLength(50, ErrorMessage="City should be less than 50 characters.")]
        public string UserCity { get; set; }

        /// <summary>
        /// Gets or sets UserState: State of the user.
        /// </summary>
        [Required(ErrorMessage="Please enter state.")]
        [MaxLength(50, ErrorMessage = "State should be less than 50 characters.")]
        public string UserState { get; set; }

        /// <summary>
        /// Gets or sets UserZip: Zipcode of the user.
        /// </summary>
        [Required(ErrorMessage="Please enter zipcode.")]
        [MaxLength(50, ErrorMessage = "Zipcode should be less than 50 characters.")]
        public string UserZip { get; set; }

        /// <summary>
        /// Gets or sets UserPhoneNumber: Phone number of the user.
        /// </summary>
        [Required(ErrorMessage = "Please enter phone number.")]
        [Phone(ErrorMessage = "Phone number should contain digits and not alphabates")]
        [MaxLength(50, ErrorMessage = "PhoneNumber should be less than 50 characters.")]
        public string UserPhoneNumber { get; set; }

        /// <summary>
        /// Gets or sets UserNotes: Notes of the user.
        /// </summary>
        [MaxLength(200, ErrorMessage = "User notes should be less than 50 characters.")]
        public string UserNotes { get; set; }

        /// <summary>
        /// Gets or sets UserStatus: Status (Active or inactive)
        /// </summary>
        [Required]
        public string UserStatus { get; set; }

        /// <summary>
        /// Gets or sets Course Last Edited On date.
        /// </summary>
        [Required]
        public DateTime UserLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets Course Last Edited By name.
        /// </summary>
        [Required]
        public string UserLastEditedBy { get; set; }

        ////public string UserName { get; set; }
        ////public string Password { get; set; }
        ////public string ConfirmPassword { get; set; }

        /// <summary>
        /// Gets or sets foreign key attribute. 
        /// </summary>
        public int OrganizationId { get; set; }
    }
}