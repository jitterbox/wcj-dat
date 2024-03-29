USE [FSDTS]
GO
/****** Object:  Table [dbo].[ProjectOrganizations]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectOrganizations](
	[ProjectOrganizationId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectId] [int] NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[Format] [nvarchar](max) NULL,
	[ProgramId] [int] NOT NULL,
	[CourseId] [int] NOT NULL,
	[CredentialId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_dbo.ProjectOrganizations] PRIMARY KEY CLUSTERED 
(
	[ProjectOrganizationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[ProjectOrganizations] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
