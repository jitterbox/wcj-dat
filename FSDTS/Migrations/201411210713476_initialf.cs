namespace FSDTS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialf : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CommonProgramsGroupings",
                c => new
                    {
                        CommonProgramsGroupingId = c.Int(nullable: false, identity: true),
                        CommonProgramsGroupingName = c.String(),
                        CommonProgramsGroupingLastEditedOn = c.DateTime(nullable: false),
                        CommonProgramsGroupingLastEditedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.CommonProgramsGroupingId);
            
            DropTable("dbo.CommonGroupings");
        }
        
        public override void Down()
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
            
            DropTable("dbo.CommonProgramsGroupings");
        }
    }
}
