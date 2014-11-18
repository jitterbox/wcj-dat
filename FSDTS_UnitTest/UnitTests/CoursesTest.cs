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
    public class CoursesTest
    {
        CourseController courseController = new CourseController();
        Course courses = new Course();

        [TestMethod]
        public void Get()
        {
            IEnumerable<Course> coursesList = courseController.GetCourse();
            Assert.IsNotNull(coursesList);
            Assert.AreEqual(4, coursesList.Count());
            Assert.AreEqual("CoursesId", coursesList.ElementAt(0));
            Assert.AreEqual("CourseName", coursesList.ElementAt(1));
            Assert.AreEqual("CourseDescription", coursesList.ElementAt(2));
            Assert.AreEqual("CourseStatus", coursesList.ElementAt(3));
        }

        [TestMethod]
        public void GetById()
        {
            IHttpActionResult result = courseController.GetCourse(5);
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            courseController.PostCourse(courses);
        }

        [TestMethod]
        public void Put()
        {
            courseController.PutCourse(5, courses);
        }

        [TestMethod]
        public void Delete()
        {
            courseController.DeleteCourse(1);
        }
    }
}
