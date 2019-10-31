using System;
using System.Text;

namespace EmagrecerSocial.API.Controllers
{
    public class Cryptography
    {
        public static string EncryptPassword(string password)
        {
            try
            {
                byte[] buffer = Encoding.Default.GetBytes(password);
                System.Security.Cryptography.SHA1CryptoServiceProvider cryptoTransformSHA1 = new System.Security.Cryptography.SHA1CryptoServiceProvider();
                string hash = BitConverter.ToString(cryptoTransformSHA1.ComputeHash(buffer)).Replace("-", "");
                return hash;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}