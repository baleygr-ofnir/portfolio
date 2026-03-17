namespace portfolio_api.Data.Entities;

public class Education
{
    public Guid Id { get; set; }
    public string Institution { get; set; } = null!;
    public string Degree { get; set; } = null!;
    public string? TimeFrame { get; set; }
    public string? Status { get; set; }
    public string? Description { get; set; }
}