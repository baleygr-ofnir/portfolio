using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using portfolio_api.Contracts;
using portfolio_api.Data;

namespace portfolio_api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found");

        builder.Services.AddDbContext<PortfolioContext>(options => options.UseNpgsql(connectionString));
        builder.Services.AddOpenApi();

        var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [];
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment()) app.MapOpenApi();

        app.UseHttpsRedirection();
        app.UseCors();

        var api = app.MapGroup("/api/v1");
        
        api.MapGet("/health", () => TypedResults.Ok(new { Status = "Healthy", Version = "10.0" }));
        
        api.MapGet("/profile", async (PortfolioContext db) =>
            {
                var profileData = new PortfolioProfileResponse(
                    Skills: await db.Skills
                        .Select(s => new SkillResponse(s.Id, s.Name, s.Category))
                        .ToListAsync(),
            
                    Projects: await db.Projects
                        .Select(p => new ProjectResponse(
                            p.Id,
                            p.Title,
                            p.Description,
                            p.Tech,
                            p.Github,
                            p.LiveUrl,
                            p.Features,
                            p.Views.Select(v => new ProjectViewResponse(v.Label, v.Image))
                        ))
                        .ToListAsync(),
            
                    Education: await db.Educations
                        .Select(e => new EducationResponse(e.Id, e.Institution, e.Degree, e.TimeFrame ?? "", e.Status ?? "", e.Description ?? ""))
                        .ToListAsync(),
            
                    Certifications: await db.Certifications
                        .Select(c => new CertificationResponse(c.Id, c.Name, c.Issued))
                        .ToListAsync(),
            
                    Experience: await db.Experiences
                        .Include(e => e.Assignments) // CRITICAL: Don't forget to include
                        .Select(e => new ExperienceResponse(
                            e.Id,
                            e.Slug,
                            e.Company,
                            e.Position,
                            e.TimeFrame, // Fixes CS8604 null warning
                            e.Description,
                            e.Assignments.Select(a => new AssignmentResponse(a.Name, a.Dates, a.Task))
                        ))
                        .ToListAsync()
                );

                return TypedResults.Ok(profileData);
            })
            .WithName("GetProfileData");
        
        api.MapPost("/transmit", async Task<Results<Accepted, BadRequest<string>, ProblemHttpResult>> (ContactMessage message, IConfiguration config, PortfolioContext db) =>
            {
                if (string.IsNullOrWhiteSpace(message.Message))
                    return TypedResults.BadRequest("Message payload required");

                var smtpConfig = config.GetSection("SmtpSettings");
                var senderName = smtpConfig["SenderName"];
                var senderEmail = smtpConfig["SenderEmail"];
                var recipientName = smtpConfig["RecipientName"];
                var recipientEmail = smtpConfig["RecipientEmail"];

                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(senderName, senderEmail));
                email.To.Add(new MailboxAddress(recipientName, recipientEmail));
                email.Subject = $"[Terminal Transmission] Message from {message.Name}";
                email.Body = new TextPart(MimeKit.Text.TextFormat.Plain)
                {
                    Text = $"TRANSMISSION LOG\n" +
                           $"----------------\n" +
                           $"SENDER: {message.Name}\nEMAIL: {message.Email}\n" +
                           $"TIME: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC\n\n" +
                           $"PAYLOAD:\n{message.Message}"
                };
                
                try
                {
                    using var smtp = new SmtpClient();
                    await smtp.ConnectAsync(smtpConfig["Server"], int.Parse(smtpConfig["Port"] ?? "587"), MailKit.Security.SecureSocketOptions.StartTls);
                    await smtp.AuthenticateAsync(smtpConfig["Username"], smtpConfig["Password"]);
                    await smtp.SendAsync(email);
                    await smtp.DisconnectAsync(true);

                    Console.WriteLine($"[SIGNAL RELAYED SUCCESSFULLY]: {message.Email}");
                    
                    await db.ContactMessages.AddAsync(message);
                    await db.SaveChangesAsync();
                    
                    return TypedResults.Accepted(uri: string.Empty);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[SMTP ERROR]: {ex.Message}");
                    return TypedResults.Problem("Signal Lost: Failed to relay message to SMTP server.");
                }
            })
            .WithName("SubmitTransmission");
        
        app.Run();
    }
}