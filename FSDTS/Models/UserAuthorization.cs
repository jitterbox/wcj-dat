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

    public class UserAuthorization
    {
        public int UserAuthId { get; set; }
        public int UserId { get; set; }
        public string UserType { get; set; }
        public bool ManageUsers { get; set; }
        public bool ManageProjects { get; set; }

    }
}