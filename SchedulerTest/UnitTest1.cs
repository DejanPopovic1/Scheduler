using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;

namespace SchedulerTest
{
    public class Tests
    {
        List<Vertex> scheduleVertices;

        [SetUp]
        public void Setup()
        {
            Vertex scheduleVertex1 = new ScheduleVertex(new ScheduleModel(new TimeSpan(10, 15, 0), new TimeSpan(11, 0, 0)));
            Vertex scheduleVertex2 = new ScheduleVertex(new ScheduleModel(new TimeSpan(11, 15, 0), new TimeSpan(12, 0, 0)));
            Vertex scheduleVertex3 = new ScheduleVertex(new ScheduleModel(new TimeSpan(11, 10, 0), new TimeSpan(12, 30, 0)));
            Vertex scheduleVertex4 = new ScheduleVertex(new ScheduleModel(new TimeSpan(12, 15, 0), new TimeSpan(12, 45, 0)));
            Vertex scheduleVertex5 = new ScheduleVertex(new ScheduleModel(new TimeSpan(12, 15, 0), new TimeSpan(13, 0, 0)));
            Vertex scheduleVertex6 = new ScheduleVertex(new ScheduleModel(new TimeSpan(12, 30, 0), new TimeSpan(14, 0, 0)));
            Vertex scheduleVertex7 = new ScheduleVertex(new ScheduleModel(new TimeSpan(13, 45, 0), new TimeSpan(14, 30, 0)));

            //scheduleVertex2.AddEdges(new List<Vertex>() { scheduleVertex3 });
            //scheduleVertex3.AddEdges(new List<Vertex>() { scheduleVertex2, scheduleVertex4, scheduleVertex5 });
            //scheduleVertex4.AddEdges(new List<Vertex>() { scheduleVertex3, scheduleVertex5, scheduleVertex6 });
            //scheduleVertex5.AddEdges(new List<Vertex>() { scheduleVertex3, scheduleVertex4, scheduleVertex6 });
            //scheduleVertex6.AddEdges(new List<Vertex>() { scheduleVertex4, scheduleVertex5, scheduleVertex7 });
            //scheduleVertex7.AddEdges(new List<Vertex>() { scheduleVertex6 });

            //new List<Vertex>() { scheduleVertex3 };
            //new List<Vertex>() { scheduleVertex2, scheduleVertex4, scheduleVertex5 };
            //new List<Vertex>() { scheduleVertex3, scheduleVertex5, scheduleVertex6 };
            //new List<Vertex>() { scheduleVertex3, scheduleVertex4, scheduleVertex6 };
            //new List<Vertex>() { scheduleVertex4, scheduleVertex5, scheduleVertex7 };
            //new List<Vertex>() { scheduleVertex6 };

            scheduleVertices = new List<Vertex>() {
                scheduleVertex1,
                scheduleVertex2,
                scheduleVertex3,
                scheduleVertex4,
                scheduleVertex5,
                scheduleVertex6,
                scheduleVertex7,
            };
        }

        [Test]
        public void should_correctly_count_vertices()
        {
            UndirectedGenericGraph<ScheduleModel> graph = new UndirectedGenericGraph<ScheduleModel>(scheduleVertices);
            Assert.AreEqual(7, graph.Size);
        }

        //[Test]
        //public void should_equal_create_and_count_edges()
        //{
        //    UndirectedGenericGraph<ScheduleModel> graph = new UndirectedGenericGraph<ScheduleModel>(scheduleVertices);
        //    graph.CreateEdgesUnoptimised();
        //    Assert.AreEqual(7, graph.NumberOfEdges);
        //}

        [Test]
        public void should_correctly_count_edges()
        {
            UndirectedGenericGraph<ScheduleModel> graph = new UndirectedGenericGraph<ScheduleModel>(scheduleVertices);
            graph.CreateEdgesUnoptimised();
            Assert.AreEqual(7, graph.NumberOfEdges);
        }
    }
}