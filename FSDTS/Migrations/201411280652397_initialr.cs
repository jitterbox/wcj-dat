namespace FSDTS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialr : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "VerificationNo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "VerificationNo");
        }
    }
}
