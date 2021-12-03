using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scheduler.Entities
{
    [Table("User")]
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public virtual ICollection<Booking> Schedule { get; set; }
    }
}
