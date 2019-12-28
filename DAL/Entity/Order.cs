using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Order
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public int GoodsId { get; set; }
        public Goods Goods { get; set; }
        public float Sum { get; set; }
        public int Amount { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime FinalDate { get; set; }
    }
}
