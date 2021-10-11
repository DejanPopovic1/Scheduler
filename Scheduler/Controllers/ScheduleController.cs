using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Models;

namespace Scheduler.Controllers
{
    [Route("schedule")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly SchedulerEntities _dbContext;

        public ScheduleController(SchedulerEntities dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("add")]
        public IActionResult add([FromBody] Schedule s)
        {
            s.pickupDate.AddHours(2);
            var test = s.scheduleName;
            var test2 = s.location;
            return Ok();
        }
    }
}
