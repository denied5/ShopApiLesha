using DAL.Entity;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class FabricContext : DbContext
    {
        public FabricContext(DbContextOptions<FabricContext> options) : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Goods> Goods { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Warehouse_Goods> Warehouse_Goods { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Warehouse_Goods>()
                .HasKey(k => new { k.GoodsId, k.WarhouseId });

            modelBuilder.Entity<Warehouse_Goods>()
                .HasOne(w => w.Warehouse)
                .WithMany(w => w.Goods)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Warehouse_Goods>()
                .HasOne(g => g.Goods)
                .WithMany(g => g.Warehouses)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
