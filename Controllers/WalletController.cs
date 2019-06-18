using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ngWallet.DTOs.Response;
using wallet.DTOs;
using wallet.Models.Database;
using ngWallet.Extensions;
using System.Collections.Generic;
using System.Globalization;
using System;

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

        public IActionResult GetWithChanges(int id)
        {
            var wallet = _db.Wallets.FirstOrDefault(x => x.Id == id);
            var changes = _db.WalletValueChanges.Where(x => x.WalletId == id).ToList();

            var responseChanges = changes.OrderByDescending(x => x.Date).Select(x => new WalletChangeResponse {
                Id = x.Id,
                Value = x.ChangeValue,
                Date = x.Date.ToStringCustom(),
                Description = x.Description
            }).ToList();

            var responseWallet = new WalletResponse();
            responseWallet.Id = wallet.Id;
            responseWallet.Name = wallet.Name;
            responseWallet.Currency = "PLN"; // TODO
            responseWallet.CurrentState = changes.Sum(x => x.ChangeValue);
            responseWallet.WalletChanges = responseChanges;

            return Json(responseWallet);
        }

        public IActionResult PrimaryChart(int id)
        {
            var result = new List<PrimaryChartDataResponse>();
            var changes = _db.WalletValueChanges.Where(x => x.WalletId == id).ToList();
            var months = changes.GroupBy(x => new { x.Date.Year, x.Date.Month }).Select(x => x.Key);

            foreach (var date in months)
            {
                var tmp = new PrimaryChartDataResponse();
                tmp.Label = new DateTime(date.Year, date.Month, 1).ToString("MMMM yyyy");
                tmp.Data = new List<decimal>();
                
                for (int i = 1; i <= DateTime.DaysInMonth(date.Year, date.Month); i++)
                {
                    if (new DateTime(date.Year, date.Month, i, 0, 0, 0) > DateTime.Now) //zeby nie rysowalo wykresu na "przyszlosc"
                        break;
                    tmp.Data.Add(changes.Where(x => x.Date <= new DateTime(date.Year, date.Month, i, 23, 59, 59)).Sum(x => x.ChangeValue));
                }

                result.Add(tmp);
            }

            return Json(result);
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