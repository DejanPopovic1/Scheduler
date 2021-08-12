using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Schedule
    {
        //public DateTime scheduleDate { get; set; }
        //public string scheduleName { get; set; }
        //public float scheduleLat { get; set; }
        //public float scheduleLon { get; set; }

        public DateTime scheduledDate { get; set; }
        public string scheduledItem { get; set; }
        public float scheduledLat { get; set; }
        public float scheduledLng { get; set; }
    }
}
