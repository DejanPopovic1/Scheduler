using Scheduler.Entities;
using System;
using System.Collections.Generic;

namespace Scheduler.Models
{
    public class SchedulesSplitter
    {
        const int NumberOfForecastDays = 12;
        public List<Booking>[] ForecastedSchedules { get; set; }

        public List<int>[] ForecastedSchedulesIds { get; set; }
        //public SchedulesSplitter(DateTime startDate, List<Schedule> schedules)
        //{
        //    ForecastedSchedules = new List<Schedule>[NumberOfForecastDays];
        //    for (int i = 0; i < ForecastedSchedules.Length; i++)
        //    {
        //        List<Schedule> schedulesForADay = new List<Schedule>();
        //        foreach (var schedule in schedules)
        //        {
        //            var test1 = schedule.PickupDateTime;
        //            var test2 = startDate;
        //            if (IsSameYearMonthDate(schedule.PickupDateTime, startDate.AddDays(i)))
        //            {
        //                schedulesForADay.Add(schedule);
        //            }
        //        }
        //        ForecastedSchedules[i] = schedulesForADay;
        //    }
        //}

        public SchedulesSplitter(DateTime startDate, List<Booking> schedules)
        {
            ForecastedSchedulesIds = new List<int>[NumberOfForecastDays];
            for (int i = 0; i < ForecastedSchedulesIds.Length; i++)
            {
                List<int> schedulesForADay = new List<int>();
                foreach (var schedule in schedules)
                {
                    if (IsInSameDate(schedule.PickupDateTime, startDate.AddDays(i)))
                    {
                        schedulesForADay.Add(schedule.Id);
                    }
                }
                ForecastedSchedulesIds[i] = schedulesForADay;
            }
        }

        private bool IsInSameDate(DateTime t1, DateTime t2)
        {
            if (t1.Year == t2.Year && t1.Month == t2.Month && t1.Date == t2.Date)
            {
                return true;
            }
            return false;
        }
    }
}