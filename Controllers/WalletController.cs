using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ngWallet.DTOs.WalletChange;
using wallet.DTOs;
using wallet.Models.Database;

namespace wallet.Controllers
{
    public class WalletController : BaseController
    {
        DatabaseContext _db;
        // ApplicationUser _appUser;
        public WalletController(DatabaseContext db)
    {
            _db = db;
            // _appUser = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]WalletDTO dto)
        {
            if(dto == null || dto.Name == null)
                return BadRequest();

            var entity = new Wallet();
            BuildEntity(entity, dto);
            await _db.Wallets.AddAsync(entity);
            await _db.SaveChangesAsync();
            return Json(null);
        }

        public IActionResult IsNameOccupied(string name)
        {
            var _appUser = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
            var entity = _db.Wallets.FirstOrDefault(x => x.ApplicationUserId == _appUser.Id && x.Name == name);

            return Json(entity != null);
        }

        public IActionResult GetAll()
        {
            var _appUser = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
            var entities = _db.Wallets.Where(x => x.ApplicationUserId == _appUser.Id).Select(x => new WalletDTO { Id = x.Id, Name = x.Name, Description = x.Description, FastAccess = x.FastAccess });

            return Json(entities);
        }

        private void BuildEntity(Wallet entity, WalletDTO dto)
        {
            var _appUser = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
            if (entity == null || dto == null)
                return;
            entity.Id = dto.Id??0;
            entity.ApplicationUserId = _appUser.Id;
            entity.Name = dto.Name;
            entity.Description = dto.Description;
            entity.FastAccess = dto.FastAccess;
        }
    }
}