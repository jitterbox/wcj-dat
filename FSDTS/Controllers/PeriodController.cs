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
using FSDTS.Models;
using log4net;
using FSDTS.Common;

namespace FSDTS.Controllers
{
    public class PeriodController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("PeriodController");

        /// <summary>
        /// Creating LogPatternConverter object.
        /// </summary>
        private LogPatternConverter logPatternConverter = new LogPatternConverter();

        private FSDTSContext db = new FSDTSContext();

        // GET api/Period
        [FsdtsExceptionHandler]
        public IQueryable<Period> GetPeriod()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.Period.Where(p => p.IsDeleted == false).AsQueryable(); 
        }

        // GET api/Period/5
        [ResponseType(typeof(Period))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetPeriod(int id)
        {
            Period period = db.Period.Find(id);
            if (period.IsDeleted == true || period == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("Period");
            }
            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return Ok(period);
        }

        /// <summary>
        /// GetPeriodsByPrgId method is used to get all the Periods by ProjectId.
        /// </summary>
        /// <param name="Oid"></param>
        /// <returns></returns>
        public IQueryable<Period> GetPeriodsByPrgId(int Prjid)
        {
            return db.Period.Where(pd => pd.ProjectId == Prjid & pd.IsDeleted == false).AsQueryable();
        }

        // PUT api/Period/5
        [FsdtsExceptionHandler]
        public IHttpActionResult PutPeriod(int id, Period period)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            if (id != period.PeriodId)
            {
                Log.Error("In PutPeriod method: Period sending id as: " + period.PeriodId + ". BadRequest");
                return BadRequest();
            }

            db.Entry(period).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeriodExists(id))
                {
                    Log.Info(FsdtsConstants.UpdatingDatabase);
                    return NotFound();
                }
                else
                {
                    Log.Error(FsdtsConstants.ItemWithSpecificID + period.PeriodId + ": " + FsdtsEnums.SearchByIDResult.Failure);
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Period
        [ResponseType(typeof(Period))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostPeriod(Period period)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }
            Log.Info(FsdtsConstants.AddingNewItem + period.PeriodId.ToString());
            db.Period.Add(period);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = period.PeriodId }, period);
        }

        // DELETE api/Period/5
        [ResponseType(typeof(Period))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeletePeriod(int id)
        {
            Period period = db.Period.Find(id);
            if (period == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }
            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + period.ToString());
            db.Period.Remove(period);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return Ok(period);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PeriodExists(int id)
        {
            return db.Period.Count(e => e.PeriodId == id) > 0;
        }
    }
}