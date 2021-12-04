using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Entities;
using Scheduler.Models;
using Scheduler.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;

namespace Scheduler.Controllers
{
    [Authorize]
    [Route("schedulerTool")]
    [ApiController]
    public class SchedulerToolController : ControllerBase
    {
        private readonly SchedulerEntities _dbContext;
        public SchedulerToolController(SchedulerEntities dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("getInfo")]
        public IActionResult GetInfo()
        {
            var allBookings = _dbContext.Bookings.ToList();
            SchedulerToolViewModel result = new SchedulerToolViewModel();
            List<Vertex> bookingAssignmentsFirstDay = new List<Vertex>();
            List<int> requiredResourcesPerDay = new List<int>();
            List<Location> originLocations = _dbContext.CentralHubs.Select(x => new Location(x.Latitude, x.Longitude)).ToList();
            List<Location> bookingLocations = _dbContext.Bookings.Select(x => new Location { lat = x.Latitude, lon = x.Longitude }).ToList();
            DistanceMatrix distanceMatrix = DistanceMatrixCreator.GenerateDistanceMatrix(originLocations, bookingLocations, ApiKeyHelper.GetApiKey());
            List<TimeSpan> bookingTravelTimes = distanceMatrix[1];
            bookingTravelTimes = bookingTravelTimes.Select(x => x * 2).ToList();
            List<BookingDateAndDuration> bookingDateAndDuration = new List<BookingDateAndDuration>();
            int i = 0;
            foreach (var booking in allBookings)
            {
                bookingDateAndDuration.Add(new BookingDateAndDuration(booking.PickupDateTime, bookingTravelTimes[i]));
                i++;
            }
            //================================================
            var all = SchedulesSplitter.GetSplitSchedules(DateTime.Now, bookingDateAndDuration);
            foreach (var splitBookingDatesAndDurations in all)
            {
                List<Vertex> dailyVertices = new List<Vertex>();
                foreach (var splitBookingDateAndDuration in splitBookingDatesAndDurations)
                {
                    ScheduleModel sm = new ScheduleModel(splitBookingDateAndDuration.BookingDate.TimeOfDay, splitBookingDateAndDuration.BookingDate.TimeOfDay + splitBookingDateAndDuration.BookingDuration);
                    ScheduleVertex sv = new ScheduleVertex(sm);
                    dailyVertices.Add(sv);
                }
                UndirectedGenericGraph<ScheduleModel> dailyGraph = new UndirectedGenericGraph<ScheduleModel>(dailyVertices);
                dailyGraph.CreateEdgesUnoptimised();
                dailyGraph.ColourGraph();
                result.RequiredResourcesPerDay.Add(dailyGraph.ColouringNumber);
            }
            //================
            result.NumberOfSchedulingUsers = _dbContext.Users.Count();
            //=====================================================
            //var numberOfMinutesTravelInFirstDay = BookingHelper.HoursOfTravelInADay(_dbContext.Bookings.ToList(), bookingTravelTimes);
            var numberOfMinutesTravelInFirstDay = bookingDateAndDuration.Sum(x => x.BookingDuration.Ticks);
            numberOfMinutesTravelInFirstDay = numberOfMinutesTravelInFirstDay / 10000000 / 60 / 60;


            result.TotalMinutesTravelledForTheNextDay = (int)numberOfMinutesTravelInFirstDay;
            //================================================================
            List<BookingDateAndDuration> todayBookingDatesAndDurations = bookingDateAndDuration.Where(x => x.BookingDate.Date == DateTime.Now.Date).ToList();
            List<Vertex> todaysVertices = new List<Vertex>();
            foreach (var bookingDateDuration in todayBookingDatesAndDurations)
            {
                ScheduleModel sm = new ScheduleModel(bookingDateDuration.BookingDate.TimeOfDay, bookingDateDuration.BookingDate.TimeOfDay + bookingDateDuration.BookingDuration);
                ScheduleVertex sv = new ScheduleVertex(sm);
                todaysVertices.Add(sv);
            }
            UndirectedGenericGraph<ScheduleModel> graph = new UndirectedGenericGraph<ScheduleModel>(todaysVertices);
            graph.CreateEdgesUnoptimised();
            graph.ColourGraph();
            var bookingAssignments = graph.Vertices.Cast<ScheduleVertex>().Select(x => {
                    return new BookingAssignment
                    {
                        ResourceNumber = x.Colour,
                        StartTime = x.scheduleModelValue.StartTime.ToString(),
                        EndTime = x.scheduleModelValue.EndTime.ToString(),
                    };
                }
            ).ToList();
            result.BookingAssignments = bookingAssignments;
            return Ok(result);
        }

        [HttpPost("ChangeCentralLocation")]
        public IActionResult ChangeCentralLocation([FromBody] Location passedLocation)
        {
            var userId = User.Claims.ToList().ElementAt(0).Value;
            CentralHub itemToUpdate = _dbContext.CentralHubs.SingleOrDefault(x => x.UserID == Int32.Parse(userId));
            if (itemToUpdate != null)
            {
                itemToUpdate.UserID = Int32.Parse(userId);
                itemToUpdate.Latitude = passedLocation.lat;
                itemToUpdate.Longitude = passedLocation.lon;
            }
            else
            {
                CentralHub newlyAddedCentralHub = new CentralHub()
                {
                    UserID = Int32.Parse(userId),
                    Latitude = 22.211,
                    Longitude = 23.119
                };
                _dbContext.Add(newlyAddedCentralHub);
            }
            _dbContext.SaveChanges();
            return Ok();
        }
    }

    public class ScheduleIndexQueryResult 
    {
        public Booking Schedule { get; set; }
        public int Index { get; set; }
    }
}
