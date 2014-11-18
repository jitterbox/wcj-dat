//-----------------------------------------------------------------------
// <copyright file="UserController.cs" company="FSD">
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
    /// UserController class.
    /// For CRUD operation related to User.
    /// </summary>
    public class UserController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("UserController");

        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();

        /// <summary>
        /// GetUser method of UserController class.
        /// Gives list of Users available.
        /// </summary>
        /// <returns>List of Users</returns>
        //// GET api/User
        [FsdtsExceptionHandler]
        public IQueryable<User> GetUser()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.User.OrderBy(user => user.UserFirstName);
        }
    
        /// <summary>
        /// GetUser method of UserController class.
        /// </summary>
        /// <param name="id">Integer User Id</param>
        /// <returns>Object of User (If available)</returns>
        //// GET api/User/5
        [ResponseType(typeof(User))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.User.Find(id);
            if (user == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("User");
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return Ok(user);
        }
    
        /// <summary>
        /// PutUser method of UserController class.
        /// Changes applied to database according to User object. 
        /// </summary>
        /// <param name="id">Integer User Id</param>
        /// <param name="user">User object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        //// PUT api/User/5
        [FsdtsExceptionHandler]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            if (id != user.UserId)
            {
                Log.Error("In PutUser method: User sending id as: " + user.UserId + ". BadRequest");
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                Log.Info(FsdtsConstants.UpdatingDatabase);
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        /// PostUser method of UserController class.
        /// Adds new User in the database.
        /// </summary>
        /// <param name="user">User object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        //// POST api/User
        [ResponseType(typeof(User))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return BadRequest(ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + user.UserId.ToString());
            db.User.Add(user);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.UserId }, user);
        }

        /// <summary>
        /// DeleteUser method of UserController class.
        /// Deletes particular User from database
        /// </summary>
        /// <param name="id">Integer User Id</param>
        /// <returns>IHttpActionResult Status OK</returns>
        //// DELETE api/User/5
        [ResponseType(typeof(User))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.User.Find(id);
            if (user == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + user.ToString());
            db.User.Remove(user);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            db.SaveChanges();

            return Ok(user);
        }

        /// <summary>
        /// Dispose method of UserController class.
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
        /// UserExists method of UserController class.
        /// Checks whether given id is present in User table.
        /// </summary>
        /// <param name="id">Integer User Id</param>
        /// <returns>Boolean status</returns>
        private bool UserExists(int id)
        {
            return db.User.Count(e => e.UserId == id) > 0;
        }
    }
}