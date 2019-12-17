using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopApiLesha.DTO
{
    public class OrderDTO
    {
        public int ClientId { get; set; }
        public int GoodsId { get; set; }
        public float Sum { get; set; }
        public DateTime FinalDate { get; set; }
    }
}
