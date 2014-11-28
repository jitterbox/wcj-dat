//-----------------------------------------------------------------------
// <copyright file="CustomValidators.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------
namespace FSDTS.Common
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.ComponentModel.DataAnnotations;
    using System.Configuration;
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

        /// <summary>
        /// class to validate unique email and common groupings name.
        /// </summary>
        public class UniqueAttribute : ValidationAttribute
        {
            /// <summary>
            /// IsValid method of UniqueAttribute class.
            /// </summary>
            /// <param name="value">object value</param>
            /// <param name="validationContext">ValidationContext validationContext</param>
            /// <returns>ValidationResult success or failure.</returns>
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                FSDTSContext fsdtsContext = new FSDTSContext();
                User userFromObject = (User) validationContext.ObjectInstance;
                if (validationContext.DisplayName.Equals("UserEmail"))
                {
                    User user = new User();
                    user = fsdtsContext.User.SingleOrDefault(usr => usr.UserEmail == value.ToString() && usr.UserId != userFromObject.UserId);

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

        /// <summary>
        /// Class to validate password complexity.
        /// </summary>
        public class ValidatePasswordAttribute : ValidationAttribute
        {
            /// <summary>
            /// IsValid method of ValidatePasswordAttribute class.
            /// </summary>
            /// <param name="value">object value</param>
            /// <param name="validationContext">ValidationContext validationContext</param>
            /// <returns>ValidationResult success or failure.</returns>
             protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                string password = value.ToString();
                int passwordLength = password.Length; 
                int passwordMinimumCharacters = Convert.ToInt32(ConfigurationManager.AppSettings.Get("PasswordMinCharacters"));
                int passwordMaximumCharacters = Convert.ToInt32(ConfigurationManager.AppSettings.Get("PasswordMaxCharacters"));
                int upperCount = 0;
                int lowerCount = 0;
                int numberCount = 0;

                if (!(passwordLength < passwordMinimumCharacters || passwordLength > passwordMaximumCharacters))
                {
                    for (int i = 0; i < passwordLength; i++)
                    {
                        if (password[i] >= 'A' && password[i] <= 'Z')
                        {
                            upperCount += 1;
                        }
                        else
                        if (password[i] >= 'a' && password[i] <= 'z')
                        {
                            lowerCount += 1;
                        }
                        else
                        if (password[i] >= '0' && password[i] <= '9')
                        {
                            numberCount += 1;
                        }
                    }
                }  

                if (upperCount == 0 || lowerCount == 0 || numberCount == 0)
                {
                    return new ValidationResult(ErrorMessage);
                }

                return ValidationResult.Success;
            }
        }
    }
}