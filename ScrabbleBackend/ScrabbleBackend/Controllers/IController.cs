namespace ScrabbleBackend.Controllers;

public interface IController
{
    public string Path { get; }

    public void MapAll(IEndpointRouteBuilder routeBuilder);
}
