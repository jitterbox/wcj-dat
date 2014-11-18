namespace FSDTS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Reset : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CommonGroupings",
                c => new
                    {
                        CommonGroupingId = c.Int(nullable: false, identity: true),
                        CommonGroupingName = c.String(),
                        CommonGroupingLastEditedOn = c.DateTime(nullable: false),
                        CommonGroupingLastEditedBy = c.String(),
                    })
                .PrimaryKey(t => t.CommonGroupingId);
            
            CreateTable(
                "dbo.Courses",
                c => new
                    {
                        CourseId = c.Int(nullable: false, identity: true),
                        CourseName = c.String(nullable: false),
                        CourseDescription = c.String(),
                        CourseStatus = c.Boolean(nullable: false),
                        OrganizationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CourseId)
                .ForeignKey("dbo.Organizations", t => t.OrganizationId, cascadeDelete: true)
                .Index(t => t.OrganizationId);
            
            CreateTable(
                "dbo.Credentials",
                c => new
                    {
                        CredentialId = c.Int(nullable: false, identity: true),
                        CredentialName = c.String(nullable: false),
                        CredentialDesciption = c.String(),
                        CredentialStatus = c.Boolean(nullable: false),
                        OrganizationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CredentialId)
                .ForeignKey("dbo.Organizations", t => t.OrganizationId, cascadeDelete: true)
                .Index(t => t.OrganizationId);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        ItemId = c.Int(nullable: false, identity: true),
                        OrganizationId = c.Int(nullable: false),
                        ItemTypeId = c.Int(nullable: false),
                        ItemName = c.String(),
                        ItemDescription = c.String(),
                        ItemActive = c.Boolean(nullable: false),
                        ItemLastEditedOn = c.DateTime(nullable: false),
                        ItemLastEditedBy = c.String(),
                    })
                .PrimaryKey(t => t.ItemId);
            
            CreateTable(
                "dbo.ItemCommonGroupMatches",
                c => new
                    {
                        ItemCommonGroupMatchId = c.Int(nullable: false, identity: true),
                        ItemId = c.Int(nullable: false),
                        CommonGroupingId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ItemCommonGroupMatchId);
            
            CreateTable(
                "dbo.ItemTypes",
                c => new
                    {
                        ItemTypeId = c.Int(nullable: false, identity: true),
                        ItemTypeName = c.String(),
                        ItemTypeLastEditedOn = c.DateTime(nullable: false),
                        ItemTypeLastEditedBy = c.String(),
                    })
                .PrimaryKey(t => t.ItemTypeId);
            
            CreateTable(
                "dbo.Measures",
                c => new
                    {
                        MeasureId = c.Int(nullable: false, identity: true),
                        MeasureDescription = c.String(),
                        MeasureLastEditedOn = c.DateTime(nullable: false),
                        MeasureLastEditedBy = c.String(),
                        PeriodId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MeasureId);
            
            CreateTable(
                "dbo.MeasureItemTrackings",
                c => new
                    {
                        MeasureItemTrackingId = c.Int(nullable: false, identity: true),
                        MeasureId = c.Int(nullable: false),
                        ProjectItemMatchId = c.Int(nullable: false),
                        MeasureItemTrackingValue = c.String(),
                        MeasureItemTrackingVersion = c.String(),
                        MeasureItemTrackingReasonForChange = c.String(),
                        MeasureItemTrackingLastEditedOn = c.DateTime(nullable: false),
                        MeasureItemTrackingLastEditedBy = c.String(),
                    })
                .PrimaryKey(t => t.MeasureItemTrackingId);
            
            CreateTable(
                "dbo.Organizations",
                c => new
                    {
                        OrganizationId = c.Int(nullable: false, identity: true),
                        OrganizationName = c.String(),
                        OrganizationAddressLine1 = c.String(),
                        OrganizationAddressLine2 = c.String(),
                        OrganizationCity = c.String(),
                        OrganizationState = c.String(),
                        OrganizationZip = c.String(),
                        OrganizationNotes = c.String(),
                    })
                .PrimaryKey(t => t.OrganizationId);
            
            CreateTable(
                "dbo.Programs",
                c => new
                    {
                        ProgramId = c.Int(nullable: false, identity: true),
                        ProgramName = c.String(nullable: false),
                        ProgramDescription = c.String(),
                        CommonPrograms = c.String(),
                        ProgramStatus = c.Boolean(nullable: false),
                        OrganizationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProgramId)
                .ForeignKey("dbo.Organizations", t => t.OrganizationId, cascadeDelete: true)
                .Index(t => t.OrganizationId);
            
            CreateTable(
                "dbo.Periods",
                c => new
                    {
                        PeriodId = c.Int(nullable: false, identity: true),
                        PeriodStartDate = c.DateTime(nullable: false),
                        PeriodEndDate = c.DateTime(nullable: false),
                        PeriodDeadlineDate = c.DateTime(nullable: false),
                        PeriodYear = c.String(),
                        PeriodLastEditedOn = c.DateTime(nullable: false),
                        PeriodLastEditedBy = c.String(),
                        ProjectId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PeriodId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectId = c.Int(nullable: false, identity: true),
                        ProjectName = c.String(nullable: false),
                        ProjectDescription = c.String(),
                        ProjectStartYear = c.String(),
                        ProjectEndYear = c.String(),
                        ProjectSponsor = c.String(),
                        ProjectsLastEditedOn = c.DateTime(nullable: false),
                        ProjectsLastEditedBy = c.String(),
                    })
                .PrimaryKey(t => t.ProjectId);
            
            CreateTable(
                "dbo.ProjectItemMatches",
                c => new
                    {
                        ProjectItemMatchId = c.Int(nullable: false, identity: true),
                        ProjectId = c.Int(nullable: false),
                        ItemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectItemMatchId);
            
            CreateTable(
                "dbo.ReportGroupings",
                c => new
                    {
                        ReportGroupingId = c.Int(nullable: false, identity: true),
                        PeriodId = c.Int(nullable: false),
                        MeasureDescription = c.String(),
                        MeasureLastEditedOn = c.DateTime(nullable: false),
                        MeasureLastEditedBy = c.String(),
                    })
                .PrimaryKey(t => t.ReportGroupingId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserFirstName = c.String(),
                        UserLastName = c.String(),
                        UserEmail = c.String(),
                        UserAddressLine1 = c.String(),
                        UserAddressLine2 = c.String(),
                        UserCity = c.String(),
                        UserState = c.String(),
                        UserZip = c.String(),
                        UserNotes = c.String(),
                        UserLastEditedOn = c.DateTime(nullable: false),
                        UserLastEditedBy = c.String(),
                        OrganizationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Programs", "OrganizationId", "dbo.Organizations");
            DropForeignKey("dbo.Credentials", "OrganizationId", "dbo.Organizations");
            DropForeignKey("dbo.Courses", "OrganizationId", "dbo.Organizations");
            DropIndex("dbo.Programs", new[] { "OrganizationId" });
            DropIndex("dbo.Credentials", new[] { "OrganizationId" });
            DropIndex("dbo.Courses", new[] { "OrganizationId" });
            DropTable("dbo.Users");
            DropTable("dbo.ReportGroupings");
            DropTable("dbo.ProjectItemMatches");
            DropTable("dbo.Projects");
            DropTable("dbo.Periods");
            DropTable("dbo.Programs");
            DropTable("dbo.Organizations");
            DropTable("dbo.MeasureItemTrackings");
            DropTable("dbo.Measures");
            DropTable("dbo.ItemTypes");
            DropTable("dbo.ItemCommonGroupMatches");
            DropTable("dbo.Items");
            DropTable("dbo.Credentials");
            DropTable("dbo.Courses");
            DropTable("dbo.CommonGroupings");
        }
    }
}
