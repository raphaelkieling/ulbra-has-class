const error = (err) => {
    return (res) => {
        res.status(500).send(errorObject(err.message))
    }
}

const errorObject = error => {
    return {
        error
    }
}

module.exports = {
    error,
    errorObject
}