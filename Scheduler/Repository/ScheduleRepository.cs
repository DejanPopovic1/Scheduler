using Scheduler.Entities;
using Scheduler.Models;
using Scheduler.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Repository
{
    public class ScheduleRepository
    {
        private readonly SchedulerEntities _dbContext;
        public ScheduleRepository(SchedulerEntities dbContext) 
        {
            _dbContext = dbContext;
        }

        public void Add(SchedulerEntities context, ScheduleViewModel s) 
        {
            Booking ret = new Booking()
            {
                Id = 1,
                PickupDateTime = new DateTime(2000, 1, 1),
                ScheduleName = "Hello",
                Latitude = 2.456F,
                Longitude = 74.78F
            };
            //context.Add(new Data.Schedule("test11", new DateTime(2000, 1, 1), "test2", 3.21, 3,44));
            context.Bookings.Add(ret);
        }
    }
}
