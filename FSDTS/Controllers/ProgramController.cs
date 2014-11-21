//-----------------------------------------------------------------------
// <copyright file="ProgramController.cs" company="FSD">
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
    /// ProgramController class.
    /// For CRUD operation related to Program.
    /// </summary>
    public class ProgramController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("ProgramController");

        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();

        /// <summary>
        /// GetProgram method of ProgramController class.
        /// Gives list of Programs available.
        /// </summary>
        /// <returns>List of Programs</returns>
        //// GET api/Program
        [FsdtsExceptionHandler]
        public IQueryable<Program> GetProgram()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return this.db.Program.OrderBy(prg => prg.ProgramName);
        }

        /// <summary>
        /// GetProgram method of ProgramController class.
        /// Gets Program Id as a parameter and returns its Object.
        /// </summary>
        /// <param name="id">Integer Program Id</param>
        /// <returns>Object of Program (If available)</returns>
        //// GET api/Program/5
        [ResponseType(typeof(Program))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetProgram(int id)
        {
            Program program = db.Program.Find(id);
            if (program == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("Program");
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return this.Ok(program);
        }

        /// <summary>
        /// GetProgramsByOrgId method is used to get all the Programs by Organization id.
        /// </summary>
        /// <param name="Oid"></param>
        /// <returns></returns>
        public IQueryable<Program> GetProgramsByOrgId(int Oid)
        {
            return db.Program.Where(pr => pr.OrganizationId == Oid).OrderBy(pr => pr.ProgramName).AsQueryable();
        }

        /// <summary>
        /// PutProgram method of ProgramController class.
        /// Changes applied to database according to Program object. 
        /// </summary>
        /// <param name="id">Integer Program Id</param>
        /// <param name="program">program object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        //// PUT api/Program/5
        [FsdtsExceptionHandler]
        public IHttpActionResult PutProgram(int id, Program program)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return this.BadRequest(this.ModelState);
            }

            if (id != program.ProgramId)
            {
                Log.Error("In PutProgram method: Program sending id as: " + program.ProgramId + ". BadRequest");
                return BadRequest();
            }

            this.db.Entry(program).State = EntityState.Modified;

            try
            {
                Log.Info(FsdtsConstants.UpdatingDatabase);
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgramExists(id))
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
        /// PostProgram method of ProgramController class.
        /// Adds new Program in the database.
        /// </summary>
        /// <param name="program">Program object</param>
        /// <returns>IHttpActionResult CreatedAtRoute value</returns>
        //// POST api/Program
        [ResponseType(typeof(Program))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostProgram(Program program)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + program.ProgramId.ToString());
            db.Program.Add(program);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = program.ProgramId }, program);
        }

        /// <summary>
        /// DeleteProgram method of ProgramController class.
        /// Deletes particular program from database
        /// </summary>
        /// <param name="id">Integer Program Id</param>
        /// <returns>IHttpActionResult Status OK</returns>
        //// DELETE api/Program/5
        [ResponseType(typeof(Program))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteProgram(int id)
        {
            Program program = db.Program.Find(id);
            if (program == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + program.ToString());
            db.Program.Remove(program);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return this.Ok(program);
        }

        /// <summary>
        /// Dispose method of ProgramController class.
        /// </summary>
        /// <param name="disposing">Boolean disposing</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.db.Dispose();
            }

            base.Dispose(disposing);
        }

        /// <summary>
        /// ProgramExists method of ProgramController class.
        /// Checks whether given id is present in Program table.
        /// </summary>
        /// <param name="id">Integer Program Id</param>
        /// <returns>Boolean status</returns>
        private bool ProgramExists(int id)
        {
            return this.db.Program.Count(e => e.ProgramId == id) > 0;
        }
    }
}