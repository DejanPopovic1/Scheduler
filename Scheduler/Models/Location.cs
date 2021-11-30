namespace Scheduler.Models
{
    public class Location
    {
        public double lat { get; set; }
        public double lon { get; set; }

        public Location()
        {

        }

        public Location(double latitude, double longitude)
        {
            lat = latitude;
            lon = longitude;
        }
    }
}
