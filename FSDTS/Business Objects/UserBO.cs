﻿//-----------------------------------------------------------------------
// <copyright file="UserBO.cs" company="FSD">
//     Data Tracking System
// </copyright>
//-----------------------------------------------------------------------
namespace FSDTS.Business_Objects
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Security.Cryptography;
    using System.Web;
    using System.Web.Http;
    using FSDTS.Common;
    using FSDTS.Models;

    /// <summary>
    /// Class UserBO.
    /// To handle user specific functions.
    /// </summary>
    public class UserBO
    {
        /// <summary>
        /// Creating data context instance.
        /// </summary>
        private FSDTSContext db = new FSDTSContext();



        /// <summary>
        /// SymmetricEncryptData method of UserBO class.
        /// </summary>
        /// <param name="clearText">string clearText</param>
        /// <returns>Encrypted string</returns>
        [FsdtsExceptionHandler]
        public static string SymmetricEncryptData(string clearText)
        {
            ////create a byte array to store the encrypted result.
            byte[] encryptedText;
            ////create an instance of UTF8 Encoding
            System.Text.UTF8Encoding UTF8Encoding = new System.Text.UTF8Encoding();
            ////create an instance of any hash provider
            MD5CryptoServiceProvider hash = new MD5CryptoServiceProvider();
            ////encode and then hash the shared private KEY.
            string symmetricKey = "1prt56";
            byte[] tripleDESKey = hash.ComputeHash(UTF8Encoding.GetBytes(symmetricKey));

            ////create an instance of 3DES Cryptography class and assign the shared Key to that instance
            TripleDESCryptoServiceProvider tripleDes = new TripleDESCryptoServiceProvider();
            tripleDes.Key = tripleDESKey;
            tripleDes.Mode = CipherMode.ECB;
            tripleDes.Padding = PaddingMode.PKCS7;

            ////convert the input clear text to byte array 
            byte[] clearBytes = UTF8Encoding.GetBytes(clearText);
            try
            {
                ICryptoTransform cryptoEncryptor = tripleDes.CreateEncryptor();
                encryptedText = cryptoEncryptor.TransformFinalBlock(clearBytes, 0, clearBytes.Length);
            }
            finally
            {
                tripleDes.Clear();
                hash.Clear();
            }

            return Convert.ToBase64String(encryptedText);
        }
        /// <summary>
        /// SymmetricDecryptData method of UserBO class.
        /// </summary>
        /// <param name="cypherText">string cypherText</param>
        /// <returns>Decrypted string</returns>

        [FsdtsExceptionHandler]

        public static string SymmetricDecryptData(string cypherText)
        {
            ////create a byte array to store the encrypted result.
            byte[] decryptedData;
            ////create an instance of UTF8 Encoding
            System.Text.UTF8Encoding UTF8Encoding = new System.Text.UTF8Encoding();
            ////create an instance of any hash provider
            MD5CryptoServiceProvider hash = new MD5CryptoServiceProvider();
            ////encode and then hash the shared private KEY.
            string symmetricKey = "1prt56";
            byte[] tripleDESKey = hash.ComputeHash(UTF8Encoding.GetBytes(symmetricKey));

            ////create an instance of 3DES Cryptography class and assign the shared Key to that instance
            TripleDESCryptoServiceProvider tripleDes = new TripleDESCryptoServiceProvider();
            tripleDes.Key = tripleDESKey;
            tripleDes.Mode = CipherMode.ECB;
            tripleDes.Padding = PaddingMode.PKCS7;

            ////convert the input cypher text to byte array 
            byte[] cypherBytes = Convert.FromBase64String(cypherText);
            try
            {
                ICryptoTransform cryptoDecryptor = tripleDes.CreateDecryptor();
                decryptedData = cryptoDecryptor.TransformFinalBlock(cypherBytes, 0, cypherBytes.Length);
            }
            finally
            {
                tripleDes.Clear();
                hash.Clear();
            }

            return UTF8Encoding.GetString(decryptedData);
        }

        public static string GetUniqueKey(User user)
        {
            UserBO userBO = new UserBO();
            string vcode = userBO.GenerateVerificationCode(user.UserId.ToString(), user.UserFirstName.ToString());
            return vcode;
        }

        public string GenerateVerificationCode(string userid, string firstname)
        {
            Random random = new Random();
            string vcode;

            string fname = firstname.Substring(0, 1);
            vcode = fname.ToString() + random.Next(100, 10000).ToString() + userid.ToString();

            return vcode;
        }
    }
}