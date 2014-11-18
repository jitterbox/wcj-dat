//-----------------------------------------------------------------------
// <copyright file="Item.cs" company="FSD">
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
    /// Item class to decide fields.
    /// </summary>
    public class Item
    {
        /// <summary>
        /// Gets or sets primary key attribute.
        /// </summary>
        public int ItemId { get; set; }

        /// <summary>
        /// Gets or sets foreign key attribute.
        /// </summary>
        public int OrganizationId { get; set; }

        /// <summary>
        /// Gets or sets foreign key attribute.
        /// </summary>
        public int ItemTypeId { get; set; }

        /// <summary>
        /// Gets or sets item name attribute.
        /// </summary>
        public string ItemName { get; set; }

        /// <summary>
        /// Gets or sets item description attribute.
        /// </summary>
        public string ItemDescription { get; set; }

        /// <summary>
        /// Gets or sets item active or not value.
        /// </summary>
        public string ItemActive { get; set; }

        /// <summary>
        /// Gets or sets item last edited on.
        /// </summary>
        public DateTime ItemLastEditedOn { get; set; }

        /// <summary>
        /// Gets or sets item last edited by.
        /// </summary>
        public string ItemLastEditedBy { get; set; }
    }
}