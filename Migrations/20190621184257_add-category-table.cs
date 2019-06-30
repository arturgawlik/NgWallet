using Microsoft.EntityFrameworkCore.Migrations;

namespace wallet.Migrations
{
    public partial class addcategorytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "WalletValueChanges",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "WalletValueChanges");
        }
    }
}
