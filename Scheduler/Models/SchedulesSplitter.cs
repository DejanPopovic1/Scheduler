using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class SchedulesSplitter
    {
        const int NumberOfForecastDays = 12;
        public List<Schedule>[] ForecastedSchedules { get; set; }
        public SchedulesSplitter(DateTime startDate, List<Schedule> schedules)
        {
            ForecastedSchedules = new List<Schedule>[NumberOfForecastDays];
            for (int i = 0; i < ForecastedSchedules.Length; i++)
            {
                List<Schedule> schedulesForADay = new List<Schedule>();
                foreach (var schedule in schedules)
                {
                    var test1 = schedule.PickupDateTime;
                    var test2 = startDate;
                    if (IsSameYearMonthDate(schedule.PickupDateTime, startDate.AddDays(i)))
                    {
                        schedulesForADay.Add(schedule);
                    }
                }
                ForecastedSchedules[i] = schedulesForADay;
            }
        }

        private bool IsSameYearMonthDate(DateTime t1, DateTime t2)
        {
            if (t1.Year == t2.Year && t1.Month == t2.Month && t1.Date == t2.Date)
            {
                return true;
            }
            return false;
        }
    }
}
