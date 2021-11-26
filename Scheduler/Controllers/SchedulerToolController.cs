using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Models;
using System;
using System.Collections.Generic;

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
            return Ok();
        }
    }
}