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
using System.Web.Http.OData;
using FSDTS.Common;
using FSDTS.Models;
using log4net;

namespace FSDTS.Controllers
{
    [FsdtsExceptionHandler]
    public class CommonProgramsGroupingController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("CommonProgramsGroupingController");

        /// <summary>
        /// Creating LogPatternConverter object.
        /// </summary>
        private LogPatternConverter logPatternConverter = new LogPatternConverter();

        private FSDTSContext db = new FSDTSContext();

        // GET api/CommonProgramsGrouping
        [FsdtsExceptionHandler]
        public IQueryable<CommonProgramsGrouping> GetCommonGrouping()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.CommonGrouping.Where(p => p.IsDeleted == false).OrderBy(p => p.CommonProgramsGroupingName).AsQueryable();
        }

        // GET api/CommonProgramsGrouping/5
        [ResponseType(typeof(CommonProgramsGrouping))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetCommonProgramsGrouping(int id)
        {
            CommonProgramsGrouping commonprogramsgrouping = db.CommonGrouping.Find(id);
            if (commonprogramsgrouping.IsDeleted == true || commonprogramsgrouping == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("commonprograms");
            }
            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return Ok(commonprogramsgrouping);
        }

        // PUT api/CommonProgramsGrouping/5
        [FsdtsExceptionHandler]
        public IHttpActionResult PutCommonProgramsGrouping(int id, CommonProgramsGrouping commonprogramsgrouping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != commonprogramsgrouping.CommonProgramsGroupingId)
            {
                Log.Error("In PutCommonProgramsGrouping method: PutCommonProgramsGrouping sending id as: " + commonprogramsgrouping.CommonProgramsGroupingId + ". BadRequest");
                return BadRequest();
            }

            db.Entry(commonprogramsgrouping).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommonProgramsGroupingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [AcceptVerbs("PATCH")]
        [FsdtsExceptionHandler]
        public HttpResponseMessage PatchCommonProgram(int id, Delta<CommonProgramsGrouping> commonprogram)
        {
            FSDTSContext objContext = new FSDTSContext();
            CommonProgramsGrouping doc = objContext.CommonGrouping.SingleOrDefault(p => p.CommonProgramsGroupingId == id);
            if (doc == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            commonprogram.Patch(doc);
            objContext.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        // POST api/CommonProgramsGrouping
        [ResponseType(typeof(CommonProgramsGrouping))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostCommonProgramsGrouping(CommonProgramsGrouping commonprogramsgrouping)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }
            Log.Info(FsdtsConstants.AddingNewItem + commonprogramsgrouping.CommonProgramsGroupingId.ToString());
            db.CommonGrouping.Add(commonprogramsgrouping);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = commonprogramsgrouping.CommonProgramsGroupingId }, commonprogramsgrouping);
        }

        // DELETE api/CommonProgramsGrouping/5
        [ResponseType(typeof(CommonProgramsGrouping))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteCommonProgramsGrouping(int id)
        {
            CommonProgramsGrouping commonprogramsgrouping = db.CommonGrouping.Find(id);
            if (commonprogramsgrouping == null)
            {
                return NotFound();
            }

            db.CommonGrouping.Remove(commonprogramsgrouping);
            db.SaveChanges();

            return Ok(commonprogramsgrouping);
        }

        [FsdtsExceptionHandler]
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        [FsdtsExceptionHandler]
        private bool CommonProgramsGroupingExists(int id)
        {
            return db.CommonGrouping.Count(e => e.CommonProgramsGroupingId == id) > 0;
        }
    }
}