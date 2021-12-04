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
                int innerResult = 0;
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
    }
}
