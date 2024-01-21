const Form = ({addPerson, handleInput, newName, setNewName, newNumber, setNewNumber}) => {
    return (
        <>
            <form onSubmit={addPerson}>
                <h2>Add a new</h2>
                <div>
                    name: <input
                        onChange={handleInput(setNewName)}
                        value={newName} />
                </div>
                <div>number:
                    <input
                        onChange={handleInput(setNewNumber)}
                        value={newNumber} />
                </div>
                <div>
                    <button type='submit' >add</button>
                </div>
            </form>
        </>
    )
}

export default Form;