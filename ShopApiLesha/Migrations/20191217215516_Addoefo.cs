using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopApiLesha.Migrations
{
    public partial class Addoefo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinalDate",
                table: "Orders");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Clients",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ProdName",
                table: "Clients",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "ProdName",
                table: "Clients");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinalDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
