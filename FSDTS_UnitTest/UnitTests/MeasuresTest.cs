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
    public class MeasuresTest
    {
        MeasureController measurecontroller = new MeasureController();
        Measure measure = new Measure();

        [TestMethod]
        public void Get()
        {
            // Arrange

            // Act
            IEnumerable<Measure> measuresList = measurecontroller.GetMeasure();

            // Assert
            Assert.IsNotNull(measuresList);
            Assert.AreEqual(5, measuresList.Count());
            Assert.AreEqual("MeasuresId", measuresList.ElementAt(0));
            Assert.AreEqual("MeasuresDescription", measuresList.ElementAt(1));
            Assert.AreEqual("MeasuresLastEditedOn", measuresList.ElementAt(2));
            Assert.AreEqual("MeasuresLastEditedBy", measuresList.ElementAt(3));
            Assert.AreEqual("PeriodsId", measuresList.ElementAt(4));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = measurecontroller.GetMeasure(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {

            measurecontroller.PostMeasure(measure);
        }

        [TestMethod]
        public void Put()
        {
            measurecontroller.PutMeasure(5, measure);
        }

        [TestMethod]
        public void Delete()
        {
            measurecontroller.DeleteMeasure(1);
        }
    }
}
