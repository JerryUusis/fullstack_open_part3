const Filter = ({handleInput, setFilterPhonebook}) => {
    return (
        <div>
        Filter shown with <input
          onChange={handleInput(setFilterPhonebook)}
        />
      </div>
    )
}

export default Filter