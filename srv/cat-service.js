const cds = require('@sap/cds')
module.exports = cds.service.impl(async function () {
    this.on('READ', 'Files', async (req) => {
        const { Files } = this.entities;
        let data = await cds.tx(req).run(SELECT.from(Files))

        console.log(data)
        return data;
    })
})