const error = (err) => {
    return (res) => {
        res.status(500).send(errorResponse(err.message))
    }
}

const errorResponse = error => {
    return {
        error
    }
}

const dataResponse = data => {
    return {
        data
    }
}

module.exports = {
    error,
    errorResponse,
    dataResponse
}