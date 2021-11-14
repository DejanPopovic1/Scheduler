using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Models;
using Scheduler.Repository;
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
            var test = this.User.Claims;
            var test2 = test.ToList().FirstOrDefault().Value;
            Schedule ret = new Schedule()
            {
                //Id = 1,
                PickupDateTime = s.pickupDate,
                ScheduleName = s.scheduleName,
                Latitude = s.location.lat,
                Longitude = s.location.lon
            };
            ret.FK_schedule_user = _dbContext.Users.Where(x => x.Id == "2").First();
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

        [HttpGet("getList")]
        public IActionResult getList()
        {
            var ret = _dbContext.Schedules.Select(x => new ScheduleViewModel(x)).AsQueryable().ToList();
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
            var singleRec = _dbContext.Schedules.FirstOrDefault(x => x.Id == i);
            _dbContext.Schedules.Remove(singleRec);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}