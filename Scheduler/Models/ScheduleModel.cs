using System;

namespace Scheduler.Models
{
    public class ScheduleModel
    {
        private TimeSpan[] schedule;
        public ScheduleModel(TimeSpan start, TimeSpan end)
        {
            schedule = new TimeSpan[2];
            schedule[0] = start;
            schedule[1] = end;
        }

        public bool isScheduleOverlap(ScheduleModel otherSchedule)
        {
            if (isTimeWithinTimePeriod(schedule[0], otherSchedule) || isTimeWithinTimePeriod(schedule[1], otherSchedule))
            {
                return true;
            }
            return false;
        }

        private bool isTimeWithinTimePeriod(TimeSpan time, ScheduleModel timePeriod)
        {
            if (time > timePeriod.schedule[0] && time < timePeriod.schedule[1]) 
            {
                return true;
            }
            return false;
        }
    }
}
