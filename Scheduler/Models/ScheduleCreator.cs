using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    //public class DataObject
    //{
    //    public string name { get; set; }
    //    public string age { get; set; }
    //    public string car { get; set; }
    //}

    public class DataObject
    {
        public List<string> destination_addresses { get; set; }
        public List<string> origin_addresses { get; set; }
        public List<APIElements> rows { get; set; }
        public string status { get; set; }
    }
    public class APIElements
    {
        public List<APIDistanceDurationStatus> elements { get; set; }
    }

    public class APIDistanceDurationStatus
    {
        public APIKeyValue distance { get; set; }
        public APIKeyValue duration { get; set; }
        public string status { get; set; }
    }

    public class APIKeyValue
    {
        public string text { get; set; }
        public string value { get; set; }
    }

    public class ScheduleCreator
    {
        //private const string URL = "https://webhook.site/7dfb72bc-475e-4f19-bb8b-e94bb23eb6d1";
        //private static string urlParameters = "?api_key=123";
        private const string URL = "https://maps.googleapis.com/maps/api/distancematrix/json";
        private static string urlParameters = "?destinations=40.598566%2C-73.7527626&origins=40.6655101%2C-73.89188969999998&key=AIzaSyDc6llaTb4Zxg0whfiuluFdH7RG8z16Gko";

        public ScheduleCreator()
        { 
        
        }

        public static ScheduleModel CreateSchedule(TimeSpan originTime, float originLat, float originLon, float destinationLat, float destinationLon)
        {
            TimeSpan travelTime = new TimeSpan(0, 1, 0);
            TimeSpan destinationTime = originTime + travelTime;
            ScheduleModel ret = new ScheduleModel(originTime, destinationTime);
            return ret;
        }

        public static TimeSpan CalculateTravelTime(float originLat, float originLon, float destinationLat, float destinationLon)
        {
            TimeSpan ret = new TimeSpan();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);
            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            //new MediaTypeWithQualityHeaderValue("application/json"));
            new MediaTypeWithQualityHeaderValue("text/json"));
            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                // Parse the response body.
                //var dataObjects = response.Content.ReadAsAsync<IEnumerable<DataObject>>().Result;  //Make sure to add a reference to System.Net.Http.Formatting.dll
                var dataObjects = response.Content.ReadAsAsync<DataObject>().Result;  //Make sure to add a reference to System.Net.Http.Formatting.dll
                //foreach (var d in dataObjects)
                //{
                //    var test = d.destination_addresses;
                //    Console.WriteLine("{0}", d.destination_addresses);
                //}


                var test = dataObjects.destination_addresses;
                Console.WriteLine("{0}", dataObjects.destination_addresses);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return ret;
        }
    }
}
