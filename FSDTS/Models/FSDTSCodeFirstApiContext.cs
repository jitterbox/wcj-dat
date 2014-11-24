using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FSDTS.Models
{
    public class FSDTSContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public FSDTSContext()
            : base("name=FSDTSContext")
        {
        }

        public System.Data.Entity.DbSet<FSDTS.Models.Organization> Organization { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.Course> Course { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.Credential> Credential { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.Program> Program { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.User> User { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.Period> Period { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.Project> Project { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.Measure> Measure { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.CommonProgramsGrouping> CommonGrouping { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.Item> Item { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.ItemCommonGroupMatch> ItemCommonGroupMatch { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.ItemType> ItemType { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.MeasureItemTracking> MeasureItemTracking { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.ProjectItemMatch> ProjectItemMatch { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.ReportGrouping> ReportGrouping { get; set; }

        public System.Data.Entity.DbSet<FSDTS.Models.ProjectOrganization> ProjectOrganization { get; set; }

    }
}
