import "./style.scss"

export default MobxReact.observer(function(props)
{
	const [selectedFile, setSelectedFile] = React.useState(Object.keys(__DOCUMENTS__)[0])

	return <>
		<div className="Nihongo">
			<h1>これは日本語です。</h1>
			<label>Choose file:</label>
			<select value={selectedFile} onChange={selectedFileNameChanged}>
				{Object.keys(__DOCUMENTS__).map((fileName) => {
					return <option key={fileName} name={fileName}>{fileName}</option>
				})}
			</select>
			<div className="textFileWrapper">
				<pre>
					{__DOCUMENTS__[selectedFile]}
				</pre>
			</div>
		</div>
	</>

	function selectedFileNameChanged(e)
	{
		setSelectedFile(e.target.value)
	}
})
