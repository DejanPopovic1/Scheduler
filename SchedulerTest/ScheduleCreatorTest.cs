using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;
using Scheduler.Data;

namespace SchedulerTest
{
    public class ScheduleCreatorTest
    {

        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void should_make_an_api_call()
        {
            List<Schedule> schedules = new List<Schedule>() {
                new Schedule(){ 
                    Latitude = 1.1f,
                    Longitude = 2.2f
                },
                new Schedule(){
                    Latitude = 15.15f,
                    Longitude = 25.25f
                }
            };
            CentralHub centralHub = new CentralHub() {
                Latitude = 10.1f,
                Longitude = 3.33f
            };
            var test = ScheduleCreator.CalculateTravelTime(schedules, centralHub);
        }
    }
}