namespace portfolio_api.Data.Entities;

public class Certification
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Issued { get; set; } = null!;
}