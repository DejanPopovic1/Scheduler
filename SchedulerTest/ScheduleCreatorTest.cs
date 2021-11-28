using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;

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
            var test = ScheduleCreator.CalculateTravelTime(1.1f, 2.2f, 3.3f, 4.4f);
        }
    }
}