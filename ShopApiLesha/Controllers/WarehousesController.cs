using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Entity;
using AutoMapper;
using ShopApiLesha.DTO;
using Newtonsoft.Json;

namespace ShopApiLesha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehousesController : ControllerBase
    {
        private readonly FabricContext _context;
        private readonly IMapper _mapper;

        public WarehousesController(FabricContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Warehouses
        [HttpGet]
        public async Task<IActionResult> GetWarehouses()
        {
            var j = _context.Warehouses.Include(x => x.Goods).ThenInclude(y => y.Goods).AsEnumerable();
            var settings = new JsonSerializerSettings
            {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    Formatting = Formatting.Indented
            };

            string json = JsonConvert.SerializeObject(j, settings);


            return  Ok(json);
        }

        // GET: api/Warehouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Warehouse>> GetWarehouse(int id)
        {
            var warehouse = await _context.Warehouses.FindAsync(id);

            if (warehouse == null)
            {
                return NotFound();
            }

            return warehouse;
        }

        // PUT: api/Warehouses/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarehouse(int id, Warehouse warehouse)
        {
            if (id != warehouse.Id)
            {
                return BadRequest();
            }

            _context.Entry(warehouse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Warehouses
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Warehouse>> PostWarehouse(WarehouseDTO warehouse)
        {
            _context.Warehouses.Add(_mapper.Map<Warehouse>(warehouse));
            var i = await _context.SaveChangesAsync();
            if (i > 0)
            {
                return Ok();
            }
            return BadRequest();
        }

        // DELETE: api/Warehouses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Warehouse>> DeleteWarehouse(int id)
        {
            var warehouse = await _context.Warehouses.FindAsync(id);
            if (warehouse == null)
            {
                return NotFound();
            }

            _context.Warehouses.Remove(warehouse);
            await _context.SaveChangesAsync();

            return warehouse;
        }

        private bool WarehouseExists(int id)
        {
            return _context.Warehouses.Any(e => e.Id == id);
        }
    }
}
