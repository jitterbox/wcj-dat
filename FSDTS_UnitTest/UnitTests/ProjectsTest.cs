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
    public class ProjectsTest
    {
        ProjectController projectController = new ProjectController();
        Project project = new Project();

        [TestMethod]
        public void Get()
        {
            IEnumerable<Project> projectsList = projectController.GetProject();
            Assert.IsNotNull(projectsList);
            Assert.AreEqual(8, projectsList.Count());
            Assert.AreEqual("ProjectsId", projectsList.ElementAt(0));
            Assert.AreEqual("ProjectsName", projectsList.ElementAt(1));
            Assert.AreEqual("ProjectsDescription", projectsList.ElementAt(2));
            Assert.AreEqual("ProjectsStartYear", projectsList.ElementAt(3));
            Assert.AreEqual("ProjectsEndYear", projectsList.ElementAt(4));
            Assert.AreEqual("ProjectsSponsor", projectsList.ElementAt(5));
            Assert.AreEqual("ProjectsLastEditedOn", projectsList.ElementAt(6));
            Assert.AreEqual("ProjectsLastEditedBy", projectsList.ElementAt(7));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = projectController.GetProject(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {

            projectController.PostProject(project);
        }

        [TestMethod]
        public void Put()
        {
            projectController.PutProject(5, project);
        }

        [TestMethod]
        public void Delete()
        {
            projectController.DeleteProject(1);
        }
    }
}
