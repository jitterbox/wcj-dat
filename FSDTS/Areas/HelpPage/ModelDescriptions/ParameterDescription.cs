//-----------------------------------------------------------------------
// <copyright file="ParameterDescription.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------

namespace FSDTS.Areas.HelpPage.ModelDescriptions
{
    using System.Collections.Generic;
    using System.Collections.ObjectModel;

    public class ParameterDescription
    {
        public ParameterDescription()
        {
            Annotations = new Collection<ParameterAnnotation>();
        }

        public Collection<ParameterAnnotation> Annotations { get; private set; }

        public string Documentation { get; set; }

        public string Name { get; set; }

        public ModelDescription TypeDescription { get; set; }
    }
}