using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopApiLesha.Migrations
{
    public partial class wEr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods");

            migrationBuilder.DropColumn(
                name: "WerhouseId",
                table: "Warehouse_Goods");

            migrationBuilder.AddColumn<int>(
                name: "WarhouseId",
                table: "Warehouse_Goods",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods",
                columns: new[] { "GoodsId", "WarhouseId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods");

            migrationBuilder.DropColumn(
                name: "WarhouseId",
                table: "Warehouse_Goods");

            migrationBuilder.AddColumn<int>(
                name: "WerhouseId",
                table: "Warehouse_Goods",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods",
                columns: new[] { "GoodsId", "WerhouseId" });
        }
    }
}
