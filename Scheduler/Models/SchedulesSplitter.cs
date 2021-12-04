using Scheduler.Entities;
using System;
using System.Collections.Generic;

namespace Scheduler.Models
{
    public static class SchedulesSplitter
    {
        const int NumberOfForecastDays = 12;
        public static List<Booking>[] GetSplitSchedules(DateTime startDate, List<Booking> bookings)
        {
            List<Booking>[] result = new List<Booking>[NumberOfForecastDays];
            for (int i = 0; i < NumberOfForecastDays; i++)
            {
                List<Booking> dayBookings = new List<Booking>();
                foreach (var booking in bookings)
                {
                    if (IsInSameDate(booking.PickupDateTime, startDate.AddDays(i)))
                    {
                        dayBookings.Add(booking);
                    }
                }
                result[i] = dayBookings;
            }
            return result;
        }

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