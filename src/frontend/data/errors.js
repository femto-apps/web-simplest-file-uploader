const error = {
    'user not logged in': {
        text: 'You are not logged in!'
    },
    'Request failed with status code 401': {
        text: 'You are not authorised to do this!'
    }
}

export default function errors(id) {
    if (!(id in error)) {
        return id
    }

    return error[id].text
}