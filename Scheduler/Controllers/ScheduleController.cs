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
        private readonly ScheduleRepository _scheduleRepo;
        public ScheduleController(SchedulerEntities dbContext/*, ScheduleRepository scheduleRepository*/)
        {
            _dbContext = dbContext;
            //_scheduleRepo = scheduleRepository;
        }

        [HttpPost("add")]
        public IActionResult add([FromBody] ScheduleViewModel s/*, [FromHeader] string authorization*/)
        {
            //ClaimsPrincipal currentUser = this.User;
            //var currentUserName = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            //ApplicationUser user = await _userManager.FindByNameAsync(currentUserName);

            //int.Parse(this.User.Claims.First(i => i.Type == "id").Value);
            //var test = this.User.Claims;
            //var test2 = test.ToList().FirstOrDefault().Value;
            var userId = User.Claims.ToList().ElementAt(0).Value;
            Booking ret = new Booking()
            {
                //Id = 1,
                PickupDateTime = s.pickupDate,
                ScheduleName = s.scheduleName,
                Latitude = s.location.lat,
                Longitude = s.location.lon
            };
            ret.FK_schedule_user = _dbContext.Users.Where(x => x.Id == userId).First();
            _dbContext.Bookings.Add(ret);
            _dbContext.SaveChanges();
            //var test1 = 1;
            //_scheduleRepo.Add(_dbContext, s);

            //s.pickupDate.AddHours(2);
            ////_dbContext.Schedules.Add(s);
            ////var test = s.scheduleName;
            ////var test2 = s.location;
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

            //ScheduleViewModel ret1 = new ScheduleViewModel()
            //{
            //    pickupDate = new DateTime(2000, 1, 1),
            //    scheduleName = "Testing 1 2 3",
            //    location = new Location()
            //    {
            //        lat = 100,
            //        lon = 200
            //    }
            //};
            //ScheduleViewModel ret2 = new ScheduleViewModel()
            //{
            //    pickupDate = new DateTime(2000, 1, 1),
            //    scheduleName = "Testing 1 2 3",
            //    location = new Location()
            //    {
            //        lat = 100,
            //        lon = 200
            //    }
            //};
            //ScheduleViewModel ret3 = new ScheduleViewModel()
            //{
            //    pickupDate = new DateTime(2000, 1, 1),
            //    scheduleName = "Testing 1 2 3",
            //    location = new Location()
            //    {
            //        lat = 100,
            //        lon = 200
            //    }
            //};
            //List<ScheduleViewModel> ret = new List<ScheduleViewModel>();
            //ret.Add(ret1);
            //ret.Add(ret2);
            //ret.Add(ret3);

            //========================================================
            //TestViewModel test = new TestViewModel() { Param = "hello" };
            //List<TestViewModel> ret = new List<TestViewModel>();
            //ret.Add(test);
            //ret.Add(test);

            //return Ok(ret);
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