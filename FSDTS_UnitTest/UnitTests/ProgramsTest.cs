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

namespace FSDTSTest
{
    [TestClass]
    public class ProgramsTest
    {
        ProgramController programController = new ProgramController();
        Program program = new Program();

        [TestMethod]
        public void Get()
        {
            IEnumerable<Program> programsList = programController.GetProgram();
            Assert.IsNotNull(programsList);
            Assert.AreEqual(5, programsList.Count());
            Assert.AreEqual("ProgramsId", programsList.ElementAt(0));
            Assert.AreEqual("ProgramsName", programsList.ElementAt(1));
            Assert.AreEqual("ProgramsDescription", programsList.ElementAt(2));
            Assert.AreEqual("CommonPrograms", programsList.ElementAt(3));
            Assert.AreEqual("ProgramsStatus", programsList.ElementAt(4));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = programController.GetProgram(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            programController.PostProgram(program);
        }

        [TestMethod]
        public void Put()
        {
            programController.PutProgram(5, program);
        }

        [TestMethod]
        public void Delete()
        {
            programController.DeleteProgram(1);
        }
    }
}

