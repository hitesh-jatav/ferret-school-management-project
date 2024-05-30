

const getNoticeLists = async (req, res) => {
    try {

    } catch (error) {

    }
}


const addNotice = async (req, res) => {
    try {
        console.log(req.body);
        
    } catch (error) {
        console.log('addNotice', error)
    }
}

module.exports = {
    getNoticeLists,
    addNotice
}