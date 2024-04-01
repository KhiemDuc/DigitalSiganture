module.exports = (...props) => {
    props.forEach(element => {
        try {
            if ( element === null || element === undefined )
            throw new Error('Null')
        } catch (err) {
            return false
        }
        return true
    });
}