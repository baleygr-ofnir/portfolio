using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace portfolio_api.Migrations
{
    /// <inheritdoc />
    public partial class AnotherFixSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Educations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Educations",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Educations");
        }
    }
}
