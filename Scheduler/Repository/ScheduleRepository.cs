using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Repository
{
    public class ScheduleRepository
    {
        SchedulerEntities dbContext;
        public ScheduleRepository(SchedulerEntities dbContext) 
        {
            this.dbContext = dbContext;
        }

        public void Add(SchedulerEntities context, Models.Schedule s) 
        {
            //Models.Schedule ret = new Models.Schedule() {
            //    pickupDate = s.pickupDate;
            //    scheduleName = s.scheduleName;
            
            
            //}
            //context.Add(new Data.Schedule("test11", new DateTime(2000, 1, 1), "test2", 3.21, 3,44));
            context.Add(s);
        }

    }
}
