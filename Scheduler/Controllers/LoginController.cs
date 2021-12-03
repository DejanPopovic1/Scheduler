using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Models;
using Scheduler.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Web;
using WebApi.Services;
using Scheduler.ViewModels;

namespace Scheduler.Controllers
{
    [ApiController]
    [Route("authenticate")]
    public class LoginController : ControllerBase
    {
        private readonly SchedulerEntities _dbContext;
        private IUserService _userService;

        public LoginController(SchedulerEntities dbContext, IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginViewModel s)
        {
            LoginResponse ret = new LoginResponse(s, "", 0);
            string hashedPassword = Cryptographic.CreateMD5Hash(s.password);
            bool isCredentialsValid = _dbContext.Users.Where(x => EF.Functions.Collate(x.UserName, "SQL_Latin1_General_CP1_CS_AS") == s.username && x.PasswordHash == hashedPassword).Select(x => x).ToList().Any();
            int userId = 0;
            if (isCredentialsValid)
            {
                var user = _dbContext.Users.Where(x => EF.Functions.Collate(x.UserName, "SQL_Latin1_General_CP1_CS_AS") == s.username && x.PasswordHash == hashedPassword).Select(x => new { id = x.Id }).ToList().First();
                userId = Int32.Parse(user.id);
                string anothertest = "hello";
                ret = _userService.Authenticate(s, userId);
                return Ok(ret);
            }
            else 
            {
                return BadRequest(new { message = "Username or password is incorrect"});
            }
        }
    }
}

