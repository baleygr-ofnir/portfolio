namespace portfolio_api.Data.Entities;

public class Experience
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = null!;
    public string Company { get; set; } = null!;
    public string Position { get; set; } = null!;
    public string TimeFrame { get; set; } = null!;
    public string? Description { get; set; }
    public List<Assignment> Assignments { get; set; } = [];
}