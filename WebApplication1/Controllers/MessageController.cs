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
    [Route("api/messages")]
    public class MessageController : ControllerBase
    {
        
        private readonly ILogger<MessageController> _logger;
        private readonly Context context;

        public MessageController(ILogger<MessageController> logger, Context context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<Theme> Get()
        {
            return context.Themes.ToList();

        }

        [HttpPost]
        public Message SendMessage( Message message)
        {
            if (message == null)
            {
                throw new Exception("Пустое сообщение");
            }

            if (message.User == null)
            {
                throw new Exception("Нет данных пользователя");
            }
            var excistinguser = context.Users.FirstOrDefault(x => x.Email == message.User.Email && x.Phone == message.User.Phone);

            if (excistinguser == null)
            {
                context.Add(message.User);
                context.SaveChanges();

                message.UserId = message.User.Id;
            }
            else 
            {
                message.User = excistinguser;
                
            }

            if (message.Theme.Subject == null)
                message.Theme.Subject = "Техподдержка";
            var excistingTheme = context.Themes.FirstOrDefault(x => x.Subject == message.Theme.Subject);
            message.ThemeId = excistingTheme.Id;
            message.Theme = excistingTheme;

            context.Add(message);
            context.Entry(message.Theme).State = EntityState.Unchanged;
            context.SaveChanges();

            return message;
        }
    }
}
