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
        public DataPoints GraphDataPoints { get; set; }
        public Coordinates HubLocation { get; set; }

        public SchedulerToolViewModel()
        {

        }
    }

    public class Coordinates
    {
        public double lat { get; set; }
        public double lon { get; set; }
    }

    public class DataPoints
    {
        public List<DataPoint> DataPointsList { get; set; }
    }

    public class DataPoint
    {
        public DateTime Date { get; set; }
        public int NumberOfResources { get; set; }
    }
}
