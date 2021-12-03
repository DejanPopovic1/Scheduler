using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scheduler.Entities
{
    [Table("Booking")]
    public class Booking
    {
        public int Id { get; set; }
        public DateTime PickupDateTime { get; set; }
        public String ScheduleName { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public virtual User FK_schedule_user { get; set; }
    }
}
