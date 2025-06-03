import "./style.scss"

import { phrases } from "./phrases.jsx"

export default MobxReact.observer(function(props)
{
	const [currentlyToggledPhraseIndex, setCurrentlyToggledPhraseIndex] = React.useState(null)
	const location = ReactRouterDOM.useLocation()

	return <>
		<div className="Nihongo">
			<h1>日本語</h1>
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

			return <div key={phraseIndex} id={id} className={classNames.join(" ")}>
				<div className="content">
					<a href={`#${id}`} className={anchored ? "anchored" : ""}><Icons.Hashtag/></a>
					<div className="japanese">
						<div className="furigana">{phrase.furigana}</div>
						{phrase.japanese}
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
		}
	}
})
