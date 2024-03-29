USE [FSDTS]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[CourseId] [int] IDENTITY(1,1) NOT NULL,
	[CourseName] [nvarchar](100) NOT NULL,
	[CourseDescription] [nvarchar](500) NOT NULL,
	[CourseStatus] [nvarchar](max) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[CourseLastEditedOn] [datetime] NOT NULL,
	[CourseLastEditedBy] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_dbo.Courses] PRIMARY KEY CLUSTERED 
(
	[CourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Courses] ADD  DEFAULT ('1900-01-01T00:00:00.000') FOR [CourseLastEditedOn]
GO
ALTER TABLE [dbo].[Courses]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Courses_dbo.Organizations_OrganizationId] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([OrganizationId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Courses] CHECK CONSTRAINT [FK_dbo.Courses_dbo.Organizations_OrganizationId]
GO
