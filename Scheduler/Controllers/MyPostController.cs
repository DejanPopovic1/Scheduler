using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Scheduler.Models;
using System.Collections;

namespace Scheduler.Controllers
{
    [ApiController]
    [Route("schedule")]
    public class MyPostController : ControllerBase
    {
        [HttpPost("getlist")]
        public int GetList([FromBody] frontEndData s)
        {
            //System.Environment.Exit(-1);
            int test = 7;
            return 5;
        }

        [HttpPost("postSchedule")]
        public int postSchedule([FromBody] Schedule s)
        {
            System.Environment.Exit(-1);
            int test = 7;
            return 5;
        }
    }

    public class frontEndData
    {
        public string myvar { get; set; }
        public string myvartwo { get; set; }
    }
}
