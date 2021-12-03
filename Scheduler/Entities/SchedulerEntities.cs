using Microsoft.EntityFrameworkCore;

namespace Scheduler.Entities
{
    public class SchedulerEntities : DbContext
    {
            public SchedulerEntities()
            { }

            public SchedulerEntities(DbContextOptions<SchedulerEntities> options)
                : base(options)
            { }

            public DbSet<User> Users { get; set; }
            public DbSet<Booking> Bookings { get; set; }
            public DbSet<CentralHub> CentralHubs { get; set; }
    }
}
