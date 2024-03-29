USE [FSDTS]
GO
/****** Object:  Table [dbo].[Credentials]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Credentials](
	[CredentialId] [int] IDENTITY(1,1) NOT NULL,
	[CredentialName] [nvarchar](100) NOT NULL,
	[CredentialStatus] [nvarchar](max) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[CredentialLastEditedOn] [datetime] NOT NULL,
	[CredentialLastEditedBy] [nvarchar](max) NOT NULL,
	[CredentialDescription] [nvarchar](500) NOT NULL,
 CONSTRAINT [PK_dbo.Credentials] PRIMARY KEY CLUSTERED 
(
	[CredentialId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Credentials] ADD  DEFAULT ('1900-01-01T00:00:00.000') FOR [CredentialLastEditedOn]
GO
ALTER TABLE [dbo].[Credentials]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Credentials_dbo.Organizations_OrganizationId] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organizations] ([OrganizationId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Credentials] CHECK CONSTRAINT [FK_dbo.Credentials_dbo.Organizations_OrganizationId]
GO
