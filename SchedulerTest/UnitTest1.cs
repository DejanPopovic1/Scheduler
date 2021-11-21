using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;

namespace SchedulerTest
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
            ScheduleModel schedule1 = new ScheduleModel(new TimeSpan(10,15,0), new TimeSpan(11, 0, 0));
            ScheduleModel schedule2 = new ScheduleModel(new TimeSpan(11, 15, 0), new TimeSpan(12, 0, 0));
            ScheduleModel schedule3 = new ScheduleModel(new TimeSpan(11, 10, 0), new TimeSpan(12, 30, 0));
            ScheduleModel schedule4 = new ScheduleModel(new TimeSpan(12, 15, 0), new TimeSpan(12, 45, 0));
            ScheduleModel schedule5 = new ScheduleModel(new TimeSpan(12, 15, 0), new TimeSpan(13, 0, 0));
            ScheduleModel schedule6 = new ScheduleModel(new TimeSpan(12, 30, 0), new TimeSpan(14, 0, 0));
            ScheduleModel schedule7 = new ScheduleModel(new TimeSpan(13, 45, 0), new TimeSpan(14, 30, 0));

            Vertex<ScheduleModel> vertex1 = new Vertex<ScheduleModel>(schedule1);
            Vertex<ScheduleModel> vertex2 = new Vertex<ScheduleModel>(schedule1);
            Vertex<ScheduleModel> vertex3 = new Vertex<ScheduleModel>(schedule1);
            Vertex<ScheduleModel> vertex4 = new Vertex<ScheduleModel>(schedule1);
            Vertex<ScheduleModel> vertex5 = new Vertex<ScheduleModel>(schedule1);
            Vertex<ScheduleModel> vertex6 = new Vertex<ScheduleModel>(schedule1);
            Vertex<ScheduleModel> vertex7 = new Vertex<ScheduleModel>(schedule1);

            List<Vertex<ScheduleModel>> vertices = new List<Vertex<ScheduleModel>>()
            {
                vertex1,
                vertex2,
                vertex3,
                vertex4,
                vertex5,
                vertex6,
                vertex7
            };

            vertices[1].AddEdges(new List<Vertex<ScheduleModel>>() { vertex2 });
            vertices[2].AddEdges(new List<Vertex<ScheduleModel>>() { vertex1, vertex3, vertex4 });
            vertices[3].AddEdges(new List<Vertex<ScheduleModel>>() { vertex2, vertex4, vertex5 });
            vertices[4].AddEdges(new List<Vertex<ScheduleModel>>() { vertex2, vertex3, vertex5 });
            vertices[5].AddEdges(new List<Vertex<ScheduleModel>>() { vertex3, vertex4, vertex6 });
            vertices[6].AddEdges(new List<Vertex<ScheduleModel>>() { vertex5 });
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}