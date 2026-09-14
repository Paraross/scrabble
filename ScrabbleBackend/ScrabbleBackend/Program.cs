using ScrabbleBackend.Controllers;
using ScrabbleBackend.WordDictionaries;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IWordDictionary, SjpDictionary>();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => { options.SwaggerEndpoint("/openapi/v1.json", "v1"); });
}

new WordsController().MapAll(app);

app.Run();
