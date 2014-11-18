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
    public class CredentialsTest
    {
        CredentialController credentialController = new CredentialController();
        Credential credential = new Credential();

        [TestMethod]
        public void Get()
        {
            IEnumerable<Credential> credentialsList = credentialController.GetCredential();
            Assert.IsNotNull(credentialsList);
            Assert.AreEqual(4, credentialsList.Count());
            Assert.AreEqual("CredentialsId", credentialsList.ElementAt(0));
            Assert.AreEqual("CredentialName", credentialsList.ElementAt(1));
            Assert.AreEqual("CredentialDesciption", credentialsList.ElementAt(2));
            Assert.AreEqual("CredentialStatus", credentialsList.ElementAt(3));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = credentialController.GetCredential(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            credentialController.PostCredential(credential);
        }

        [TestMethod]
        public void Put()
        {
            credentialController.PutCredential(5, credential);
        }

        [TestMethod]
        public void Delete()
        {
            credentialController.DeleteCredential(1);
        }
    }
}
