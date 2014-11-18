using FSDTS.Controllers;
using FSDTS.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web.Http;

namespace FSDTSTest.UnitTests
{
    [TestClass]
    public class UsersTest
    {
        UserController userController = new UserController();
        User user = new User();

        [TestMethod]
        public void Get()
        {
            IEnumerable<User> usersList = userController.GetUser();
            Assert.IsNotNull(usersList);
            Assert.AreEqual(12, usersList.Count());
            Assert.AreEqual("UsersId", usersList.ElementAt(0));
            Assert.AreEqual("UsersFirstName", usersList.ElementAt(1));
            Assert.AreEqual("UsersLastName", usersList.ElementAt(2));
            Assert.AreEqual("UsersEmail", usersList.ElementAt(3));
            Assert.AreEqual("UsersAddressLine1", usersList.ElementAt(4));
            Assert.AreEqual("UsersAddressLine2", usersList.ElementAt(5));
            Assert.AreEqual("UsersCity", usersList.ElementAt(6));
            Assert.AreEqual("UsersState", usersList.ElementAt(7));
            Assert.AreEqual("UsersZip", usersList.ElementAt(8));
            Assert.AreEqual("UsersNotes", usersList.ElementAt(9));
            Assert.AreEqual("UsersLastEditedOn", usersList.ElementAt(10));
            Assert.AreEqual("UsersLastEditedBy", usersList.ElementAt(11));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = userController.GetUser(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            userController.PostUser(user);
        }

        [TestMethod]
        public void Put()
        {
            userController.PutUser(5, user);
        }

        [TestMethod]
        public void Delete()
        {
            userController.DeleteUser(1);
        }
    }
}
