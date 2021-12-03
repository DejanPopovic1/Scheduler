using Scheduler.Entities;
using Scheduler.Models;
using System;

namespace Scheduler.ViewModels
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

        public ScheduleViewModel(Booking s) 
        {
            Id = s.Id;
            scheduleName = s.ScheduleName;
            pickupDate = s.PickupDateTime;
            location = new Location() {
                lat = s.Latitude,
                lon = s.Longitude
            };
        }
    }
}
