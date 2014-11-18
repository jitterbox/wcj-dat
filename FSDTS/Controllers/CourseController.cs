//-----------------------------------------------------------------------
// <copyright file="CourseController.cs" company="FSD">
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
    using System.Web.Http.Filters;
    using System.Web.Mvc;
    using FSDTS.Common;
    using FSDTS.Models;
    using log4net;
 
    /// <summary>
    /// CourseController class.
    /// For CRUD operation related to Course.
    /// </summary>
    public class CourseController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("CourseController");

        /// <summary>
        /// Creating LogPatternConverter object.
        /// </summary>
        private LogPatternConverter logPatternConverter = new LogPatternConverter();

        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();

        /// <summary>
        /// GetCourse method of CourseController class.
        /// Gives list of Courses available.
        /// </summary>
        /// <returns>List of Courses</returns>
        [FsdtsExceptionHandler]
        public IQueryable<Course> GetCourse() 
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return this.db.Course.OrderBy(cr => cr.CourseName);
        }

        /// <summary>
        /// GetCourse method of CourseController class.
        /// Gets Course Id as a parameter and returns its Object.
        /// </summary>
        /// <param name="id">Integer Course Id</param>
        /// <returns>Object of Course (If available)</returns>
        [ResponseType(typeof(Course))]
        [FsdtsExceptionHandler]
        public IHttpActionResult GetCourse(int id)
        {
            Course course = this.db.Course.Find(id);
            if (course == null)
            {
                Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                FsdtsCommonMethods.NullValueHandler("Course");
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success);
            return this.Ok(course);
        }

        /// <summary>
        /// GetCoursesByOrgId method is used to get all the Courses by Organization id.
        /// </summary>
        /// <param name="Oid">Integer Organization ID</param>
        /// <returns>List of Courses related to Organization ID</returns>
        public IQueryable<Course> GetCoursesByOrgId(int Oid)
        {
            return this.db.Course.Where(co => co.OrganizationId == Oid).AsQueryable();
        }

        /// <summary>
        /// PutCourse method of CourseController class.
        /// Changes applied to database according to Course object. 
        /// </summary>
        /// <param name="id">Integer Course Id</param>
        /// <param name="course">Course object</param>
        /// <returns>IHttpActionResult with StatusCode</returns>
        [FsdtsExceptionHandler]
        public IHttpActionResult PutCourse(int id, Course course)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return this.BadRequest(this.ModelState);
            }

            if (id != course.CourseId)
            {
                Log.Error("In PutCourse method: Course sending id as: " + course.CourseId + ". BadRequest");
                return this.BadRequest();
            }

            this.db.Entry(course).State = EntityState.Modified;

            try
            {
                Log.Info(FsdtsConstants.UpdatingDatabase);
                this.db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.CourseExists(id))
                {
                    Log.Error(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
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
        /// PostCourse method of CourseController class.
        /// Adds new course in the database.
        /// </summary>
        /// <param name="course">Course object</param>
        /// <returns>IHttpActionResult CreatedAtRoute value</returns>
        [ResponseType(typeof(Course))]
        [FsdtsExceptionHandler]
        public IHttpActionResult PostCourse(Course course)
        {
            if (!ModelState.IsValid)
            {
                Log.Error(FsdtsConstants.InvalidModelState);
                return this.BadRequest(this.ModelState);
            }

            Log.Info(FsdtsConstants.AddingNewItem + course.CourseId.ToString());
            this.db.Course.Add(course);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            this.db.SaveChanges();

            return this.CreatedAtRoute("DefaultApi", new { id = course.CourseId }, course);
        }

        /// <summary>
        /// DeleteCourse method of CourseController class.
        /// Deletes particular course from database
        /// </summary>
        /// <param name="id">Integer Course Id</param>
        /// <returns>IHttpActionResult Status OK</returns>
        [ResponseType(typeof(Course))]
        [FsdtsExceptionHandler]
        public IHttpActionResult DeleteCourse(int id)
        {
            Course course = this.db.Course.Find(id);
            if (course == null)
            {
                Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Failure);
                return this.NotFound();
            }

            Log.Info(FsdtsConstants.ItemWithSpecificID + id + ": " + FsdtsEnums.SearchByIDResult.Success + "as: " + course.ToString());
            this.db.Course.Remove(course);
            Log.Info(FsdtsConstants.UpdatingDatabase);
            this.db.SaveChanges();

            return this.Ok(course);
        }

        /// <summary>
        /// Dispose method of CourseController class.
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
        /// CourseExists method of CourseController class.
        /// Checks whether given id is present in course table.
        /// </summary>
        /// <param name="id">Integer Course Id</param>
        /// <returns>Boolean status</returns>
        private bool CourseExists(int id)
        {
            return this.db.Course.Count(e => e.CourseId == id) > 0;
        }
    }
}