FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["portfolio-api.csproj", "./"]
RUN dotnet restore "portfolio-api.csproj"

COPY . .
RUN dotnet publish "portfolio-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "portfolio-api.dll"]
