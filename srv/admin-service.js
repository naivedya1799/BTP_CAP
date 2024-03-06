const cds = require('@sap/cds/lib')
const { init } = require("express/lib/application")

module.exports = class AdminService extends cds.ApplicationService {
    init() {
        const { Books, Authors } = this.entities;
        this.before('NEW', Books, genid)
        this.before('NEW', Authors, genid)
        return super.init()
    }
}
async function genid(req) {
    const { id } = await SELECT.one.from(req.target).columns('max(ID) as id')
    req.data.ID = id - id % 100 + 100 + 1
}