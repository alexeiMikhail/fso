const Form = ({ handleSubmit, handleNumInput, handleNameInput, newName, newNum, inputRef }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          name: <input autoFocus onChange={handleNameInput} ref={inputRef} value={newName}/>
        </div>
        <div>number: <input onChange={handleNumInput} value={newNum} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

export default Form