using Microsoft.EntityFrameworkCore.Migrations;

namespace wallet.Migrations
{
    public partial class Wallet_Change_Add_Column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "WalletValueChanges",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "WalletValueChanges");
        }
    }
}
