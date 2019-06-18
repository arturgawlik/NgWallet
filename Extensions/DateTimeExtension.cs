using System;

namespace ngWallet.Extensions
{
    public static class DateTimeExtension
    {
        public static String ToStringCustom(this DateTime date)
        {
            if (date == null)
                return null;
            else
            {
                if (date.Year == DateTime.Now.Year)
                {
                    return date.ToString("HH:mm, dd MMMM");
                }
                else
                {
                    return date.ToString("HH:mm, dd MMMM yyyy");
                }
            }
        }
    }
}