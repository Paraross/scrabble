namespace ScrabbleBackend.WordDictionaries;

public static class LocalWordListReader
{
    private const string WordListsDirectory = "WordDictionaries/WordLists";

    public static HashSet<string> ReadWords(string fileName)
    {
        using var reader = new StreamReader(Path.Join(WordListsDirectory, fileName));

        var words = new HashSet<string>();
        foreach (var line in reader.ReadToEnd().EnumerateLines())
        {
            var word = line.ToString();
            words.Add(word);
        }

        return words;
    }
}
