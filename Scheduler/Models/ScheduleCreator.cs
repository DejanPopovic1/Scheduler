using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class ScheduleCreator
    {
        public ScheduleCreator()
        { 
        
        }

        public static ScheduleModel CreateSchedule(TimeSpan originTime, float originLat, float originLon, float destinationLat, float destinationLon)
        {
            TimeSpan travelTime = new TimeSpan(0, 1, 0);
            TimeSpan destinationTime = originTime + travelTime;
            ScheduleModel ret = new ScheduleModel(originTime, destinationTime);
            return ret;
        }
    }
}
