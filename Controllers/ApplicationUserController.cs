using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using wallet.Models.Database;

namespace wallet.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationUserController : BaseController
    {
        DatabaseContext _db;
        public ApplicationUserController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddApplicationUserIfNotExists()
        {
            var entity = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
            if (entity is null)
            {
                await _db.ApplicationUsers.AddAsync(new ApplicationUser { FirebaseUserIdentity = _firebaseUserId });
                await _db.SaveChangesAsync();
            }

            return Json(null);
        }
    }
}