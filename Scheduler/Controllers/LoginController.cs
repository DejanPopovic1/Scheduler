﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Models;
using Scheduler.Data;

namespace Scheduler.Controllers
{
    [ApiController]
    [Route("authenticate")]
    public class LoginController : ControllerBase
    {
        [HttpPost("login")]
        public int Login([FromBody] Example s)
        {
            //System.Environment.Exit(-1);
            int test = 7;
            return 5;
        }

        [HttpPost("postSchedule")]
        public int postSchedule([FromBody] IEnumerable<Schedule> s)
        {
            //System.Environment.Exit(-1);
            int test = 7;
            return 5;
        }
    }
}

