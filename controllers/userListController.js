module.exports = function (request, response) {
    try {
        let query = "SELECT * FROM "
        response.send("invoked user-list controlller");
    } catch (error) {
        console.error(error);
        response.status(500).json({ "code": "INTRNL_ERR", "message": "internal server error" });
    }
}