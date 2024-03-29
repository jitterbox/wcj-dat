USE [FSDTS]
GO
/****** Object:  Table [dbo].[Items]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[ItemId] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[ItemTypeId] [int] NOT NULL,
	[ItemName] [nvarchar](max) NULL,
	[ItemDescription] [nvarchar](max) NULL,
	[ItemActive] [nvarchar](max) NULL,
	[ItemLastEditedOn] [datetime] NOT NULL,
	[ItemLastEditedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.Items] PRIMARY KEY CLUSTERED 
(
	[ItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
