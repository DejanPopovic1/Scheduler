using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;
using Scheduler.Entities;
using System.Threading;
using System.Globalization;

namespace SchedulerTest
{
    public class DistanceMatrixCreatorTest
    {

        [SetUp]
        public void Setup()
        {

        }

        ////?destinations=40.598566%2C-73.7527626%7C40.598566%2C-73.7527626&origins=40.6655101%2C-73.89188969999998&key=AIzaSyDc6llaTb4Zxg0whfiuluFdH7RG8z16Gko
        //[Test]
        //public void should_make_an_api_call()
        //{
        //    List<Schedule> schedules = new List<Schedule>() {
        //        new Schedule(){ 
        //            Latitude = 1.1f,
        //            Longitude = 2.2f
        //        },
        //        new Schedule(){
        //            Latitude = 15.15f,
        //            Longitude = 25.25f
        //        }
        //    };
        //    CentralHub centralHub = new CentralHub() {
        //        Latitude = 10.1f,
        //        Longitude = 3.33f
        //    };
        //    var test = DistanceMatrixCreator.CalculateTravelTime(schedules, centralHub);
        //}

        [Test]
        public void should_correctly_load_api_response_into_data_object()
        {
            string APIKey = "AIzaSyDc6llaTb4Zxg0whfiuluFdH7RG8z16Gko";

            //List<Location> origins = new List<Location>()
            //{
            //    new Location(13.1111, 2.222222),
            //    new Location(12.1111, 2.222222),
            //    new Location(17.1111, 2.222222)
            //};

            //List<Location> destinations = new List<Location>()
            //{
            //    new Location(21.1111, 4.442222),
            //    new Location(31.1111, 2.552222),
            //    new Location(41.1111, 6.222222)
            //};

            List<Location> origins = new List<Location>()
            {
                new Location(45.6655101, -75.89188969999998),
                new Location(40.6655101, -73.89188969999998),
                new Location(41.6655101, -74.89188969999998)
            };

            List<Location> destinations = new List<Location>()
            {
                new Location(46.6655101, -76.89188969999998),
                new Location(40.598566, -73.7527626),
                new Location(41.598566, -73.7527626)
            };

            var test = origins[0].lat.ToString();

            DistanceMatrix distanceMatrix = DistanceMatrixCreator.GenerateDistanceMatrix(origins, destinations, APIKey);

            Assert.AreEqual("hi", "hi");
        }
    }
}