using Microsoft.EntityFrameworkCore.Migrations;

namespace wallet.Migrations
{
    public partial class specifyWalletValueChangeChangeValueType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "FastAccess",
                table: "Wallets",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FastAccess",
                table: "Wallets");
        }
    }
}
