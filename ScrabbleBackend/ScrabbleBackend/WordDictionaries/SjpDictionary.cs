using System.Diagnostics;

namespace ScrabbleBackend.WordDictionaries;

public class SjpDictionary : IWordDictionary
{
    public SjpDictionary()
    {
        using var reader = new StreamReader("WordDictionaries/WordLists/slowa.txt");

        var wordsSet = new HashSet<string>();
        foreach (var line in reader.ReadToEnd().EnumerateLines())
        {
            var word = line.ToString();
            wordsSet.Add(word);
        }

        _words = wordsSet;
    }

    private readonly HashSet<string> _words;

    public bool Contains(string word)
    {
        var s = Stopwatch.StartNew();

        var contains = _words.Contains(word);

        s.Stop();

        Console.WriteLine($"ELAPSED: {s.ElapsedMilliseconds} ms");

        return contains;
    }
}
