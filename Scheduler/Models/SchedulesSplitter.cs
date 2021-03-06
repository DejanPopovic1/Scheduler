using Scheduler.Entities;
using System;
using System.Collections.Generic;

namespace Scheduler.Models
{
    public static class SchedulesSplitter
    {
        const int NumberOfForecastDays = 12;
        public static List<BookingDateAndDuration>[] GetSplitSchedules(DateTime startDate, List<BookingDateAndDuration> bookings)
        {
            List<BookingDateAndDuration>[] result = new List<BookingDateAndDuration>[NumberOfForecastDays];
            for (int i = 0; i < NumberOfForecastDays; i++)
            {
                List<BookingDateAndDuration> dayBookings = new List<BookingDateAndDuration>();
                foreach (var booking in bookings)
                {
                    if (IsInSameDate(booking.BookingDate, startDate.AddDays(i)))
                    {
                        dayBookings.Add(booking);
                    }
                }
                result[i] = dayBookings;
            }
            return result;
        }

        //public static List<int>[] GetSplitSchedulesIds(DateTime startDate, List<Booking> bookings)
        //{
        //    List<int>[] result = new List<int>[NumberOfForecastDays];
        //    for (int i = 0; i < NumberOfForecastDays; i++)
        //    {
        //        List<Booking> dayBookings = new List<Booking>();
        //        foreach (var booking in bookings)
        //        {
        //            if (IsInSameDate(booking.PickupDateTime, startDate.AddDays(i)))
        //            {
        //                dayBookings.Add(booking);
        //            }
        //        }
        //        result[i] = dayBookings.Id;
        //    }
        //    return result;
        //}

        private static bool IsInSameDate(DateTime t1, DateTime t2)
        {
            if (t1.Year == t2.Year && t1.Month == t2.Month && t1.Date == t2.Date)
            {
                return true;
            }
            return false;
        }
    }
}