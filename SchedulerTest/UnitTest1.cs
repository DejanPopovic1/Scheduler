using NUnit.Framework;
using Scheduler.Models;
using System.Collections.Generic;
using System;

namespace SchedulerTest
{
    public class Tests
    {
        List<Vertex> scheduleVertices;
        UndirectedGenericGraph<ScheduleModel> graph;

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

            scheduleVertices = new List<Vertex>() {
                scheduleVertex1,
                scheduleVertex2,
                scheduleVertex3,
                scheduleVertex4,
                scheduleVertex5,
                scheduleVertex6,
                scheduleVertex7,
            };

            graph = new UndirectedGenericGraph<ScheduleModel>(scheduleVertices);
        }

        [Test]
        public void should_correctly_count_vertices()
        {
            Assert.AreEqual(7, graph.Size);
        }

        [Test]
        public void should_correctly_count_edges()
        {
            graph.CreateEdgesUnoptimised();
            Assert.AreEqual(7, graph.NumberOfEdges);
        }

        [Test]
        public void should_correctly_colour_graph()
        {
            graph.CreateEdgesUnoptimised();
            graph.ColourGraph();
            Assert.AreEqual(graph.Vertices[0].Colour, 1);
            Assert.AreEqual(graph.Vertices[1].Colour, 1);
            Assert.AreEqual(graph.Vertices[2].Colour, 2);
            Assert.AreEqual(graph.Vertices[3].Colour, 1);
            Assert.AreEqual(graph.Vertices[4].Colour, 3);
            Assert.AreEqual(graph.Vertices[5].Colour, 2);
            Assert.AreEqual(graph.Vertices[6].Colour, 1);
        }
    }
}