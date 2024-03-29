USE [FSDTS]
GO
/****** Object:  Table [dbo].[Programs]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Programs](
	[ProgramId] [int] IDENTITY(1,1) NOT NULL,
	[ProgramName] [nvarchar](100) NOT NULL,
	[ProgramDescription] [nvarchar](500) NOT NULL,
	[CommonPrograms] [nvarchar](max) NULL,
	[ProgramStatus] [nvarchar](max) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[ProgramLastEditedOn] [datetime] NOT NULL,
	[ProgramLastEditedBy] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_dbo.Programs] PRIMARY KEY CLUSTERED 
(
	[ProgramId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Programs] ADD  DEFAULT ('1900-01-01T00:00:00.000') FOR [ProgramLastEditedOn]
GO
ALTER TABLE [dbo].[Programs]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Programs_dbo.Organizations_OrganizationId] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([OrganizationId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Programs] CHECK CONSTRAINT [FK_dbo.Programs_dbo.Organizations_OrganizationId]
GO
