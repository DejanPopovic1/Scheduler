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
        public String Id { get; set; }
        public DateTime PickupDateTime { get; set; }
        public String ScheduleName { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
