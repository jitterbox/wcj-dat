namespace FSDTS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initiale : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Periods", "PeriodYear", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Periods", "PeriodYear", c => c.String(nullable: false, maxLength: 4));
        }
    }
}
