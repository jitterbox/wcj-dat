using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSDTS.Models
{
    public class ItemCommonGroupMatch
    {
        public int ItemCommonGroupMatchId { get; set; }
        /// <summary>
        /// Setting foreign key attribute.
        /// </summary>
        public int ItemId { get; set; }
        /// <summary>
        ///    Setting foreign key attribute.
        /// </summary>
        public int CommonGroupingId { get; set; }
    }
}