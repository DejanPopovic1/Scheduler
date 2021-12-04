using Scheduler.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public static class BookingHelper
    {
        public static List<int> NumberOfResourcesPerDay(List<Booking> bookings, List<TimeSpan> travelTimes)
        {
            List<int> result = new List<int>();
            List<Booking>[] bookingsByDay = SchedulesSplitter.GetSplitSchedules(DateTime.Now, bookings);
            int i = 0;
            foreach (var booking in bookingsByDay) 
            {
                List<Vertex> schedules = booking.Select(x => { 
                    ScheduleModel scheduleModel = new ScheduleModel(x.PickupDateTime.TimeOfDay, travelTimes[i]);
                    ScheduleVertex scheduleVertex = new ScheduleVertex(scheduleModel);
                    return scheduleVertex;
                }).Cast<Vertex>().ToList();
                UndirectedGenericGraph<ScheduleModel> graph = new UndirectedGenericGraph<ScheduleModel>(schedules);
                graph.CreateEdgesUnoptimised();
                graph.ColourGraph();
                result.Add(graph.ColouringNumber);
                i++;
            }
            return result;
        }

        public static int HoursOfTravelInADay(List<Booking> bookings, List<TimeSpan> travelTimes)
        {
            List<BookingTravelTime> bookingTravelTimes = new List<BookingTravelTime>();
            long totalTicks = 0;
            int i = 0;
            foreach (var booking in bookings)
            {
                BookingTravelTime bookingTravelTime = new BookingTravelTime() { Booking = booking, TravelTime = travelTimes[i]};
                bookingTravelTimes.Add(bookingTravelTime);
            }
            foreach (var bookingTravelTime in bookingTravelTimes)
            {
                if (IsInSameDate(bookingTravelTime.Booking.PickupDateTime, DateTime.Now))
                {
                    totalTicks += bookingTravelTime.TravelTime.Ticks;
                }
            }
            var test = totalTicks;
            int totalHours = (int)(totalTicks / 10000000 / 60);
            return totalHours;
        }

        private static bool IsInSameDate(DateTime t1, DateTime t2)
        {
            if (t1.Year == t2.Year && t1.Month == t2.Month && t1.Date == t2.Date)
            {
                return true;
            }
            return false;
        }

        private class BookingTravelTime
        {
            public Booking Booking { get; set; }
            public TimeSpan TravelTime { get; set; }
        }
    }
}
