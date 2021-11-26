using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    [Table("CentralHub")]
    public class CentralHub
    {
        public int CentralHubID { get; set; }
        public int UserID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
