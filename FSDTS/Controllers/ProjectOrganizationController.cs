//-----------------------------------------------------------------------
// <copyright file="ProjectOrganizationController.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Description;
    using FSDTS.Common;
    using FSDTS.Models;
    using log4net;

    public class ProjectOrganizationController : ApiController
    {
        SqlConnection con = null;
        SqlCommand cmd = null;
        SqlDataReader reader = null;
        ////SqlParameter param = null;
        Participant objparticipant = new Participant();
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("ProgramOrganizationController");

        private FSDTSContext db = new FSDTSContext();

        public List<Participant> GetProjectOrganizationsByProjectId(int Pid)
        {
            cmd = new SqlCommand();
            List<Participant> lstParticipants = new List<Participant>();
            con = new SqlConnection(Convert.ToString(ConfigurationManager.ConnectionStrings["FSDTSContext"]));
            Participant oParticipant = new Participant();

            if (con.State == ConnectionState.Closed || con.State == ConnectionState.Broken)
                con.Open();

            cmd.Connection = con;

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "FSDTD_GetProjectOrganizationsData";

            SqlParameter param = new SqlParameter();
            param.Direction = ParameterDirection.Input;
            param.DbType = DbType.Int32;
            param.ParameterName = "@ProjectId";
            param.Precision = 10;
            param.SqlDbType = SqlDbType.Int;
            param.SqlValue = Pid;
            param.Value = Pid;
            cmd.Parameters.Add(param);

            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                objparticipant = new Participant();
                objparticipant.ProjOrgId = Convert.ToInt32(reader["ProjectOrganizationId"]);
                objparticipant.ProjectName = Convert.ToString(reader["ProjectName"]);
                objparticipant.OrganizationName = Convert.ToString(reader["OrganizationName"]);
                objparticipant.Format = Convert.ToString(reader["format"]);
                objparticipant.ProgramName = Convert.ToString(reader["ProgramName"]);
                objparticipant.Course = Convert.ToString(reader["CourseName"]);
                objparticipant.Credential = Convert.ToString(reader["CredentialName"]);
                lstParticipants.Add(objparticipant);
            }
            cmd.Dispose();
            con.Dispose();
            return lstParticipants;
            //return db.ProjectOrganization.Where(p => p.IsDeleted == false).AsQueryable();
        }

        // GET api/ProgramOrganization
        public IQueryable<ProjectOrganization> GetProjectOrganizations()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.ProjectOrganization.Where(p => p.IsDeleted == false).AsQueryable();
        }

        // GET api/ProgramOrganization/5
        [ResponseType(typeof(ProjectOrganization))]
        public IHttpActionResult GetProjectOrganization(int id)
        {
            ProjectOrganization projectorganization = db.ProjectOrganization.Find(id);
            if (projectorganization.IsDeleted == true || projectorganization == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return Ok(projectorganization);
        }

        // PUT api/ProgramOrganization/5
        public IHttpActionResult PutProjectOrganization(int id, ProjectOrganization projectorganization)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            if (id != projectorganization.ProjectOrganizationId)
            {
                Log.Error("In PutUser method: User sending id as: " + projectorganization.ProjectOrganizationId + ". BadRequest");
                return BadRequest();
            }

            db.Entry(projectorganization).State = EntityState.Modified;

            try
            {
                Log.Info(FsdtsConstants.UpdatingDatabase);
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectOrganizationExists(id))
                {
                    Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                    return NotFound();
                }
                else
                {
                    Log.Error(FsdtsConstants.ExceptionOccured);
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/ProgramOrganization
        [ResponseType(typeof(ProjectOrganization))]
        public IHttpActionResult PostProjectOrganization(ProjectOrganization projectorganization)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + projectorganization.ProjectOrganizationId.ToString());
            db.ProjectOrganization.Add(projectorganization);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = projectorganization.ProjectOrganizationId }, projectorganization);
        }

        // DELETE api/ProgramOrganization/5
        [ResponseType(typeof(ProjectOrganization))]
        public IHttpActionResult DeleteProjectOrganization(int id)
        {
            ProjectOrganization projectorganization = db.ProjectOrganization.Find(id);
            if (projectorganization == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + projectorganization.ToString());
            db.ProjectOrganization.Remove(projectorganization);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return Ok(projectorganization);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectOrganizationExists(int id)
        {
            return db.ProjectOrganization.Count(e => e.ProjectOrganizationId == id) > 0;
        }
    }
}