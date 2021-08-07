using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyController : ControllerBase
    {
        [HttpGet]
        public String Get()
        {
            //MyObj mo = new MyObj();
            //mo.Summary1 = "yo mayne";
            //mo.Summary2 = "hey bru";
            //mo.Summary3 = "sup n'guy";

            return "Joe";
        }

        [HttpPost]
        public void Post(MyObj mo)
        {
            var test = mo;
            System.Environment.Exit(-1);
            return;
        }


    }
}
