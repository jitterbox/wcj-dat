//-----------------------------------------------------------------------
// <copyright file="MeasureController.cs" company="FSD">
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
    /// MeasureController class.
    /// For CRUD operation related to Measure.
    /// </summary>
    public class MeasureController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("MeasureController");

        /// <summary>
        /// Creating LogPatternConverter object.
        /// </summary>
        private LogPatternConverter logPatternConverter = new LogPatternConverter();

        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();

        /// <summary>
        /// GetMeasure method of MeasureController class.
        /// Gives list of Measures available.
        /// </summary>
        /// <returns>List of Measures</returns>
        [FsdtsExceptionHandler]
        public IQueryable<Measure> GetMeasure()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.Measure.Where(m => m.IsDeleted == false).AsQueryable(); 
        }

        /// <summary>
        /// GetMeasure method of MeasureController class.
        /// Gets Measure Id as a parameter and returns its Object.
        /// </summary>
        /// <param name="id">Integer Measure Id</param>
        /// <returns>Object of Measure (If available)</returns>
        [ResponseType(typeof(Measure))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetMeasure(int id)
        {
            Measure measure = db.Measure.Find(id);
            if (measure.IsDeleted == true || measure == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("Measure");
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return Ok(measure);
        }

        /// <summary>
        /// PutMeasure method of MeasureController class.
        /// Changes applied to database according to Measure object. 
        /// </summary>
        /// <param name="id">Integer Measure Id</param>
        /// <param name="measure">Measure object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        [FsdtsExceptionHandler]
        public IHttpActionResult PutMeasure(int id, Measure measure)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            if (id != measure.MeasureId)
            {
                Log.Error("In PutMeasure method: Measure sending id as: " + measure.MeasureId + ". BadRequest");
                return BadRequest();
            }

            db.Entry(measure).State = EntityState.Modified;

            try
            {
                Log.Info(FsdtsConstants.UpdatingDatabase);
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeasureExists(id))
                {
                    Log.Error(FsdtsConstants.ItemWithSpecificID + measure.MeasureId + ": " + FsdtsEnums.SearchByIDResult.Failure);
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
        /// PostMeasure method of MeasureController class.
        /// Adds new measure in the database.
        /// </summary>
        /// <param name="measure">Measure object</param>
        /// <returns>IHttpActionResult CreatedAtRoute value</returns>
        [ResponseType(typeof(Measure))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostMeasure(Measure measure)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + measure.MeasureId.ToString());
            db.Measure.Add(measure);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = measure.MeasureId }, measure);
        }

        /// <summary>
        /// DeleteMeasure method of MeasureController class.
        /// Deletes particular measure from database
        /// </summary>
        /// <param name="id">Integer Measure Id</param>
        /// <returns>IHttpActionResult Status OK</returns>
        [ResponseType(typeof(Measure))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteMeasure(int id)
        {
            Measure measure = db.Measure.Find(id);
            if (measure == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + measure.ToString());
            db.Measure.Remove(measure);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return Ok(measure);
        }

        /// <summary>
        /// Dispose method of MeasureController class.
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
        /// MeasureExists method of MeasureController class.
        /// Checks whether given id is present in measure table.
        /// </summary>
        /// <param name="id">Integer Measure Id</param>
        /// <returns>Boolean status</returns>
        private bool MeasureExists(int id)
        {
            return db.Measure.Count(e => e.MeasureId == id) > 0;
        }
    }
}