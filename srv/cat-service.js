const cds = require('@sap/cds')


// const { init } = require("express/lib/application")
// class CatalogService extends cds.ApplicationService {
//     init() {
//         // this.on('READ', 'Files', async (req) => {
//         //     const { Files } = this.entities;
//         //     let data = await cds.tx(req).run(SELECT.from(Files))

//         //     console.log(data)
//         //     return data;
//         // })
//         const { Books } = cds.entities('my.bookshop')
//         const { ListOfBooks } = this.entities

//         // Add some discount for overstocked books
//         this.after('READ', ListOfBooks, each => {
//             if (each.stock > 111) each.title += ` -- 11% discount!`
//         })

//         // Reduce stock of ordered books if available stock suffices
//         this.on('submitOrder', async req => {
//             let { book: id, quantity } = req.data
//             let book = await SELECT.from(Books, id, b => b.stock)

//             // Validate input data
//             if (!book) return req.error(404, `Book #${id} doesn't exist`)
//             if (quantity < 1) return req.error(400, `quantity has to be 1 or more`)
//             if (quantity > book.stock) return req.error(409, `${quantity} exceeds stock for book #${id}`)

//             // Reduce stock in database and return updated stock value
//             await UPDATE(Books, id).with({ stock: book.stock -= quantity })
//             return book
//         })

//         // Emit event when an order has been submitted
//         this.after('submitOrder', async (_, req) => {
//             let { book, quantity } = req.data
//             await this.emit('OrderedBook', { book, quantity, buyer: req.user.id })
//         })

//         // Delegate requests to the underlying generic service
//         return super.init()
//     }
// }
module.exports = cds.service.impl(async function () {
    const { MultipleDatas } = this.entities;
    this.on('CREATE', MultipleDatas, async (req) => {
        const test = req.data.test
        await cds.transaction(req).run(
            INSERT.into(MultipleDatas, [{ test: test }])
        )
        const data = await SELECT.from(MultipleDatas)
        return data
    })
    this.after('READ', MultipleDatas, each => {
        if (each.test > 5) each.test += ` -- 11% discount!`
    })
})