USE [FSDTS]
GO
/****** Object:  Table [dbo].[Measures]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Measures](
	[MeasureId] [int] IDENTITY(1,1) NOT NULL,
	[MeasureDescription] [nvarchar](500) NOT NULL,
	[MeasureLastEditedOn] [datetime] NOT NULL,
	[MeasureLastEditedBy] [nvarchar](max) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[ProjectId] [int] NOT NULL,
 CONSTRAINT [PK_dbo.Measures] PRIMARY KEY CLUSTERED 
(
	[MeasureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Measures] ADD  DEFAULT ((0)) FOR [ProjectId]
GO
