//-----------------------------------------------------------------------
// <copyright file="ItemType.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class ItemType
    {
        public int ItemTypeId { get; set; }

        public string ItemTypeName { get; set; }

        public DateTime ItemTypeLastEditedOn { get; set; }

        public string ItemTypeLastEditedBy { get; set; }
    }
}