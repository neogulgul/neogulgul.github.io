import "./style.scss"

import { phrases } from "./phrases.jsx"

import { diffWords } from "diff"

export default MobxReact.observer(function(props)
{
	const [currentlyToggledPhraseIndex, setCurrentlyToggledPhraseIndex] = React.useState(null)
	const location = ReactRouterDOM.useLocation()

	return <>
		<div className="Nihongo">
			<h1>日本語</h1>
			<div className="colorCodes">
				<div className="japanese">
					<div className="circle"></div>
					Japanese
				</div>
				<div className="furigana">
					<div className="circle"></div>
					Furigana
				</div>
				<div className="translation">
					<div className="circle"></div>
					Translation
				</div>
				<div className="notes">
					<div className="circle"></div>
					Notes
				</div>
			</div>
			{renderPhrases(phrases)}
		</div>
	</>

	function renderPhrases(phrases)
	{
		return <div className="phrases">{phrases.map(renderPhrase)}</div>

		function renderPhrase(phrase, phraseIndex)
		{
			const id = `${phraseIndex + 1}`
			const classNames = [ "phrase" ]

			const anchored = location.hash === "#" + id

			const toggled = phraseIndex === currentlyToggledPhraseIndex

			if (toggled)
			{
				classNames.push("toggled")
			}

			const japaneseWithFurigana = combinedJapaneseAndFurigana(phrase.japanese, phrase.furigana)

			console.log(japaneseWithFurigana)

			return <div key={phraseIndex} id={id} className={classNames.join(" ")}>
				<div className="content">
					<a href={`#${id}`} className={anchored ? "anchored" : ""}><Icons.Hashtag/>{`${phraseIndex + 1}/${phrases.length}`}</a>
					<div className="japanese">
						{japaneseWithFurigana.map(renderJapaneseWithFurigana)}
					</div>
					<div className="translation">{phrase.translation}</div>
					<div className="notes">{phrase.notes}</div>
				</div>
				<div className="toggle" onClick={() => {
					setCurrentlyToggledPhraseIndex(toggled ? null : phraseIndex)
				}}>
					<Icons.ArrowDownWide/>
				</div>
			</div>

			function renderJapaneseWithFurigana(japaneseWithFuriganaPart, japaneseWithFuriganaPartIndex)
			{
				return <span key={japaneseWithFuriganaPartIndex}>
					<div className="furigana">{japaneseWithFuriganaPart.furigana}</div>
					{japaneseWithFuriganaPart.japanese}
				</span>
			}
		}
	}
})

function combinedJapaneseAndFurigana(japanese, furigana)
{
	const combination = []

	const diff = diffWords(japanese, furigana)

	for (let i = 0; i < diff.length; i++)
	{
		const part     = diff[i]
		const partNext = diff[i + 1]
		if (!part.added && !part.removed)
		{
			combination.push({
				japanese: part.value,
				furigana: ""
			})
		}
		else if (part.removed && partNext.added)
		{
			combination.push({
				japanese: part    .value,
				furigana: partNext.value
			})
		}
	}

	return combination
}
