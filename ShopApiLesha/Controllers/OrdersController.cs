using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Entity;
using ShopApiLesha.DTO;
using AutoMapper;

namespace ShopApiLesha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly FabricContext _context;
        private readonly IMapper _mapper;

        public OrdersController(FabricContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
        {
            var ordersFromDTO =  _context.Orders.Include(x => x.Client).Include(x => x.Goods).ToList();
            var werhoses = _context.Warehouses.Include(x => x.Goods).ThenInclude(x => x.Goods).ToList();

            var orders = _mapper.Map<IEnumerable<OrderDTO>>(ordersFromDTO).ToList();

            for (int i = 0; i < orders.Count(); i++)
            {
                orders[i].Warehouses =
                    _mapper.Map<IEnumerable<WarehouseDTO>>(werhoses.Where(w => w.Goods.Select(g => g.Goods).Contains(ordersFromDTO[i].Goods)));
                    
            }

            return orders;
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}/{warehouseId}")]
        public async Task<IActionResult> PutOrder(int id, int warehouseId)
        {
            var order = await _context.Orders.Include(x => x.Goods).FirstOrDefaultAsync(x => x.Id == id);
            if (order == null)
            {
                return BadRequest();
            }

            
            var warehouseGoods = await _context.Warehouse_Goods.FirstOrDefaultAsync(x => x.GoodsId == order.GoodsId && x.WarehouseId == warehouseId);
            if (warehouseGoods.Quatity < order.Amount)
            {
                return BadRequest("Na sklade stol'ko netu");
            }
            warehouseGoods.Quatity = warehouseGoods.Quatity - order.Amount;
            order.FinalDate = DateTime.Now;
            if (await _context.SaveChangesAsync() > 0)
            {
                return NoContent();
            }
            return BadRequest();
        }

        // POST: api/Orders
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDTO order)
        {
            order.OrderDate = DateTime.Now;
            _context.Orders.Add(_mapper.Map<Order>(order));
            var i = await _context.SaveChangesAsync();

            if (i > 0)
            {
                return Ok();
            }
            return BadRequest();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
