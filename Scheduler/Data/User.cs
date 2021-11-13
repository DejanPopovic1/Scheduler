using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    [Table("User")]
    public class User
    {
        //[Key]
        public String Id { get; set; }
        public String UserName { get; set; }
        public String PasswordHash { get; set; }
        public virtual ICollection<Schedule> Schedule { get; set; }
    }
}
