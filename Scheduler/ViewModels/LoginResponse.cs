using Scheduler.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//Properties should be upper case
namespace Scheduler.ViewModels
{
    public class LoginResponse
    {
        public string username { get; set; }
        public string Token { get; set; }
        public string Id { get; set; }

        public LoginResponse(LoginViewModel s, string token, int i)
        {
            Id = i.ToString();
            username = s.username;
            Token = token;
        }
    }
}