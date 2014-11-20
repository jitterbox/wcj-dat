using FSDTS.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FSDTS.Common
{
    public class CustomValidators
    {
        public class ValidateDateAttribute : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                Period period = new Period();
                period = (Period)validationContext.ObjectInstance;

                if (!(period.PeriodEndDate >= (DateTime)value)) //  || !(period.PeriodDeadlineDate >= (DateTime)value)
                {
                    return new ValidationResult(ErrorMessage);
                }
                else
                {
                    return ValidationResult.Success;
                }
            }
        }

        public class ValidateYearAttribute : ValidateDateAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                Project project = new Project();
                project = (Project)validationContext.ObjectInstance;

                if (!(Convert.ToInt32(project.ProjectEndYear)> Convert.ToInt32(value)))
                {
                    return new ValidationResult(ErrorMessage);
                }
                else
                {
                    return ValidationResult.Success;
                }
            }
        }
    }
}