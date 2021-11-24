using System;

namespace Scheduler.Models
{
    public class ScheduleModel
    {
        enum ScheduleTime
        {
            StartTime,
            Endtime
        }

        private TimeSpan[] schedule;
        public ScheduleModel(TimeSpan start, TimeSpan end)
        {
            schedule = new TimeSpan[2];
            schedule[0] = start;
            schedule[1] = end;
        }

        public bool IsScheduleOverlap(ScheduleModel otherSchedule)
        {
            if (IsTimeWithinOtherSchedule(schedule[0], otherSchedule) || IsTimeWithinOtherSchedule(schedule[1], otherSchedule) || IsEclipsingOtherSchedule(otherSchedule))
            {
                return true;
            }
            return false;
        }

        private bool IsTimeWithinOtherSchedule(TimeSpan time, ScheduleModel timePeriod)
        {
            if (time > timePeriod.schedule[0] && time < timePeriod.schedule[1]) 
            {
                return true;
            }
            return false;
        }

        private bool IsEclipsingOtherSchedule(ScheduleModel timePeriod)
        {
            if (schedule[0] <= timePeriod.schedule[0] && schedule[1] >= timePeriod.schedule[1])
            {
                return true;
            }
            return false;
        }

        public override string ToString()
        {
            return String.Format("{0} - {1}", schedule[0], schedule[1]);
        }
    }
}
