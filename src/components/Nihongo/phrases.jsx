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

addPhrase(`
これはいくらですか？
これはいくらですか？
How much is this?
Essential when shopping — polite and straightforward.
`)

addPhrase(`
英語を話せますか？
えいごをはなせますか？
Can you speak English?
Helpful if you're struggling to communicate in Japanese.
`)

addPhrase(`
助けてください！
たすけてください！
Please help me!
Use this in emergencies or urgent situations.
`)

addPhrase(`
もう一度お願いします。
もういちどおねがいします。
One more time, please.
Great for asking someone to repeat something you didn’t catch.
`)

addPhrase(`
ゆっくり話してください。
ゆっくりはなしてください。
Please speak slowly.
Useful if you’re having trouble understanding.
`)

addPhrase(`
日本語は少ししか話せません。
にほんごはすこししかはなせません。
I can only speak a little Japanese.
Sets expectations politely in conversations.
`)

addPhrase(`
お会計をお願いします。
おかいけいをおねがいします。
Check, please.
Use this when you're ready to pay at a restaurant.
`)

addPhrase(`
美味しかったです。
おいしかったです。
It was delicious.
A polite compliment after a meal.
`)

addPhrase(`
大丈夫です。
だいじょうぶです。
It’s okay / I’m fine.
Versatile phrase for reassurance or refusal.
`)

addPhrase(`
すみません、道に迷いました。
すみません、みちにまよいました。
Excuse me, I’m lost.
Use this to ask for directions politely.
`)

addPhrase(`
写真を撮ってもらえますか？
しゃしんをとってもらえますか？
Can you take a photo for me?
Ask this when you want someone to take your picture.
`)

addPhrase(`
これは何ですか？
これはなんですか？
What is this?
Great for asking about unfamiliar items.
`)

addPhrase(`
お名前は何ですか？
おなまえはなんですか？
What is your name?
Basic phrase to start getting to know someone.
`)

addPhrase(`
初めまして。
はじめまして。
Nice to meet you.
Used when first meeting someone.
`)

addPhrase(`
よろしくお願いします。
よろしくおねがいします。
Please treat me well / I look forward to working with you.
Common after 初めまして or when making a request.
`)

addPhrase(`
行きたい場所があります。
いきたいばしょがあります。
There’s a place I want to go.
Use when explaining your travel plans or asking for help.
`)

addPhrase(`
道を教えてくれますか？
みちをおしえてくれますか？
Can you tell me the way?
Helpful when asking for directions.
`)

addPhrase(`
現金しか使えませんか？
げんきんしかつかえませんか？
Can I only use cash?
Useful when checking if cards are accepted.
`)

addPhrase(`
電車はどこですか？
でんしゃはどこですか？
Where is the train?
Essential for navigating transit.
`)

addPhrase(`
病院はどこですか？
びょういんはどこですか？
Where is the hospital?
Important for emergencies or medical needs.
`)

