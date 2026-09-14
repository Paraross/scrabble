using HtmlAgilityPack;

namespace ScrabbleBackend.WordDictionaries;

public class SjpDictionary : FullDictionary
{
    private const string BaseUrl = "https://sjp.pl/";

    private HashSet<string> Words
    {
        get
        {
            field ??= WordListReader.ReadWords("slowa.txt");
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
        var document = web.Load($"{BaseUrl}{word}");

        return document
            .DocumentNode.QuerySelectorAll("body > p")
            .Any(p => p.InnerText.StartsWith("dopuszczalne w grach (i)"));
    }
}
