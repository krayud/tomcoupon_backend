const success = (payload) => {
    return { res: true, payload };
}

const fail = (errors) => {
    return { res: false, errors };
}

export {
    success,
    fail,
}
