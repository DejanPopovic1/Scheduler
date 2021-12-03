using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Entities;
using Scheduler.Models;
using Scheduler.Repository;
using Scheduler.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Controllers
{
    [Authorize]
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
        public IActionResult add([FromBody] ScheduleViewModel s)
        {
            var userId = User.Claims.ToList().ElementAt(0).Value;
            Booking ret = new Booking()
            {
                PickupDateTime = s.pickupDate,
                ScheduleName = s.scheduleName,
                Latitude = s.location.lat,
                Longitude = s.location.lon
            };
            ret.FK_schedule_user = _dbContext.Users.Where(x => x.Id == userId).First();
            _dbContext.Bookings.Add(ret);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet("getList")]
        public IActionResult getList()
        {
            //Refactor out the userID into controller base and then inherit it. This will avoid doing this following step for all controllers and all actions
            var userId = User.Claims.ToList().ElementAt(0).Value;
            List<ScheduleViewModel> ret;
            if (userId == "4")
            {
                ret = _dbContext.Bookings.Select(x => new ScheduleViewModel(x)).AsQueryable().ToList();
            }
            else
            {
                ret = _dbContext.Bookings.Where(x => (x.FK_schedule_user.Id == userId)).Select(x => new ScheduleViewModel(x)).AsQueryable().ToList();
            }
            return Ok(ret);
        }

        [HttpPost("deleteItem")]
        public IActionResult deleteItem([FromBody] int i)
        {
            var singleRec = _dbContext.Bookings.FirstOrDefault(x => x.Id == i);
            _dbContext.Bookings.Remove(singleRec);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}