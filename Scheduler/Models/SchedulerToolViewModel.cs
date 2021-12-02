using Scheduler.Data;
using System;
using System.Collections.Generic;

namespace Scheduler.Models
{
    public partial class SchedulerToolViewModel
    {
        public int NumberOfSchedulingUsers { get; set; }
        public int TotalKmTravelledForTheNextDay { get; set; }
        public int TotalHoursTravelledForTheNextDay { get; set; }
        //public DataPoints GraphDataPoints { get; set; }

        public List<int> RequiredResourcesPerDay { get; set; }

        public Location HubLocation { get; set; }

        public SchedulerToolViewModel()
        {

        }
    }
}
