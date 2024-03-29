USE [FSDTS]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[ProjectId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [nvarchar](max) NOT NULL,
	[ProjectType] [nvarchar](max) NULL,
	[ProjectDescription] [nvarchar](max) NOT NULL,
	[ProjectStartYear] [nvarchar](max) NOT NULL,
	[ProjectEndYear] [nvarchar](max) NOT NULL,
	[ProjectSponsor] [nvarchar](max) NULL,
	[ProjectStatus] [nvarchar](max) NOT NULL,
	[ProjectsLastEditedOn] [datetime] NOT NULL,
	[ProjectsLastEditedBy] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_dbo.Projects] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
