USE [FSDTS]
GO
/****** Object:  Table [dbo].[CommonGroupings]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommonGroupings](
	[CommonGroupingId] [int] IDENTITY(1,1) NOT NULL,
	[CommonGroupingName] [nvarchar](max) NULL,
	[CommonGroupingLastEditedOn] [datetime] NOT NULL,
	[CommonGroupingLastEditedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.CommonGroupings] PRIMARY KEY CLUSTERED 
(
	[CommonGroupingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
