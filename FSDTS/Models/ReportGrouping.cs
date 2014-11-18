using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSDTS.Models
{
    public class ReportGrouping
    {
        public int ReportGroupingId { get; set; }
        /// <summary>
        /// Setting foreign key attribute.
        /// </summary>
        public int PeriodId { get; set; }
        public string MeasureDescription { get; set; }
        public DateTime MeasureLastEditedOn { get; set; }
        public string MeasureLastEditedBy { get; set; }
    }
}