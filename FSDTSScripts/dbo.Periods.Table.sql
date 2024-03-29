USE [FSDTS]
GO
/****** Object:  Table [dbo].[Periods]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Periods](
	[PeriodId] [int] IDENTITY(1,1) NOT NULL,
	[PeriodTitle] [nvarchar](100) NOT NULL,
	[PeriodStartDate] [datetime] NOT NULL,
	[PeriodEndDate] [datetime] NOT NULL,
	[PeriodDeadlineDate] [datetime] NOT NULL,
	[PeriodYear] [nvarchar](4) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[ProjectId] [int] NOT NULL,
 CONSTRAINT [PK_dbo.Periods] PRIMARY KEY CLUSTERED 
(
	[PeriodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
