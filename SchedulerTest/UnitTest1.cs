using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;

namespace SchedulerTest
{
    public class Tests
    {
        ScheduleModel schedule1;
        Vertex<ScheduleModel> schedule2;
        ScheduleModel schedule3;
        Vertex<ScheduleModel> schedule4;
        Vertex<ScheduleModel> schedule5;
        Vertex<ScheduleModel> schedule6;
        Vertex<ScheduleModel> schedule7;
        List<Vertex<ScheduleModel>> scheduleModels;

        [SetUp]
        public void Setup()
        {
            schedule1 = new ScheduleModel(new TimeSpan(10, 15, 0), new TimeSpan(11, 0, 0));
            schedule2 = new ScheduleModel(new TimeSpan(11, 15, 0), new TimeSpan(12, 0, 0));
            schedule3 = new ScheduleModel(new TimeSpan(11, 10, 0), new TimeSpan(12, 30, 0));
            schedule4 = new ScheduleModel(new TimeSpan(12, 15, 0), new TimeSpan(12, 45, 0));
            schedule5 = new ScheduleModel(new TimeSpan(12, 15, 0), new TimeSpan(13, 0, 0));
            schedule6 = new ScheduleModel(new TimeSpan(12, 30, 0), new TimeSpan(14, 0, 0));
            schedule7 = new ScheduleModel(new TimeSpan(13, 45, 0), new TimeSpan(14, 30, 0));

            var testList = new List<Vertex<ScheduleModel>>() { schedule3 };

            schedule2.AddEdges(new List<Vertex<ScheduleModel>>() { schedule3 });
            schedule3.AddEdges(new List<Vertex<ScheduleModel>>() { schedule2, schedule4, schedule5 });
            schedule4.AddEdges(new List<Vertex<ScheduleModel>>() { schedule3, schedule5, schedule6 });
            schedule5.AddEdges(new List<Vertex<ScheduleModel>>() { schedule3, schedule4, schedule6 });
            schedule6.AddEdges(new List<Vertex<ScheduleModel>>() { schedule4, schedule5, schedule7 });
            schedule7.AddEdges(new List<Vertex<ScheduleModel>>() { schedule6 });

            scheduleModels = new List<Vertex<ScheduleModel>>() {
                schedule1,
                schedule2,
                schedule3,
                schedule4,
                schedule5,
                schedule6,
                schedule7,
            };
        }

        [Test]
        public void Test1()
        {
            //UndirectedGenericGraph<ScheduleModel> graphTest = new UndirectedGenericGraph<ScheduleModel>(scheduleModels);
            Assert.IsTrue(true);
        }
    }
}