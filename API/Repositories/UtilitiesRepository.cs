using System;
using System.Globalization;
using System.Linq;
using System.Text;
using EmagrecerSocial.API.Interfaces;
using Microsoft.AspNetCore.Http;

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
    }
}