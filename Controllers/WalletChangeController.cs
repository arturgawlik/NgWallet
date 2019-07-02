using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ngWallet.DTOs.WalletChange;
using wallet.DTOs;
using wallet.Models.Database;

namespace wallet.Controllers
{
    public class WalletChangeController : BaseController
    {
        DatabaseContext _db;
        // ApplicationUser _appUser;
        public WalletChangeController(DatabaseContext db)
        {
            _db = db;
            // _appUser = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
        }

        // [HttpPost]
        // public async Task<IActionResult> Save([FromBody]WalletDTO dto)
        // {
        //     if(dto == null || dto.Name == null)
        //         return BadRequest();

        //     var entity = new Wallet();
        //     BuildEntity(entity, dto);
        //     await _db.Wallets.AddAsync(entity);
        //     await _db.SaveChangesAsync();
        //     return Json(null);
        // }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]WalletChangeDTO dto)
        {
            if (dto != null && ModelState.IsValid)
            {
                var entity = new WalletValueChange();
                BuildEntity(entity, dto);
                await _db.WalletValueChanges.AddAsync(entity);
                await _db.SaveChangesAsync();

                return Ok();
            }
            else
                return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Remove(int id)
        {
            var entity = _db.WalletValueChanges.FirstOrDefault(x => x.Id == id);
            if (entity != null)
            {
                _db.Remove(entity);
                await _db.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        private void BuildEntity(WalletValueChange entity, WalletChangeDTO dto)
        {
            if (entity == null || dto == null)
                return;
            
            switch(dto.OperationType)
            {
                case OperationType.outcome:
                    entity.ChangeValue = -dto.Value;
                    break;
                case OperationType.income:
                    entity.ChangeValue = dto.Value;
                    break;
            }
            entity.Date = DateTime.Now;
            entity.WalletId = dto.WalletId;
            entity.Description = dto.Description;
            entity.CategoryId = dto.CategoryId;
            entity.CategoryId = dto.CategoryId;
        }
    }
}