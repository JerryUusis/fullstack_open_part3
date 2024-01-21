const Persons = ({ persons, filterPhonebook, removePerson }) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {persons
                    .filter((person) => person.name.toLowerCase().includes(filterPhonebook.toLowerCase()))
                    .map((person) => {
                        return <div key={person.name}>
                            <li>{person.name} {person.number} <button onClick={() => removePerson(person)}>Delete</button></li>
                        </div>
                    })}
            </ul>
        </>

    )
}

export default Persons