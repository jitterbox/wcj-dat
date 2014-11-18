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
    public class OrganizationsTest
    {
        OrganizationController organizationController = new OrganizationController();
        Organization organization = new Organization();

        [TestMethod]
        public void Get()
        {
            IEnumerable<Organization> organizationList = organizationController.GetOrganization();
            Assert.IsNotNull(organizationList);
            Assert.AreEqual(8, organizationList.Count());
            Assert.AreEqual("OrganizationsId", organizationList.ElementAt(0));
            Assert.AreEqual("OrganizationsName", organizationList.ElementAt(1));
            Assert.AreEqual("OrganizationsAddressLine1", organizationList.ElementAt(2));
            Assert.AreEqual("OrganizationsAddressLine2", organizationList.ElementAt(3));
            Assert.AreEqual("OrganizationsCity", organizationList.ElementAt(4));
            Assert.AreEqual("OrganizationsState", organizationList.ElementAt(5));
            Assert.AreEqual("OrganizationsZip", organizationList.ElementAt(6));
            Assert.AreEqual("OrganizationsNotes", organizationList.ElementAt(7));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = organizationController.GetOrganization(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            organizationController.PostOrganization(organization);
        }

        [TestMethod]
        public void Put()
        {
            organizationController.PutOrganization(5, organization);
        }

        [TestMethod]
        public void Delete()
        {
            organizationController.DeleteOrganization(1);
        }
    }
}
