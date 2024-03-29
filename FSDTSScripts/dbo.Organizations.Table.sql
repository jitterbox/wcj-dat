USE [FSDTS]
GO
/****** Object:  Table [dbo].[Organizations]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organizations](
	[OrganizationId] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationName] [nvarchar](100) NOT NULL,
	[OrganizationType] [nvarchar](max) NOT NULL,
	[OrganizationAddressLine1] [nvarchar](500) NOT NULL,
	[OrganizationAddressLine2] [nvarchar](max) NULL,
	[OrganizationCity] [nvarchar](max) NOT NULL,
	[OrganizationState] [nvarchar](max) NOT NULL,
	[OrganizationZip] [nvarchar](20) NOT NULL,
	[OrganizationNotes] [nvarchar](max) NULL,
	[OrganizationStatus] [nvarchar](max) NOT NULL,
	[OrganizationLastEditedOn] [datetime] NOT NULL,
	[OrganizationLastEditedBy] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_dbo.Organizations] PRIMARY KEY CLUSTERED 
(
	[OrganizationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Organizations] ADD  DEFAULT ('1900-01-01T00:00:00.000') FOR [OrganizationLastEditedOn]
GO
