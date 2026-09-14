namespace ScrabbleBackend.WordDictionaries;

public class SjpDictionary : IWordDictionary
{
    private readonly HashSet<string> _words = WordListReader.ReadWords("slowa.txt");

    public bool Contains(string word)
    {
        return _words.Contains(word);
    }
}
