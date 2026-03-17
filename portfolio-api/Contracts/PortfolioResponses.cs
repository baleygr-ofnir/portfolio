namespace portfolio_api.Contracts;

public record SkillResponse
(
    Guid Id,
    string Name,
    string Category
);

public record EducationResponse
(
    Guid Id,
    string Institution,
    string Degree,
    string TimeFrame,
    string Status,
    string Description
);

public record CertificationResponse
(
    Guid Id,
    string Name,
    string Category
);

public record AssignmentResponse
(
    string Name,
    string Dates,
    string Task
);

public record ExperienceResponse
(
    Guid Id,
    string Slug,
    string Company,
    string Position,
    string TimeFrame,
    string? Description,
    IEnumerable<AssignmentResponse> Assignments
);

public record ProjectViewResponse
(
    string Label,
    string Image
);

public record ProjectResponse
(
    Guid Id,
    string Title,
    string Description,
    string[] Tech,
    string? Github,
    string? LiveUrl,
    string[] Features,
    IEnumerable<ProjectViewResponse> Views
);

public record PortfolioProfileResponse
(
    IEnumerable<SkillResponse> Skills,
    IEnumerable<ProjectResponse> Projects,
    IEnumerable<EducationResponse> Education,
    IEnumerable<CertificationResponse> Certifications,
    IEnumerable<ExperienceResponse> Experience
);