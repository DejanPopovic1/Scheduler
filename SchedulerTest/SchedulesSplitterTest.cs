using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;
using Scheduler.Data;

namespace SchedulerTest
{
    public class SchedulesSplitterTest
    {
        List<Schedule> schedules;
        SchedulesSplitter schedulesSplitter;

        [SetUp]
        public void Setup()
        {
            schedules = new List<Schedule>() {
                new Schedule(){ PickupDateTime = new DateTime(2021, 11, 29, 15, 0, 0) },//0
                new Schedule(){ PickupDateTime = new DateTime(2021, 11, 29, 15, 0, 0) },//1
                new Schedule(){ PickupDateTime = new DateTime(2021, 11, 29, 15, 0, 0) },//2
                new Schedule(){ PickupDateTime = new DateTime(2021, 11, 29, 15, 0, 0) },//3
                new Schedule(){ PickupDateTime = new DateTime(2021, 11, 29, 15, 0, 0) },//4
                new Schedule(){ PickupDateTime = new DateTime(2021, 11, 30, 15, 0, 0) },//5
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 1, 15, 0, 0) },//6
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 2, 15, 0, 0) },//7
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 2, 15, 0, 0) },//8
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 2, 15, 0, 0) },//9
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 5, 15, 0, 0) },//10
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 9, 15, 0, 0) },//11
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 10, 15, 0, 0) },//12
                new Schedule(){ PickupDateTime = new DateTime(2021, 12, 11, 15, 0, 0) },//13
                new Schedule(){ PickupDateTime = new DateTime(2022, 1, 28, 15, 0, 0) },//14
                new Schedule(){ PickupDateTime = new DateTime(2022, 1, 28, 15, 0, 0) }//15
            };
            DateTime startDate = new DateTime(2021, 11, 28);
            schedulesSplitter = new SchedulesSplitter(startDate, schedules);
        }

        [Test]
        public void should_split_schedules_into_upcoming_days()
        {
            var expected1 = new List<Schedule>();
            var expected2 = new List<Schedule>() {
                schedules[0],
                schedules[1],
                schedules[2],
                schedules[3],
                schedules[4],
            };
            var expected3 = new List<Schedule>(){
                schedules[5],
            };
            var expected4 = new List<Schedule>() {
                schedules[6],
            };
            var expected5 = new List<Schedule>() {
                schedules[7],
                schedules[8],
                schedules[9],
            };
            var expected6 = new List<Schedule>();
            var expected7 = new List<Schedule>();
            var expected8 = new List<Schedule>() {
                schedules[10],
            };
            var expected9 = new List<Schedule>();
            var expected10 = new List<Schedule>();
            var expected11 = new List<Schedule>();
            var expected12 = new List<Schedule>();
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[0], expected1);
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[1], expected2);
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[2], expected3);
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[3], expected4);
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[4], expected5);
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[5], expected6);
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[6], expected7);
            Assert.AreEqual(schedulesSplitter.ForecastedSchedules[7], expected8);
        }
    }
}