using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Schedule
    {
        public DateTime scheduleDate { get; set; }
        public string scheduleName { get; set; }
        public float scheduleLat { get; set; }
        public float scheduleLon { get; set; }
    }
}
