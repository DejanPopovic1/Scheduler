﻿using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Scheduler.Models
{
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

    //+-----------------------------------------------------------------------------------------------------------+
    // Google Distance Matrix API Documentation:                                                                  |
    // https://developers.google.com/maps/documentation/distance-matrix/overview?hl=en_US                         |
    //------------------------------------------------------------------------------------------------------------+

    public class ScheduleCreator
    {
        private const string URL = "https://maps.googleapis.com/maps/api/distancematrix/json";
        private const string urlParameters = "?destinations=40.598566%2C-73.7527626%7C40.598566%2C-73.7527626&origins=40.6655101%2C-73.89188969999998&key=AIzaSyDc6llaTb4Zxg0whfiuluFdH7RG8z16Gko";
        private const string commaDelimiter = "%2C";
        private const string pipeDelimiter = "%7C";


        public ScheduleCreator()
        { 
        
        }

        //public static ScheduleModel CreateSchedule(List<Schedule> schedules, CentralHub centralHub)
        //{
        //    TimeSpan travelTime = new TimeSpan(0, 1, 0);
        //    TimeSpan destinationTime = originTime + travelTime;
        //    ScheduleModel ret = new ScheduleModel(originTime, destinationTime);
        //    return ret;
        //}

        //Refactor into a distance matrix in accordance to google's own API
        public static TimeSpan CalculateTravelTime(List<Schedule> schedules, CentralHub centralHub)
        {
            TimeSpan ret = new TimeSpan();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("text/json"));
            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                var dataObjects = response.Content.ReadAsAsync<DataObject>().Result;  //Make sure to add a reference to System.Net.Http.Formatting.dll
                var test = dataObjects.rows;
                Console.WriteLine("{0}", dataObjects.rows);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            return ret;
        }

        public static TimeSpan[,] GenerateDistanceMatrix(List<Location> originAddresses, List<Location> destinationAddresses, string APIKey)
        {

            TimeSpan[,] result = new TimeSpan[originAddresses.Count, destinationAddresses.Count];
            return result;
            
        }

        private DataObject LoadAPIResponseInDataObject(string URLParameters)
        {
            DataObject result;
            TimeSpan ret = new TimeSpan();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("text/json"));
            HttpResponseMessage response = client.GetAsync(URLParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                result = response.Content.ReadAsAsync<DataObject>().Result;
            }
            else
            {
                throw new Exception("Status code unsuccesfull");
            }
            return result;
        }

        private static string CreateURLParameterString(List<Location> originAddresses, List<Location> destinationAddresses, string APIKey)
        {
            string destinations = "0";
            string origins = "1";
            string URLParameters = String.Format("?destinations={0}&origins={1}&key={2}", destinations, origins, APIKey);
            List<string> originAddressesGoogleAPIFormat = new List<string>();
            List<string> destinationAddressesGoogleAPIFormat = new List<string>();
            foreach (Location originAddress in originAddresses)
            {
                originAddressesGoogleAPIFormat.Add(ToGoogleAPILocation(originAddress));
            }
            foreach (Location destinationAddress in destinationAddresses)
            {
                destinationAddressesGoogleAPIFormat.Add(ToGoogleAPILocation(destinationAddress));
            }
            string originParameter = String.Join(pipeDelimiter, originAddressesGoogleAPIFormat);
            string destinationParameter = String.Join(pipeDelimiter, destinationAddressesGoogleAPIFormat);
            return String.Format("?destinations={0}&origins={1}&key={2}", destinationParameter, originParameter, APIKey);
        }

        private static string ToGoogleAPILocation(Location location)
        {
            return (location.lat).ToString() + commaDelimiter + (location.lon).ToString();
        }
    }
}
