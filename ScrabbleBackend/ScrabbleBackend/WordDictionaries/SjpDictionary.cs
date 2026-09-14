namespace ScrabbleBackend.WordDictionaries;

public class SjpDictionary : IWordDictionary
{
    public SjpDictionary()
    {
        using var reader = new StreamReader("WordDictionaries/WordLists/slowa.txt");

        var words = new List<string>();
        foreach (var line in reader.ReadToEnd().EnumerateLines())
        {
            words.Add(line.ToString());
        }

        _words = words;
    }

    private readonly List<string> _words;

    public bool ContainsWord(string word)
    {
        return _words.Contains(word);
    }
}
