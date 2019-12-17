using AutoMapper;
using DAL.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopApiLesha.DTO
{
    public class AutoMapperProfiler : Profile
    {
        public AutoMapperProfiler()
        {
            CreateMap<ClientsDTO, Client>().ReverseMap();
            CreateMap<GoodsDTO, Goods>().ReverseMap();
            CreateMap<OrderDTO, Order>().ReverseMap();
            CreateMap<WarehouseDTO, Warehouse>().ReverseMap();
            CreateMap<Warehouse_GoodsDTO, Warehouse_Goods>().ReverseMap();
        }
    }
}
