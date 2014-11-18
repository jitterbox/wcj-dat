using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSDTS.Models
{
    public class MeasureItemTracking
    {
        public int MeasureItemTrackingId { get; set; }

        /// <summary>
        /// Setting foreign key attribute.
        /// </summary>
        public int MeasureId { get; set; }

        /// <summary>
        ///    Setting foreign key attribute.
        /// </summary>
        public int ProjectItemMatchId { get; set; }

        public string MeasureItemTrackingValue { get; set; }

        public string MeasureItemTrackingVersion { get; set; }

        public string MeasureItemTrackingReasonForChange { get; set; }

        public DateTime MeasureItemTrackingLastEditedOn { get; set; }

        public string MeasureItemTrackingLastEditedBy { get; set; }
    }
}