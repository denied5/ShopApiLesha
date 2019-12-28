using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopApiLesha.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientsDTO Client { get; set; }
        public int GoodsId { get; set; }
        public GoodsDTO Goods { get; set; }
        public float Sum { get; set; }
        public int Amount { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime FinalDate { get; set; }
        public IEnumerable<WarehouseDTO> Warehouses { get; set; }
    }
}
