using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class SchedulerEntities : DbContext
    {
            public SchedulerEntities()
            { }

            public SchedulerEntities(DbContextOptions<SchedulerEntities> options)
                : base(options)
            { }

            public DbSet<User> Users { get; set; }
            public DbSet<Schedule> Schedules { get; set; } 
        
    }
}
