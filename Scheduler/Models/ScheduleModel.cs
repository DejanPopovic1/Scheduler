using System;

namespace Scheduler.Models
{
    public class ScheduleModel
    {
        public TimeSpan StartTime { get; }
        public TimeSpan EndTime { get; }

        public ScheduleModel(TimeSpan start, TimeSpan end)
        {
            StartTime = start;
            EndTime = end;
        }

        public bool IsScheduleOverlap(ScheduleModel otherSchedule)
        {
            if (IsTimeWithinOtherSchedule(StartTime, otherSchedule) || IsTimeWithinOtherSchedule(EndTime, otherSchedule) || IsEclipsingOtherSchedule(otherSchedule))
            {
                return true;
            }
            return false;
        }

        public override string ToString()
        {
            return String.Format("{0} - {1}", StartTime, EndTime);
        }

        private bool IsTimeWithinOtherSchedule(TimeSpan time, ScheduleModel timePeriod)
        {
            if (time > timePeriod.StartTime && time < timePeriod.EndTime) 
            {
                return true;
            }
            return false;
        }

        private bool IsEclipsingOtherSchedule(ScheduleModel timePeriod)
        {
            if (StartTime <= timePeriod.StartTime && EndTime >= timePeriod.EndTime)
            {
                return true;
            }
            return false;
        }
    }
}
