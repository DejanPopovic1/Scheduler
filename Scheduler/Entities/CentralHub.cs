using System.ComponentModel.DataAnnotations.Schema;

namespace Scheduler.Entities
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
