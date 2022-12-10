const Filter = ({ handler, value }) => {
    return (
      <div>filter shown with <input type="text" onChange={handler} value={value}/></div>
    )
  }

export default Filter