﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ProdName { get; set; }
    }
}
