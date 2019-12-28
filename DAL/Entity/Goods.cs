using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Goods
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public DateTime OrderDate { get; set; }
        public IEnumerable<Warehouse_Goods> Warehouses { get; set; }
    }
}
