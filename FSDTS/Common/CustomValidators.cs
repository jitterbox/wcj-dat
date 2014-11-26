//-----------------------------------------------------------------------
// <copyright file="CustomValidators.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------
namespace FSDTS.Common
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Web;
    using FSDTS.Models;

    /// <summary>
    /// Class that contains other validation classes.
    /// </summary>
    public class CustomValidators
    {
        /// <summary>
        /// Class to validate start date and end date values.
        /// </summary>
        public class ValidateDateAttribute : ValidationAttribute
        {
            /// <summary>
            /// IsValid method of ValidateDateAttribute class.
            /// </summary>
            /// <param name="value">object value (value of start date)</param>
            /// <param name="validationContext">ValidationContext validationContext</param>
            /// <returns>ValidationResult success or failure.</returns>
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                Period period = new Period();
                period = (Period)validationContext.ObjectInstance;

                if (!(period.PeriodEndDate >= (DateTime)value)) ////  || !(period.PeriodDeadlineDate >= (DateTime)value)
                {
                    return new ValidationResult(ErrorMessage);
                }
                else
                {
                    return ValidationResult.Success;
                }
            }
        }

        /// <summary>
        /// Class to validate start year and end year values.
        /// </summary>
        public class ValidateYearAttribute : ValidateDateAttribute
        {
            /// <summary>
            /// IsValid method of ValidateYearAttribute class.
            /// Validates whether start year is less than or equal to end year or not.
            /// </summary>
            /// <param name="value">object value (value of start year)</param>
            /// <param name="validationContext">ValidationContext validationContext</param>
            /// <returns>ValidationResult success or failure.</returns>
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                Project project = new Project();
                project = (Project)validationContext.ObjectInstance;

                if (!(Convert.ToInt32(project.ProjectEndYear) >= Convert.ToInt32(value)))
                {
                    return new ValidationResult(ErrorMessage);
                }
                else
                {
                    return ValidationResult.Success;
                }
            }
        }

        public class UniqueAttribute : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                FSDTSContext fsdtsContext = new FSDTSContext();

                if (validationContext.DisplayName.Equals("UserEmail"))
                {
                    User user = new User();
                    user = fsdtsContext.User.SingleOrDefault(usr => usr.UserEmail == value.ToString());

                    if (user != null)
                    {
                        return new ValidationResult(ErrorMessage);
                    }

                    return ValidationResult.Success;
                }
                else
                {
                    CommonProgramsGrouping commonProgramsGrouping = new CommonProgramsGrouping();
                    commonProgramsGrouping = fsdtsContext.CommonGrouping.SingleOrDefault(cgp => cgp.CommonProgramsGroupingName == value.ToString());

                    if (commonProgramsGrouping != null)
                    {
                        return new ValidationResult(ErrorMessage);
                    }

                    return ValidationResult.Success;
                }
            }
        }
    }
}