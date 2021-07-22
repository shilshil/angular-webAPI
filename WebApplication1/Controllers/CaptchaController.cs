using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Drawing.Imaging;
using NCaptcha;
using System.IO;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/captcha")]
    public class CaptchaController : ControllerBase
    {
        public string imagePath = "E:/test/captcha.png";

        Captcha captcha;
        static string key;
        public static string ImageToBase64(string path)
        {
            using (Image image = Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();

                    string base64String = Convert.ToBase64String(imageBytes);
                    return base64String;
                }
            }

        }


        [HttpPost]
        public async Task<ActionResult<Key>> Post(Key vkey)
        {
            if (vkey == null)
                return BadRequest();

            if (vkey.key == key)
                return Ok();
            else
                return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Captcha>>> Get()
        {
            captcha = new Captcha(new
            {
                width = 100,
                height = 35, 
                foreground = Color.FromArgb(194, 0, 181),
                background = Color.FromArgb(247, 247, 247),
                keylength = 5 
            });
            captcha.Image.Save(imagePath, ImageFormat.Png);
            key = captcha.Key;
            string image = ImageToBase64(imagePath);
            return Ok(image);
        }
    }
}
