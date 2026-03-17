using Microsoft.EntityFrameworkCore;
using portfolio_api.Data.Entities;

namespace portfolio_api.Data;

public class PortfolioContext : DbContext
{
    public PortfolioContext(DbContextOptions<PortfolioContext> options) : base(options) {}
    
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectView> ProjectViews => Set<ProjectView>(); // REQUIRED
    public DbSet<Education> Educations => Set<Education>();
    public DbSet<Certification> Certifications => Set<Certification>(); // REQUIRED
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<Assignment> Assignments => Set<Assignment>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            var idProperty = entity.FindProperty("Id");
            if (idProperty != null && idProperty.ClrType == typeof(Guid))
            {
                idProperty.SetDefaultValueSql("uuid_generate_v4()");
            }
        }
        
        modelBuilder.Entity<ContactMessage>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Message).HasMaxLength(255);
            entity.HasIndex(e => e.Email);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.Property(p => p.Title).HasMaxLength(200);
            // .NET 10 + Npgsql handles string[] -> text[] automatically, 
            // but being explicit prevents "scuffed" mapping.
            entity.Property(p => p.Tech).HasColumnType("text[]");
            entity.Property(p => p.Features).HasColumnType("text[]");

            // Define the 1:N Relationship for Views
            entity.HasMany(p => p.Views)
                  .WithOne()
                  .HasForeignKey(v => v.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.Property(e => e.Company).HasMaxLength(150).IsRequired();
            entity.Property(e => e.Position).HasMaxLength(150).IsRequired();
            // Important: Set Description to text to handle those long multiline assignments
            entity.Property(e => e.Description).HasColumnType("text");
            entity.HasMany(e => e.Assignments)
                .WithOne()
                .HasForeignKey(a => a.ExperienceId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.Property(a => a.Name).HasMaxLength(200).IsRequired();
            entity.Property(a => a.Dates).HasMaxLength(50);
            entity.Property(a => a.Task).HasColumnType("text");
        });

        modelBuilder.Entity<Certification>(entity =>
        {
            entity.Property(c => c.Name).HasMaxLength(200).IsRequired();
        });
    }
}