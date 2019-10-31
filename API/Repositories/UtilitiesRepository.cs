using System;
using System.Drawing;
using System.Globalization;
using System.Text;
using EmagrecerSocial.API.Interfaces;

namespace EmagrecerSocial.API.Repositories
{
    public class UtilitiesRepository : IUtilitiesRepository
    {
        public static string filePath = "";
        public static string coverPic = "";
        public static string profilePic = "";

        public int DateTimeToJulian(DateTime date)
        {
            DateTime inicioJulian = new DateTime(1800, 12, 28);
            int julian = (date - inicioJulian).Days;
            return julian;
        }

        public int DateToJulian(string date)
        {

            date = date.Replace("/", "");
            DateTime dt = DateTime.ParseExact(date, "ddMMyyyy", System.Globalization.CultureInfo.InvariantCulture);
            return DateTimeToJulian(dt);
        }

        public int GetDateNumber(string datestring)
        {
            if (datestring == "" || datestring == "0") { return 0; }
            else
            {
                if (datestring.Length == 7)
                {
                    datestring = "0" + datestring;
                }
                else if (datestring.Length > 10)
                {
                    datestring = datestring.Substring(0, 10);
                }
                return DateToJulian(datestring);
            }
        }

        public DateTime JulianToDate(int days)
        {
            if (days == 0)
            {
                return DateTime.Now;
            }
            return Convert.ToDateTime("28/12/1800").AddDays(days); ;
        }

        public string JulianToDateString(int days)
        {
            if (days == 0)
            {
                return "";
            }
            return Convert.ToDateTime("28/12/1800").AddDays(days).ToString("dd/MM/yyyy");
        }
        public string RemoveAccents(string text)
        {
            StringBuilder sbReturn = new StringBuilder();
            var arrayText = text.Normalize(NormalizationForm.FormD).ToCharArray();
            foreach (char letter in arrayText)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(letter) != UnicodeCategory.NonSpacingMark)
                    sbReturn.Append(letter);
            }
            return sbReturn.ToString();
        }

        /*public string resizeImage (int altura, int largura){
            var size = new Size();
            size.Height = altura;
            if (largura > 0)
            {
                size.Width = largura;
            }
            //System.Drawing.Imaging.ImageFormat.Png
            System.Drawing.Image imgToResize = System.Drawing.Bitmap.FromStream(byteParaImagem(strbyte));
            int sourceWidth = imgToResize.Width;
            int sourceHeight = imgToResize.Height;
            float nPercent = 0;
            float nPercentW = 0;
            float nPercentH = 0;
            if (largura > 0)
            {
                nPercentW = ((float)size.Width / (float)sourceWidth);
            }
            else
            {
                nPercentW = 100;
            }
            nPercentH = ((float)size.Height / (float)sourceHeight);
            if (nPercentH < nPercentW)
            {
                nPercent = nPercentH;
            }
            else
            {
                nPercent = nPercentW;
            }
            int destWidth = (int)(sourceWidth * nPercent);
            int destHeight = (int)(sourceHeight * nPercent);
            Bitmap b = new Bitmap(destWidth, destHeight);
            Graphics g = Graphics.FromImage((Image)b);
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.DrawImage(imgToResize, 0, 0, destWidth, destHeight);
            g.Dispose();
            strBytePreviw = string.Empty;
            return streamToStrBytes(ImageToStream((Image)b));
        }*/
    }
}