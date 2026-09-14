namespace ScrabbleBackend.WordDictionaries;

public abstract class FullDictionary : IWordDictionary, ILocalWordDictionary, IOnlineWordDictionary
{
    public bool IsLocal { get; set; } = false;

    public bool Contains(string word)
    {
        return IsLocal ? ContainsLocal(word) : ContainsOnline(word);
    }

    public abstract bool ContainsLocal(string word);

    public abstract bool ContainsOnline(string word);
}
