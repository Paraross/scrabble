using HtmlAgilityPack;

namespace ScrabbleBackend.WordDictionaries;

public class SjpDictionary(IConfiguration configuration) : FullDictionary
{
    private readonly string _baseUrlTemplate = configuration.GetValue<string>("WordDictionaries:Sjp:WordUrl") ??
                                               throw new InvalidOperationException("No config for SJP");

    private HashSet<string> Words
    {
        get
        {
            field ??= LocalWordListReader.ReadWords("slowa.txt");
            return field;
        }
    }

    override public bool ContainsLocal(string word)
    {
        return Words.Contains(word);
    }

    override public bool ContainsOnline(string word)
    {
        var web = new HtmlWeb();
        var document = web.Load(_baseUrlTemplate.Replace("{word}", word));

        return document
            .DocumentNode.QuerySelectorAll("body > p")
            .Any(p => p.InnerText.StartsWith("dopuszczalne w grach (i)"));
    }
}
