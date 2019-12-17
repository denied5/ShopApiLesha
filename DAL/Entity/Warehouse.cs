using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Warehouse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }

        public IEnumerable<Warehouse_Goods> Goods { get; set; }
    }
}
