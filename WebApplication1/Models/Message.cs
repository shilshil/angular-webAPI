using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Message
    {
        public Message()
        {

        }   
        public int Id { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
        
        public User User { get; set; } = new User();

        public int ThemeId { get; set; }

        public Theme Theme { get; set; } = new Theme();
    }
}
