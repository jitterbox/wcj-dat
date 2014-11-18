//-----------------------------------------------------------------------
// <copyright file="OrganizationController.cs" company="FSD">
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
    /// OrganizationController class.
    /// For CRUD operation related to Organization.
    /// </summary>
    public class OrganizationController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("OrganizationController");

        /// <summary>
        /// Creating LogPatternConverter object.
        /// </summary>
        private LogPatternConverter logPatternConverter = new LogPatternConverter();

        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();

        /// <summary>
        /// GetOrganization method of OrganizationController class.
        /// Gives list of Organization available.
        /// </summary>
        /// <returns>List of Organizations</returns>
        //// GET api/Organization
        [FsdtsExceptionHandler]
        public IQueryable<Organization> GetOrganization()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.Organization.OrderBy(org => org.OrganizationName);
        }

        /// <summary>
        /// GetOrganization method of OrganizationController class.
        /// Gets Organization Id as a parameter and returns its Object.
        /// </summary>
        /// <param name="id">Integer Organization Id</param>
        /// <returns>Object of Organization (If available)</returns>
        //// GET api/Organization/5
        [ResponseType(typeof(Organization))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetOrganization(int id)
        {
            Organization organization = db.Organization.Find(id);
            if (organization == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("Organization");
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return Ok(organization);
        }

        /// <summary>
        /// PutOrganization method of OrganizationController class.
        /// Changes applied to database according to Organization object. 
        /// </summary>
        /// <param name="id">Integer Organization Id</param>
        /// <param name="organization">Organization object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        //// PUT api/Organization/5
        [FsdtsExceptionHandler]
        public IHttpActionResult PutOrganization(int id, Organization organization)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            if (id != organization.OrganizationId)
            {
                Log.Error("In PutOrganization method: Organization sending id as: " + organization.OrganizationId + ". BadRequest");
                return BadRequest();
            }

            db.Entry(organization).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganizationExists(id))
                {
                    Log.Info(FsdtsConstants.UpdatingDatabase);
                    return NotFound();
                }
                else
                {
                    Log.Error(FsdtsConstants.ItemWithSpecificID + organization.OrganizationId + ": " + FsdtsEnums.SearchByIDResult.Failure);
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// PostOrganization method of OrganizationController class.
        /// Adds new Organization in the database.
        /// </summary>
        /// <param name="organization">Organization object</param>
        /// <returns>IHttpActionResult CreatedAtRoute value</returns>
        //// POST api/Organization
        [ResponseType(typeof(Organization))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostOrganization(Organization organization)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + organization.OrganizationId.ToString());
            db.Organization.Add(organization);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = organization.OrganizationId }, organization);
        }

        /// <summary>
        /// DeleteOrganization method of OrganizationController class.
        /// Deletes particular Organization from database
        /// </summary>
        /// <param name="id">Integer Organization Id</param>
        /// <returns>IHttpActionResult Status OK</returns>
        //// DELETE api/Organization/5
        [ResponseType(typeof(Organization))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteOrganization(int id)
        {
            Organization organization = db.Organization.Find(id);
            if (organization == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + organization.ToString());
            db.Organization.Remove(organization);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return Ok(organization);
        }

        /// <summary>
        /// Dispose method of OrganizationController class.
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
        /// CourseExists method of OrganizationController class.
        /// Checks whether given id is present in Organization table.
        /// </summary>
        /// <param name="id">Integer Organization Id</param>
        /// <returns>Boolean status</returns>
        private bool OrganizationExists(int id)
        {
            return db.Organization.Count(e => e.OrganizationId == id) > 0;
        }
    }
}