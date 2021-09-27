﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Models;
using Scheduler.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Web;

namespace Scheduler.Controllers
{
    [ApiController]
    [Route("authenticate")]
    public class LoginController : ControllerBase
    {
        private readonly SchedulerEntities _dbContext;

        public LoginController(SchedulerEntities dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public int Login([FromBody] Example s)
        {
            //System.Web.HttpContext.Current.Session["name"] = "Any Name";
            //HttpContext context = HttpContext.Current.Session["ShoppingCart"];
            string hashedPassword = Cryptographic.CreateMD5Hash(s.password);
            bool isCredentialsValid = _dbContext.Users.Where(x => EF.Functions.Collate(x.UserName, "SQL_Latin1_General_CP1_CS_AS") == s.username && x.PasswordHash == hashedPassword).Select(x => x).ToList().Any();
            if (isCredentialsValid) 
            {
                System.Environment.Exit(-1);
            }


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

