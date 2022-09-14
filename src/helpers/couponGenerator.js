const generateCoupon = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const charsLength = chars.length;
    const amount = 8;
    let code = '';
    for (let i = 0; i < amount; i++) {
        const randomValue = Math.floor(Math.random() * charsLength);
        if (i % 4 === 0 && i > 0) {
            code += '-';
        }
        code = code.concat(chars[randomValue].toString());
    }
    return code;
}

export {
    generateCoupon,
}
