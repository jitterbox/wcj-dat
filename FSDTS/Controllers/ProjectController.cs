//-----------------------------------------------------------------------
// <copyright file="ProjectController.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Description;
    using FSDTS.Common;
    using FSDTS.Models;
    using log4net;  

    /// <summary>
    /// ProjectController class.
    /// For CRUD operation related to Project.
    /// </summary>
    [FsdtsExceptionHandler]
    public class ProjectController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("ProjectController");

        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();

        /// <summary>
        /// GetProject method of ProjectController class.
        /// Gives list of Projects available.
        /// </summary>
        /// <returns>List of Projects</returns>
        [FsdtsExceptionHandler]
        public IQueryable<Project> GetProject()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.Project.OrderBy(prj => prj.ProjectName);
        }

        /// <summary>
        /// GetProject method of ProjectController class.
        /// Gets Project Id as a parameter and returns its Object.
        /// </summary>
        /// <param name="id">Integer Project Id</param>
        /// <returns>Object of Project (If available)</returns>
        [ResponseType(typeof(Project))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetProject(int id)
        {
            Project project = db.Project.Find(id);
            if (project == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("Project");
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return Ok(project);
        }

        /// <summary>
        /// PutProject method of ProjectController class.
        /// Changes applied to database according to Project object. 
        /// </summary>
        /// <param name="id">Integer Project Id</param>
        /// <param name="project">Project object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        [FsdtsExceptionHandler]
        public IHttpActionResult PutProject(int id, Project project)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            if (id != project.ProjectId)
            {
                Log.Error("In PutProject method: Project sending id as: " + project.ProjectId + ". BadRequest");
                return BadRequest();
            }

            db.Entry(project).State = EntityState.Modified;

            try
            {
                Log.Info(FsdtsConstants.UpdatingDatabase);
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        /// <summary>
        /// PostProject method of ProjectController class.
        /// Adds new project in the database.
        /// </summary>
        /// <param name="project">Project object</param>
        /// <returns>IHttpActionResult CreatedAtRoute value</returns>
        [ResponseType(typeof(Project))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostProject(Project project)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + project.ProjectId.ToString());
            db.Project.Add(project);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = project.ProjectId }, project);
        }

        /// <summary>
        /// DeleteProject method of ProjectController class.
        /// Deletes particular project from database.
        /// </summary>
        /// <param name="id">Integer Project Id</param>
        /// <returns>IHttpActionResult Status OK</returns>
        [ResponseType(typeof(Project))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteProject(int id)
        {
            Project project = db.Project.Find(id);
            if (project == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + project.ToString());
            db.Project.Remove(project);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return Ok(project);
        }

        /// <summary>
        /// Dispose method of ProjectController class.
        /// </summary>
        /// <param name="disposing">Boolean disposing</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }

        /// <summary>
        /// ProjectExists method of ProjectController class.
        /// Checks whether given id is present in project table.
        /// </summary>
        /// <param name="id">Integer Project Id</param>
        /// <returns>Boolean status</returns>
        private bool ProjectExists(int id)
        {
            return db.Project.Count(e => e.ProjectId == id) > 0;
        }
    }
}