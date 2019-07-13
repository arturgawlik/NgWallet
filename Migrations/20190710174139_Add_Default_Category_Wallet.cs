using Microsoft.EntityFrameworkCore.Migrations;

namespace wallet.Migrations
{
    public partial class Add_Default_Category_Wallet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DefaultCategoryId",
                table: "Wallets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultCategoryId",
                table: "Wallets");
        }
    }
}
