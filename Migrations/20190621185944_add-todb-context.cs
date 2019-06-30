using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace wallet.Migrations
{
    public partial class addtodbcontext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categorys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Color = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorys", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WalletValueChanges_CategoryId",
                table: "WalletValueChanges",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_WalletValueChanges_Categorys_CategoryId",
                table: "WalletValueChanges",
                column: "CategoryId",
                principalTable: "Categorys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WalletValueChanges_Categorys_CategoryId",
                table: "WalletValueChanges");

            migrationBuilder.DropTable(
                name: "Categorys");

            migrationBuilder.DropIndex(
                name: "IX_WalletValueChanges_CategoryId",
                table: "WalletValueChanges");
        }
    }
}
