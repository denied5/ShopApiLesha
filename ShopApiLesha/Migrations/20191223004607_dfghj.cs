using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopApiLesha.Migrations
{
    public partial class dfghj : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods");

            migrationBuilder.DropColumn(
                name: "WarhouseId",
                table: "Warehouse_Goods");

            migrationBuilder.AlterColumn<int>(
                name: "WarehouseId",
                table: "Warehouse_Goods",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods",
                columns: new[] { "GoodsId", "WarehouseId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods");

            migrationBuilder.AlterColumn<int>(
                name: "WarehouseId",
                table: "Warehouse_Goods",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "WarhouseId",
                table: "Warehouse_Goods",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warehouse_Goods",
                table: "Warehouse_Goods",
                columns: new[] { "GoodsId", "WarhouseId" });
        }
    }
}
