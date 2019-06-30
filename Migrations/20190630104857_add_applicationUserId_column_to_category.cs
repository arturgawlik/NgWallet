using Microsoft.EntityFrameworkCore.Migrations;

namespace wallet.Migrations
{
    public partial class add_applicationUserId_column_to_category : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApplicationUserId",
                table: "Categorys",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Categorys");
        }
    }
}
