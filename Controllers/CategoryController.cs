using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ngWallet.DTOs.Category;
using ngWallet.Models.Database;
using wallet.Controllers;
using wallet.Models.Database;

namespace ngWallet.Controllers
{
    public class CategoryController : BaseController
    {
        DatabaseContext _db;

        public CategoryController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]CategoryDTO dto)
        {
            if(dto == null || dto.Name == null || dto.Color == null)
                return BadRequest();

            var entity = new Category();
            BuildEntity(entity, dto);
            if (entity.Id > 0)
                _db.Categorys.Update(entity);
            else
                await _db.Categorys.AddAsync(entity);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var _appUser = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
            var entities = _db.Categorys.Where(x => x.ApplicationUserId == _appUser.Id).Select(x => new CategoryDTO { Id = x.Id, Name = x.Name, Color = x.Color});

            return Json(entities);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove(int id)
        {
            var entity = _db.Categorys.FirstOrDefault(x => x.Id == id);
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

        private void BuildEntity(Category entity, CategoryDTO dto)
        {
            var _appUser = _db.ApplicationUsers.FirstOrDefault(x => x.FirebaseUserIdentity == _firebaseUserId);
            if (entity == null || dto == null)
                return;
            entity.Id = dto.Id??0;
            entity.ApplicationUserId = _appUser.Id;
            entity.Name = dto.Name;
            entity.Color = dto.Color;
        }
    }
}