using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Entity;

namespace ShopApiLesha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Warehouse_GoodsController : ControllerBase
    {
        private readonly FabricContext _context;

        public Warehouse_GoodsController(FabricContext context)
        {
            _context = context;
        }

        // GET: api/Warehouse_Goods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Warehouse_Goods>>> GetWarehouse_Goods()
        {
            return await _context.Warehouse_Goods.ToListAsync();
        }

        // GET: api/Warehouse_Goods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Warehouse_Goods>> GetWarehouse_Goods(int id)
        {
            var warehouse_Goods = await _context.Warehouse_Goods.FindAsync(id);

            if (warehouse_Goods == null)
            {
                return NotFound();
            }

            return warehouse_Goods;
        }

        // POST: api/Warehouse_Goods
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{warehouseId}/goods/{goodsId}")]
        public async Task<ActionResult<Warehouse_Goods>> PostWarehouse_Goods(int warehouseId, int goodsId)
        {
            Warehouse_Goods wg = new Warehouse_Goods() { GoodsId = goodsId, WarhouseId = warehouseId };
            _context.Warehouse_Goods.Add(wg);

            var i = await _context.SaveChangesAsync();
            if (i > 0)
            {
                return Ok();
            }
            return BadRequest();
        }

        // DELETE: api/Warehouse_Goods/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Warehouse_Goods>> DeleteWarehouse_Goods(int id)
        {
            var warehouse_Goods = await _context.Warehouse_Goods.FindAsync(id);
            if (warehouse_Goods == null)
            {
                return NotFound();
            }

            _context.Warehouse_Goods.Remove(warehouse_Goods);
            await _context.SaveChangesAsync();

            return warehouse_Goods;
        }

        private bool Warehouse_GoodsExists(int id)
        {
            return _context.Warehouse_Goods.Any(e => e.GoodsId == id);
        }
    }
}
