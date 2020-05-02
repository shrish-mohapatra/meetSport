module.exports = {
    app: {
        name: "MeetSport",
        baseUrl: `http://localhost`,
        port: 8000,
    },

    /*
        MongoDB Cluster Creds
        db-admin, msport@52!
    */

    database: {
        url: `mongodb+srv://db-admin:msport@52!@db-msport-xtsyh.mongodb.net/test?retryWrites=true&w=majority`
    }
}