namespace FSDTS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initiald : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "UserPassword", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "UserPassword");
        }
    }
}
