namespace portfolio_api.Data.Entities;

public class Skill
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Category { get; set; } = null!;
}