//-----------------------------------------------------------------------
// <copyright file="ProjectOrganization.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------
namespace FSDTS.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class ProjectOrganization
    {
        public int ProjectOrganizationId { get; set; }
        public int ProjectId { get; set; }
        public int OrganizationId { get; set; }
        public string Format { get; set; }
        public int ProgramId { get; set; }
        public int CourseId { get; set; }
        public int CredentialId { get; set; }
        public bool IsDeleted { get; set; }
    }
}