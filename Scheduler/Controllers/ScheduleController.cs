using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Models;
using Scheduler.Repository;
using System;

namespace Scheduler.Controllers
{
    [Route("schedule")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly SchedulerEntities _dbContext;
        private readonly ScheduleRepository _scheduleRepo;
        public ScheduleController(SchedulerEntities dbContext/*, ScheduleRepository scheduleRepository*/)
        {
            _dbContext = dbContext;
            //_scheduleRepo = scheduleRepository;
        }

        [HttpPost("add")]
        public IActionResult add([FromBody] ScheduleViewModel s)
        {
            Schedule ret = new Schedule()
            {
                //Id = 1,
                PickupDateTime = s.pickupDate,
                ScheduleName = s.scheduleName,
                Latitude = (float)s.location.lat,
                Longitude = (float)s.location.lon
            };
            _dbContext.Schedules.Add(ret);
            _dbContext.SaveChanges();
            //var test1 = 1;
            //_scheduleRepo.Add(_dbContext, s);

            //s.pickupDate.AddHours(2);
            ////_dbContext.Schedules.Add(s);
            ////var test = s.scheduleName;
            ////var test2 = s.location;
            return Ok();
        }
    }
}
