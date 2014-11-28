//-----------------------------------------------------------------------
// <copyright file="UserController.cs" company="FSD">
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
    using System.Web;
    using System.Web.Http;
    using System.Web.Http.Description;
    using System.Web.Http.OData;
    using FSDTS.Business_Objects;
    using FSDTS.Common;
    using FSDTS.Models;
    using log4net;
    using Microsoft.AspNet.Identity;
   
    /// <summary>
    /// UserController class.
    /// For CRUD operation related to User.
    /// </summary>
    [FsdtsExceptionHandler]
    public class UserController : ApiController
    {
        /// <summary>
        /// Creating Log object to log stack trace and flow of execution.
        /// </summary>
        public static readonly ILog Log = LogManager.GetLogger("UserController");

        /// <summary>
        /// SqlConnection instance.
        /// </summary>
        private SqlConnection con = null;

        /// <summary>
        /// SqlCommand instance.
        /// </summary>
        private SqlCommand cmd = null;

        /// <summary>
        /// SqlDataReader instance.
        /// </summary>
        private SqlDataReader reader = null;

        /// <summary>
        /// User instance.
        /// </summary>
        private User objuser = new User();

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
        [EnableQuery]
        public IQueryable<User> GetUser()
        {
            Log.Info(FsdtsConstants.GettingItemList);
            return db.User.OrderBy(user => user.UserLastName);
        }

        [Route("Api/GetUserInfoByUserType")]
        public List<User> GetUserInfoByUserType(string UType)
        {
            cmd = new SqlCommand();
            List<User> lstUser = new List<User>();
            con = new SqlConnection(Convert.ToString(ConfigurationManager.ConnectionStrings["FSDTSContext"]));
            User oParticipant = new User();

            if (con.State == ConnectionState.Closed || con.State == ConnectionState.Broken)
            {
                con.Open();
            }

            cmd.Connection = con;

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "FSDTD_GetUserInfo";

            SqlParameter param = new SqlParameter();
            param.Direction = ParameterDirection.Input;
            param.DbType = DbType.String;
            param.ParameterName = "@UserType";
            param.Precision = 10;
            param.SqlDbType = SqlDbType.Text;
            param.SqlValue = UType;
            param.Value = UType;
            cmd.Parameters.Add(param);

            if (UType != null)
            {
                reader = cmd.ExecuteReader();
            }
            else
            {
                throw new NullReferenceException("User Type you have entered is not correct.");
            }
            while (reader.Read())
            {
                objuser = new User();
                objuser.UserId = Convert.ToInt32(reader["UserId"]);
                objuser.UserFirstName = Convert.ToString(reader["UserFirstName"]);
                objuser.UserLastName = Convert.ToString(reader["UserLastName"]);
                objuser.UserEmail = Convert.ToString(reader["UserEmail"]);
                objuser.UserAddressLine1 = Convert.ToString(reader["UserAddressLine1"]);
                objuser.UserAddressLine2 = Convert.ToString(reader["UserAddressLine2"]);
                objuser.UserCity = Convert.ToString(reader["UserCity"]);
                objuser.UserState = Convert.ToString(reader["UserState"]);
                objuser.UserZip = Convert.ToString(reader["UserZip"]);
                objuser.UserNotes = Convert.ToString(reader["UserNotes"]);
                objuser.UserLastEditedOn = Convert.ToDateTime(reader["UserLastEditedOn"]);
                objuser.UserLastEditedBy = Convert.ToString(reader["UserLastEditedBy"]);
                objuser.UserPhoneNumber = Convert.ToString(reader["UserPhoneNumber"]);
                objuser.OrganizationId = Convert.ToInt32(reader["OrganizationId"]);
                objuser.UserStatus = Convert.ToString(reader["UserStatus"]);
                objuser.UserType = Convert.ToString(reader["UserType"]);
                objuser.ManageUsers = Convert.ToBoolean(reader["ManageUsers"]);
                objuser.ManageProjects = Convert.ToBoolean(reader["ManageProjects"]);
                objuser.ManageOrganizations = Convert.ToBoolean(reader["ManageOrganizations"]);
                lstUser.Add(objuser);
            }

            cmd.Dispose();
            con.Dispose();
            return lstUser;
            ////return db.ProjectOrganization.Where(p => p.IsDeleted == false).AsQueryable();
        }

        [Route("Api/GetUserInfoById")]
        [FsdtsExceptionHandler]
        public User GetUserInfoById(int? Uid)
        {
            ////string DecryptedPassword = SymmetricDecryptData((db.User.Where(usr => usr.UserId == Uid));
            cmd = new SqlCommand();
            con = new SqlConnection(Convert.ToString(ConfigurationManager.ConnectionStrings["FSDTSContext"]));
            User oParticipant = new User();

            if (con.State == ConnectionState.Closed || con.State == ConnectionState.Broken)
            {
                con.Open();
            }

            cmd.Connection = con;

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "FSDTD_GetUserInfoById";

            SqlParameter param = new SqlParameter();
            param.Direction = ParameterDirection.Input;
            param.DbType = DbType.Int32;
            param.ParameterName = "@UserId";
            param.Precision = 10;
            param.SqlDbType = SqlDbType.Int;
            param.SqlValue = Uid;
            param.Value = Uid;
            cmd.Parameters.Add(param);

            if (Uid != null)
            {
                reader = cmd.ExecuteReader();
            }
            else
            {
                throw new NullReferenceException("User ID you have entered is not correct.");
            }

            if (reader.Read())
            {
                objuser = new User();
                objuser.UserId = Convert.ToInt32(reader["UserId"]);
                objuser.UserFirstName = Convert.ToString(reader["UserFirstName"]);
                objuser.UserLastName = Convert.ToString(reader["UserLastName"]);
                objuser.UserEmail = Convert.ToString(reader["UserEmail"]);
                objuser.UserAddressLine1 = Convert.ToString(reader["UserAddressLine1"]);
                objuser.UserAddressLine2 = Convert.ToString(reader["UserAddressLine2"]);
                objuser.UserCity = Convert.ToString(reader["UserCity"]);
                objuser.UserState = Convert.ToString(reader["UserState"]);
                objuser.UserZip = Convert.ToString(reader["UserZip"]);
                objuser.UserNotes = Convert.ToString(reader["UserNotes"]);
                objuser.UserLastEditedOn = Convert.ToDateTime(reader["UserLastEditedOn"]);
                objuser.UserLastEditedBy = Convert.ToString(reader["UserLastEditedBy"]);
                objuser.UserPhoneNumber = Convert.ToString(reader["UserPhoneNumber"]);
                objuser.OrganizationId = Convert.ToInt32(reader["OrganizationId"]);
                objuser.UserStatus = Convert.ToString(reader["UserStatus"]);
                objuser.UserType = Convert.ToString(reader["UserType"]);
                objuser.ManageUsers = Convert.ToBoolean(reader["ManageUsers"]);
                objuser.ManageProjects = Convert.ToBoolean(reader["ManageProjects"]);
                objuser.ManageOrganizations = Convert.ToBoolean(reader["ManageOrganizations"]);
                ////lstUser.Add(objuser);
            }

            cmd.Dispose();
            con.Dispose();
            return objuser;
            ////return db.ProjectOrganization.Where(p => p.IsDeleted == false).AsQueryable();
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
        /// GetUsersByOrgId method is used to get all the User by Organization id.
        /// </summary>
        /// <param name="Oid">Integer organization ID</param>
        /// <returns>List of Users</returns>
        public List<User> GetUsersByOrgId(int Oid)
        {
            cmd = new SqlCommand();
            List<User> lstUser = new List<User>();
            con = new SqlConnection(Convert.ToString(ConfigurationManager.ConnectionStrings["FSDTSContext"]));
            User oParticipant = new User();

            if (con.State == ConnectionState.Closed || con.State == ConnectionState.Broken)
            {
                con.Open();
            }

            cmd.Connection = con;

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "FSDTD_GetUsersByOrgId";

            SqlParameter param = new SqlParameter();
            param.Direction = ParameterDirection.Input;
            param.DbType = DbType.Int32;
            param.ParameterName = "@OrgId";
            param.Precision = 10;
            param.SqlDbType = SqlDbType.Int;
            param.SqlValue = Oid;
            param.Value = Oid;
            cmd.Parameters.Add(param);

            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                objuser = new User();
                objuser.UserId = Convert.ToInt32(reader["UserId"]);
                objuser.UserFirstName = Convert.ToString(reader["UserFirstName"]);
                objuser.UserLastName = Convert.ToString(reader["UserLastName"]);
                objuser.UserEmail = Convert.ToString(reader["UserEmail"]);
                objuser.UserAddressLine1 = Convert.ToString(reader["UserAddressLine1"]);
                objuser.UserAddressLine2 = Convert.ToString(reader["UserAddressLine2"]);
                objuser.UserCity = Convert.ToString(reader["UserCity"]);
                objuser.UserState = Convert.ToString(reader["UserState"]);
                objuser.UserZip = Convert.ToString(reader["UserZip"]);
                objuser.UserNotes = Convert.ToString(reader["UserNotes"]);
                objuser.UserLastEditedOn = Convert.ToDateTime(reader["UserLastEditedOn"]);
                objuser.UserLastEditedBy = Convert.ToString(reader["UserLastEditedBy"]);
                objuser.UserPhoneNumber = Convert.ToString(reader["UserPhoneNumber"]);
                objuser.OrganizationId = Convert.ToInt32(reader["OrganizationId"]);
                objuser.UserStatus = Convert.ToString(reader["UserStatus"]);
                objuser.UserType = Convert.ToString(reader["UserType"]);
                objuser.ManageUsers = Convert.ToBoolean(reader["ManageUsers"]);
                objuser.ManageProjects = Convert.ToBoolean(reader["ManageProjects"]);
                objuser.ManageOrganizations = Convert.ToBoolean(reader["ManageOrganizations"]);
                lstUser.Add(objuser);
            }
            cmd.Dispose();
            con.Dispose();
            return lstUser;
            
            //return db.User.Where(usr => usr.OrganizationId == Oid).OrderBy(usr => usr.UserLastName).AsQueryable();
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
            //var EncryptedPassword = UserBO.SymmetricEncryptData(user.UserPassword);
            //user.UserPassword = EncryptedPassword;

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

        [FsdtsExceptionHandler]
        [AcceptVerbs("PATCH")]
        public HttpResponseMessage PatchUser(int id, Delta<User> user)
        {
            FSDTSContext objContext = new FSDTSContext();
            User doc = objContext.User.SingleOrDefault(p => p.UserId == id);
            if (doc == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
           
            //var EncryptedPassword = UserBO.SymmetricEncryptData(doc.UserPassword);
            //doc.UserPassword = EncryptedPassword;
            //var EncryptedPassword = UserBO.SymmetricEncryptData(doc.UserPassword);
            //doc.UserPassword = EncryptedPassword;

            user.Patch(doc);
            objContext.Entry(doc).State = EntityState.Modified;
            ////objContext.SaveChanges();
            db.SaveChanges();
            objContext.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.NoContent);
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
                //var EncryptedPassword = UserBO.SymmetricEncryptData(user.UserPassword);
                //user.UserPassword = EncryptedPassword;
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

        /// <summary>
        /// Login method of UserController class.
        /// </summary>
        /// <param name="userName">string userName</param>
        /// <param name="userPassword">string userPassword</param>
        /// <returns>HttpResponseMessage Success/Failure</returns>

        [ResponseType(typeof(User))]
        [FsdtsExceptionHandler]
<<<<<<< Updated upstream
=======
        [Route("Api/Login")]
        [HttpPost]
        [HttpPost]
        public HttpResponseMessage Login(User userobj)
        {
            HttpResponse response = HttpContext.Current.Response;
            User user = db.User.SingleOrDefault(usr => usr.UserEmail.Equals(userobj.UserEmail));

            if (user != null)
            {
                if (user.UserEmail.Equals(userobj.UserEmail))
                {
                    //if (UserBO.SymmetricDecryptData(user.UserPassword).Equals(UserBO.SymmetricDecryptData(userobj.UserPassword)))
                    if (user.UserPassword.Equals(userobj.UserPassword))
                    {
                        //response.Write("Success");
                        return Request.CreateResponse(user);

                    }
                    else
                    {
                        //response.Write("Wrong Password");
                        return Request.CreateResponse(HttpStatusCode.BadRequest);
                    }
                }
            }
            else
            {
                //response.Write("User not found");
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return null;
        }

        public HttpResponseMessage PostForgotPassword(string userEmailId, string userFirstName)
        {
            User user = db.User.SingleOrDefault(usr => usr.UserEmail == userEmailId && usr.UserFirstName == userFirstName);
            HttpResponse response = HttpContext.Current.Response;; // = new HttpResponse();
            if (user != null)
            {
                response.Write("Success");
                string uniqueCode = UserBO.GetUniqueKey(user);
                string url = Convert.ToString(ConfigurationManager.AppSettings.Get("ForgotPasswordLink"));
                // FsdtsCommonMethods.SendEmail("mandar1330ge@gmail.com", "test mail", FsdtsConstants.MailBody + uniqueCode);
            }
            else
            {
                response.Write("Failure");
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}