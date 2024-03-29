USE [FSDTS]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserFirstName] [nvarchar](100) NOT NULL,
	[UserLastName] [nvarchar](100) NOT NULL,
	[UserEmail] [nvarchar](max) NULL,
	[UserAddressLine1] [nvarchar](500) NOT NULL,
	[UserAddressLine2] [nvarchar](500) NULL,
	[UserCity] [nvarchar](50) NOT NULL,
	[UserState] [nvarchar](50) NOT NULL,
	[UserZip] [nvarchar](50) NOT NULL,
	[UserNotes] [nvarchar](200) NULL,
	[UserLastEditedOn] [datetime] NOT NULL,
	[UserLastEditedBy] [nvarchar](max) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[UserPhoneNumber] [nvarchar](50) NOT NULL,
	[UserStatus] [nvarchar](max) NOT NULL,
	[UserPassword] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('') FOR [UserPhoneNumber]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('') FOR [UserStatus]
GO
