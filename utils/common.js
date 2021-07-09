const empty = (e) => {
    if (e == "" || e == null || e == undefined) return true;
    else return false;
}

const notEmpty = (e) => {
    if (!empty(e)) return true;
    else return false;
}

module.exports = {
    empty, notEmpty
}