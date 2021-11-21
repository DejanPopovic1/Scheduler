using System;

namespace Scheduler.Models
{
    public class ScheduleModel : Vertex<TimeSpan[]>
    {
        public ScheduleModel(TimeSpan start, TimeSpan end) : base(new TimeSpan[]{start, end})
        {

        }

        public bool isScheduleOverlap(ScheduleModel otherSchedule)
        {
            if (isTimeWithinTimePeriod(Value[0], otherSchedule) || isTimeWithinTimePeriod(Value[1], otherSchedule))
            {
                return true;
            }
            return false;
        }

        private bool isTimeWithinTimePeriod(TimeSpan time, ScheduleModel timePeriod)
        {
            if (time > timePeriod.Value[0] && time < timePeriod.Value[1]) 
            {
                return true;
            }
            return false;
        }
    }
}
