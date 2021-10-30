using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class ScheduleViewModel
    {
        public DateTime pickupDate { get; set; }
        public String scheduleName { get; set; }
        public virtual Location location { get; set; }
        public ScheduleViewModel(Schedule s) 
        {
            scheduleName = s.ScheduleName;
            pickupDate = s.PickupDateTime;
            location = new Location();
            location.lat = s.Latitude;
            location.lon = s.Longitude;
        }
    }

    public class Location
    {
        public double lat { get; set; }
        public double lon { get; set; }
    }
}
