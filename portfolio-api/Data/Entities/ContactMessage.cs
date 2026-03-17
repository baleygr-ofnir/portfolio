using System.ComponentModel.DataAnnotations;

namespace portfolio_api;

public class ContactMessage()
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    [EmailAddress] public string Email { get; set; } = null!;
    public string Message { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}