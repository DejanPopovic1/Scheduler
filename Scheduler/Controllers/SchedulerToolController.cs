using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Models;
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
            List<ScheduleModel>[] result = new List<ScheduleModel>[12];
            //DistanceMatrix that actually gets used
            List<Location> originLocations = _dbContext.CentralHubs.Select(x => new Location(x.Latitude, x.Longitude)).ToList();
            List<Location> bookingLocations = _dbContext.Schedules.Select(x => new Location { lat = x.Latitude, lon = x.Longitude }).ToList();
            DistanceMatrix dailyDistanceMatrix = DistanceMatrixCreator.GenerateDistanceMatrix(originLocations, bookingLocations, "AIzaSyDc6llaTb4Zxg0whfiuluFdH7RG8z16Gko");
            List<TimeSpan> bookingTravelTimes = dailyDistanceMatrix[1];
            //Split DB bookings into day matrix and iterate through it
            List<Schedule> allSchedules = _dbContext.Schedules.Select(x => x).ToList();
            SchedulesSplitter schedulesSplitter = new SchedulesSplitter(new DateTime(2021, 11, 28), allSchedules);
            List<int>[] schedulesForNextNDays = schedulesSplitter.ForecastedSchedulesIds;
            for (int i = 0; i < schedulesForNextNDays.Length; i++)
            {
                //Get List of booking Times
                List<DateTime> bookingStartDateTimes = _dbContext.Schedules.Where(x => schedulesForNextNDays[i].Contains(x.Id)).Select(x => x.PickupDateTime).ToList();
                List<TimeSpan> bookingStartTimes = new List<TimeSpan>();
                foreach (DateTime bookingStartDateTime in bookingStartDateTimes)
                {
                    TimeSpan bookingStartTime = bookingStartDateTime.TimeOfDay;
                    bookingStartTimes.Add(bookingStartTime);
                }
                //
                List<ScheduleModel> daysSchedules = new List<ScheduleModel>();
                foreach (var bookingStartTime in bookingStartTimes)
                {
                    var bookingEndTime = bookingStartTime + bookingTravelTimes[i];
                    daysSchedules.Add(new ScheduleModel(bookingStartTime, bookingEndTime));
                }
                //===========================

                List<Vertex> scheduleVertices = new List<Vertex>();
                foreach (ScheduleModel daySchedule in daysSchedules)
                {
                    scheduleVertices.Add(new ScheduleVertex(daySchedule));
                }

                UndirectedGenericGraph<ScheduleModel> graph = new UndirectedGenericGraph<ScheduleModel>(scheduleVertices);
                graph.CreateEdgesUnoptimised();
                graph.ColourGraph();
                var r = graph.ColouringNumber;
            }
                return Ok(schedulesForNextNDays);
            //SchedulerToolViewModel result = new SchedulerToolViewModel()
            //{
            //    NumberOfSchedulingUsers = 4,
            //    TotalKmTravelledForTheNextDay = 10000,
            //    TotalHoursTravelledForTheNextDay = 2100,
            //    GraphDataPoints = new List<DataPoint>()
            //    {
            //            new DataPoint(){
            //                Date = new DateTime(2022, 5, 5),
            //                NumberOfResources = 5,
            //            },
            //            new DataPoint(){
            //                Date = new DateTime(2022, 6, 1),
            //                NumberOfResources = 7,
            //            },
            //            new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 6,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 2,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 4,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 4,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 8,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 9,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 1,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 1,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 2,
            //            },
            //                new DataPoint(){
            //                Date = new DateTime(2022, 7, 25),
            //                NumberOfResources = 2,
            //            },
            //    },
            //    HubLocation = new Coordinates()
            //    {
            //        lat = 22.788,
            //        lon = 23.214
            //    }
            //};
            //return Ok(result);
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
}
