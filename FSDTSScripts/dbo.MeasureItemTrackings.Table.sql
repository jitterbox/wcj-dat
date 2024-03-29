USE [FSDTS]
GO
/****** Object:  Table [dbo].[MeasureItemTrackings]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MeasureItemTrackings](
	[MeasureItemTrackingId] [int] IDENTITY(1,1) NOT NULL,
	[MeasureId] [int] NOT NULL,
	[ProjectItemMatchId] [int] NOT NULL,
	[MeasureItemTrackingValue] [nvarchar](max) NULL,
	[MeasureItemTrackingVersion] [nvarchar](max) NULL,
	[MeasureItemTrackingReasonForChange] [nvarchar](max) NULL,
	[MeasureItemTrackingLastEditedOn] [datetime] NOT NULL,
	[MeasureItemTrackingLastEditedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.MeasureItemTrackings] PRIMARY KEY CLUSTERED 
(
	[MeasureItemTrackingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
