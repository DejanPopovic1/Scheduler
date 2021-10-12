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
        public ScheduleController(SchedulerEntities dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("add")]
        public IActionResult add([FromBody] Models.Schedule s)
        {
            s.pickupDate.AddHours(2);
            //_dbContext.Schedules.Add(s);
            //var test = s.scheduleName;
            //var test2 = s.location;
            return Ok();
        }
    }
}
