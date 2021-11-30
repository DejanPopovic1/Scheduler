using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public partial class ScheduleViewModel
    {
        public int Id { get; set; } 
        public DateTime pickupDate { get; set; }
        public String scheduleName { get; set; }
        public virtual Location location { get; set; }

        public ScheduleViewModel()
        {

        }

        public ScheduleViewModel(Schedule s) 
        {
            Id = s.Id;
            scheduleName = s.ScheduleName;
            pickupDate = s.PickupDateTime;
            location = new Location() {
                lat = s.Latitude,
                lon = s.Longitude
            };
            //location.lat = s.Latitude;
            //location.lon = s.Longitude;
        }
    }

    //public class Location
    //{
    //    public double lat { get; set; }
    //    public double lon { get; set; }
    //}
}
