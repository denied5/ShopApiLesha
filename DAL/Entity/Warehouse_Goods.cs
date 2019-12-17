using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Warehouse_Goods
    {
        public int WarhouseId { get; set; }
        public Warehouse Warehouse { get; set; }
        public int GoodsId { get; set; }
        public Goods Goods { get; set; }
    }
}
