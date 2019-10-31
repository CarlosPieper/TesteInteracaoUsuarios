using System;
namespace EmagrecerSocial.API.Interfaces
{
    public interface IUtilitiesRepository
    {
        int DateTimeToJulian(DateTime date);
        int DateToJulian(string date);
        int GetDateNumber(string datestring);
        DateTime JulianToDate(int days);
        string JulianToDateString(int days);
        string RemoveAccents(string text);
    }
}