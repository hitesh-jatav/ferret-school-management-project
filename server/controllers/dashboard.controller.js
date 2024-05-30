

const homePage = async (req, res, next) => {
    try {
        console.log('homepage route-----');
        return res.send({ message: 'Success'});
    } catch (err) {
        console.log('homePage', err)
    }
}

module.exports = {
    homePage
}