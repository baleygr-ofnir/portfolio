namespace portfolio_api.Data.Entities;

public class Project
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string[] Tech { get; set; } = [];
    public string? Github { get; set; }
    public string? LiveUrl { get; set; }
    public string[] Features { get; set; } = [];
    public List<ProjectView> Views { get; set; } = [];
}