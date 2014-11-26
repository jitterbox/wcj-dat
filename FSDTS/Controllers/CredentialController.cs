//-----------------------------------------------------------------------
// <copyright file="CredentialController.cs" company="FSD">
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
    /// CredentialController class.
    /// For CRUD operation related to Credential.
    /// </summary>
    [FsdtsExceptionHandler]
    public class CredentialController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("CredentialController");

        /// <summary>
        /// Creating LogPatternConverter object.
        /// </summary>
        private LogPatternConverter logPatternConverter = new LogPatternConverter();

        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();

        /// <summary>
        /// GetCredential method of CredentialController class.
        /// Gives list of Credentials available.
        /// </summary>
        /// <returns>List of Credentials</returns>
        //// GET api/Credential
        [FsdtsExceptionHandler]
        public IQueryable<Credential> GetCredential()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return this.db.Credential.OrderBy(crd => crd.CredentialName);
        }
       
        /// <summary>
        /// GetCredential method of CredentialController class.
        /// Gets Credential Id as a parameter and returns its Object.
        /// </summary>
        /// <param name="id">Integer Credential Id</param>
        /// <returns>Object of Credential (If available)</returns>
        //// GET api/Credential/5
        [ResponseType(typeof(Credential))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetCredential(int id)
        {
            Credential credential = this.db.Credential.Find(id);
            if (credential == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("Credential");
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return this.Ok(credential);
        }
        /// <summary>
        /// GetCredentialsByOrgId method is used to get all the credentials by Organization id.
        /// </summary>
        /// <param name="Oid"></param>
        /// <returns></returns>
         [FsdtsExceptionHandler]
        public IQueryable<Credential> GetCredentialsByOrgId(int? Oid)
        {
            if (Oid != null)
            {
                return db.Credential.Where(cr => cr.OrganizationId == Oid).AsQueryable();
            }
            else
            {
                throw new NullReferenceException("Organization ID you have entered is not correct.");
            }
        }

        /// <summary>
        /// PutCredential method of CredentialController class.
        /// Changes applied to database according to Credential object. 
        /// </summary>
        /// <param name="id">Integer Credential Id</param>
        /// <param name="credential">Credential object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        //// PUT api/Credential/5
        [FsdtsExceptionHandler]
        public IHttpActionResult PutCredential(int id, Credential credential)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return this.BadRequest(this.ModelState);
            }

            if (id != credential.CredentialId)
            {
                Log.Error("In PutCredential method: Credential sending id as: " + credential.CredentialId + ". BadRequest");
                return this.BadRequest();
            }

            this.db.Entry(credential).State = EntityState.Modified;

            try
            {
                Log.Info(FsdtsConstants.UpdatingDatabase);
                this.db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.CredentialExists(id))
                {
                    Log.Error(FsdtsConstants.ItemWithSpecificID + credential.CredentialId + ": " + FsdtsEnums.SearchByIDResult.Failure);
                    return this.NotFound();
                }
                else
                {
                    Log.Error(FsdtsConstants.ExceptionOccured);
                    throw;
                }
            }

            return this.StatusCode(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// PostCredential method of CredentialController class.
        /// Adds new credential in the database.
        /// </summary>
        /// <param name="credential">Credential object</param>
        /// <returns>IHttpActionResult CreatedAtRoute value</returns>
        //// POST api/Credential
        [ResponseType(typeof(Credential))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostCredential(Credential credential)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return this.BadRequest(this.ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + credential.CredentialId.ToString());
            this.db.Credential.Add(credential);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            this.db.SaveChanges();

            return this.CreatedAtRoute("DefaultApi", new { id = credential.CredentialId }, credential);
        }

        /// <summary>
        /// DeleteCredential method of CredentialController class.
        /// Deletes particular credential from database
        /// </summary>
        /// <param name="id">Integer Credential Id</param>
        /// <returns>IHttpActionResult Status OK</returns>
        //// DELETE api/Credential/5
        [ResponseType(typeof(Credential))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteCredential(int id)
        {
            Credential credential = this.db.Credential.Find(id);
            if (credential == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return this.NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + credential.ToString());
            this.db.Credential.Remove(credential);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            this.db.SaveChanges();
            
            return this.Ok(credential);
        }

        /// <summary>
        /// Dispose method ofCredentialController class.
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
        /// CredentialExists method of CredentialController class.
        /// Checks whether given id is present in credential table.
        /// </summary>
        /// <param name="id">Integer Credential Id</param>
        /// <returns>Boolean status</returns>
        private bool CredentialExists(int id)
        {
            return this.db.Credential.Count(e => e.CredentialId == id) > 0;
        }
    }
}