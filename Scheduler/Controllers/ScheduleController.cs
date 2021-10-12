using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Models;
using Scheduler.Repository;

namespace Scheduler.Controllers
{
    [Route("schedule")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly SchedulerEntities _dbContext;
        private readonly ScheduleRepository _scheduleRepo;
        public ScheduleController(SchedulerEntities dbContext, ScheduleRepository scheduleRepository)
        {
            _dbContext = dbContext;
            _scheduleRepo = scheduleRepository;
        }

        [HttpPost("add")]
        public IActionResult add([FromBody] ScheduleViewModel s)
        {
            var test1 = 1;
            _scheduleRepo.Add(_dbContext, s);

            s.pickupDate.AddHours(2);
            //_dbContext.Schedules.Add(s);
            //var test = s.scheduleName;
            //var test2 = s.location;
            return Ok();
        }
    }
}
