USE [FSDTS]
GO
/****** Object:  Table [dbo].[ItemCommonGroupMatches]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemCommonGroupMatches](
	[ItemCommonGroupMatchId] [int] IDENTITY(1,1) NOT NULL,
	[ItemId] [int] NOT NULL,
	[CommonGroupingId] [int] NOT NULL,
 CONSTRAINT [PK_dbo.ItemCommonGroupMatches] PRIMARY KEY CLUSTERED 
(
	[ItemCommonGroupMatchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
