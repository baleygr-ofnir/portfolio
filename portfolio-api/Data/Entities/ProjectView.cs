namespace portfolio_api.Data.Entities;

public class ProjectView
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string Label { get; set; } = null!;
    public string Image { get; set; } = null!;
}