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
    public class PeriodsTest
    {
        PeriodController periodController = new PeriodController();
        Period period = new Period();

        [TestMethod]
        public void Get()
        {
            IEnumerable<Period> periodsList = periodController.GetPeriod();
            Assert.IsNotNull(periodsList);
            Assert.AreEqual(7, periodsList.Count());
            Assert.AreEqual("PeriodsId", periodsList.ElementAt(0));
            Assert.AreEqual("PeriodsStartDate", periodsList.ElementAt(1));
            Assert.AreEqual("PeriodsEndDate", periodsList.ElementAt(2));
            Assert.AreEqual("PeriodsDeadlineDate", periodsList.ElementAt(3));
            Assert.AreEqual("PeriodsYear", periodsList.ElementAt(4));
            Assert.AreEqual("PeriodsLastEditedOn", periodsList.ElementAt(5));
            Assert.AreEqual("PeriodsLastEditedBy", periodsList.ElementAt(6));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = periodController.GetPeriod(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            periodController.PostPeriod(period);
        }

        [TestMethod]
        public void Put()
        {
            periodController.PutPeriod(5, period);
        }

        [TestMethod]
        public void Delete()
        {
            periodController.DeletePeriod(1);
        }
    }
}
