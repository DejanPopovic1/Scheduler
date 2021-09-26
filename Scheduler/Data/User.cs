using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class User
    {
        public String Id { get; set; }
        public String UserName { get; set; }
        public String PasswordHash { get; set; }
    }
}
