using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using wallet.Models.Database;

namespace wallet.Controllers
{
    [Authorize(Policy = "UserId")]
    public class BaseController : Controller
    {
        protected string _firebaseUserId => User.Claims.First(c => c.Type.Equals("user_id")).Value;
        public BaseController()
        {
        }
    }
}