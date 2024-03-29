USE [FSDTS]
GO
/****** Object:  StoredProcedure [dbo].[FSDTD_GetProjectOrganizationsData]    Script Date: 11/20/2014 11:13:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[FSDTD_GetProjectOrganizationsData]
	@ProjectId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

select po.ProjectOrganizationId, p.ProjectName,OrganizationName, po.format, pr.ProgramName, c.CourseName, cr.CredentialName
 from ProjectOrganizations po join Projects p on(po.projectid=p.ProjectId)
join Organizations o on (po.organizationid=o.OrganizationId)
left join Programs pr on (po.programid=pr.ProgramId)
left join Courses c on (po.courseid=c.CourseId)
left join Credentials cr on (po.credentialid=cr.CredentialId)
where po.projectid=@ProjectId and po.IsDeleted=0
END




GO
