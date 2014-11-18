using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FSDTS.Models
{
    public class Participant
    {
        public string ProjectName { get; set; }
        public string OrganizationName { get; set; }
        public string Format { get; set; }
        public string ProgramName { get; set; }
        public string Course { get; set; }
        public string Credential { get; set; }
    }
}