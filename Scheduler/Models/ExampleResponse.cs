using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//Properties should be upper case
namespace Scheduler.Models
{
    public class ExampleResponse
    {
        public string username { get; set; }
        public string Token { get; set; }
        public string Id { get; set; }

        public ExampleResponse(Example s, string token, int i)
        {
            Id = i.ToString();
            username = s.username;
            Token = token;
        }
    }
}