export const phrases = []

function addPhrase(string)
{
	const lines = string.trim().split("\n")
	const phrase = {
		japanese:    lines[0]                  || "",
		furigana:    lines[1]                  || "",
		translation: lines[2]                  || "",
		notes:       lines.slice(3).join("\n") || ""
	}
	phrases.push(phrase)
}

addPhrase(`
おすすめは何ですか？
おすすめはなんですか？
What do you recommend?
Useful at restaurants or shops when you're unsure what to pick.
`)

addPhrase(`
トイレはどこですか？
トイレはどこですか？
Where is the bathroom?
Essential phrase for travel — polite and direct.
`)

addPhrase(`
写真を撮ってもいいですか？
しゃしんをとってもいいですか？
Is it okay to take a photo?
Use this in museums, shops, or temples to ask permission.
`)

