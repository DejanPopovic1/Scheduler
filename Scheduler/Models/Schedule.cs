using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Schedule
    {
        public DateTime pickupDate { get; set; }
        public String scheduleName { get; set; }
        public virtual Location location { get; set; }
    }

    public class Location
    {
        public double lat { get; set; }
        public double lon { get; set; }
    }
}
