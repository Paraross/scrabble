using Microsoft.AspNetCore.Http.HttpResults;
using ScrabbleBackend.WordDictionaries;

namespace ScrabbleBackend.Controllers;

public class WordsController : IController
{
    public string Path => "/words";

    public void MapAll(IEndpointRouteBuilder routeBuilder)
    {
        var api = routeBuilder.MapGroup(Path);
        api.MapGet("/{word}", Exists);
    }

    private static async Task<Results<Ok, NotFound>> Exists(string word, IWordDictionary wordDictionary)
    {
        return wordDictionary.Contains(word) ? TypedResults.Ok() : TypedResults.NotFound();
    }
}
