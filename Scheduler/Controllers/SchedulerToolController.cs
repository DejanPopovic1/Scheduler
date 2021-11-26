using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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
            SchedulerToolViewModel result = new SchedulerToolViewModel()
            {
                NumberOfSchedulingUsers = 4,
                TotalKmTravelledForTheNextDay = 10000,
                TotalHoursTravelledForTheNextDay = 2100,
                GraphDataPoints = new DataPoints() {
                    DataPointsList = new List<DataPoint>() {
                        new DataPoint(){
                            Date = new DateTime(2022, 5, 5),
                            NumberOfResources = 5,
                        },
                        new DataPoint(){
                            Date = new DateTime(2022, 6, 1),
                            NumberOfResources = 5,
                        },
                        new DataPoint(){
                            Date = new DateTime(2022, 7, 25),
                            NumberOfResources = 5,
                        },
                    }
                },
                HubLocation = new Coordinates() { 
                    lat = 22.788,
                    lon = 23.214
                }
            };
            return Ok();
        }

        [HttpPost("setAndChangeCentralLocation")]
        public IActionResult ChangeCentralLocation([FromBody] Location location)
        {
            location.lat = 22.244;
            location.lon = 19.344;
            var userId = User.Claims.ToList().ElementAt(0).Value;
            CentralHub itemToUpdate = _dbContext.CentralHubs.SingleOrDefault(x => x.UserID == Int32.Parse(userId));
            if (itemToUpdate != null)
            {
                itemToUpdate.UserID = Int32.Parse(userId);
                itemToUpdate.Latitude = location.lat;
                itemToUpdate.Longitude = location.lon;
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
