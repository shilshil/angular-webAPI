using WebApplication1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        
        private readonly ILogger<MessageController> _logger;
        private readonly Context context;

        public UserController(ILogger<MessageController> logger, Context context)
        {
            _logger = logger;
            this.context = context;
        }

        [HttpGet]
        public User Get(string name)
        {
            return context.Users.FirstOrDefault(x=> (x.Name==name));

        }

    }
}
