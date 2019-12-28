using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopApiLesha.Migrations
{
    public partial class kjhc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quatity",
                table: "Warehouse_Goods",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quatity",
                table: "Warehouse_Goods");
        }
    }
}
