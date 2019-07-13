using Microsoft.EntityFrameworkCore.Migrations;

namespace wallet.Migrations
{
    public partial class Add_Default_Category_Walletv1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Wallets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Wallets_CategoryId",
                table: "Wallets",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Wallets_Categorys_CategoryId",
                table: "Wallets",
                column: "CategoryId",
                principalTable: "Categorys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wallets_Categorys_CategoryId",
                table: "Wallets");

            migrationBuilder.DropIndex(
                name: "IX_Wallets_CategoryId",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Wallets");
        }
    }
}
