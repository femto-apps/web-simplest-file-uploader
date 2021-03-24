const error = {
    'user not logged in': {
        text: 'You are not logged in!'
    }
}

export default function errors(id) {
    return error[id].text
}