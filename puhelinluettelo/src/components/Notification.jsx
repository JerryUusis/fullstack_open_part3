const Notification = ({ errorMessage, notificationType }) => {
    if (errorMessage === null) {
        return null
    }

    return (
        <div className={`notification ${notificationType}`}>
            <p>{errorMessage}</p>
        </div>
    )
}

export default Notification