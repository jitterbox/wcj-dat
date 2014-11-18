namespace FSDTS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Courses", "CourseStatus", c => c.String());
            AlterColumn("dbo.Credentials", "CredentialStatus", c => c.String());
            AlterColumn("dbo.Items", "ItemActive", c => c.String());
            AlterColumn("dbo.Programs", "ProgramStatus", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Programs", "ProgramStatus", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Items", "ItemActive", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Credentials", "CredentialStatus", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Courses", "CourseStatus", c => c.Boolean(nullable: false));
        }
    }
}
