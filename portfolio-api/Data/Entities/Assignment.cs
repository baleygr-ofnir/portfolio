namespace portfolio_api.Data.Entities;

public class Assignment
{
    public Guid Id { get; set; }
    public Guid ExperienceId { get; set; }
    public string Name { get; set; } = null!;
    public string Dates { get; set; } = null!;
    public string Task { get; set; } = null!;
}