using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class DataObject
    {
        public string name { get; set; }
        public string age { get; set; }
        public string car { get; set; }
    }


    public class ScheduleCreator
    {
        private const string URL = "https://webhook.site/7dfb72bc-475e-4f19-bb8b-e94bb23eb6d1";
        private static string urlParameters = "?api_key=123";
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
                var dataObjects = response.Content.ReadAsAsync<IEnumerable<DataObject>>().Result;  //Make sure to add a reference to System.Net.Http.Formatting.dll
                foreach (var d in dataObjects)
                {
                    var test = d.age;
                    Console.WriteLine("{0}", d.age);
                }
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return ret;
        }
    }
}
