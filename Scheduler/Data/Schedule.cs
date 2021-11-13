using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    [Table("Schedule")]
    public class Schedule
    {
        public int Id { get; set; }
        public DateTime PickupDateTime { get; set; }
        public String ScheduleName { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public virtual User FK_schedule_user { get; set; }
    }
}
