class Parsers {
    static parseDealOptions = (items) => {
        let final = {}
        items.forEach(item => {
            final = {...final, ...this.parseItemOptions(item.options_lists, item.name)}
        })
        return final
    }

    static parseItemOptions = (list, item) => {
        let final = []
        list.forEach(ls => {
            let name = Object.keys(ls)[0]
            let options = Object.values(ls)[0]
            let ol = {
                name: name,
                options: options
            }
            final = [...final, ol]
        })
        return {
            [item]: final
        }
    }

    static parseDealsBeforePush = (deal, type) => {
        deal.items = deal.items.map(item => item.id)
        const parsed = {[type]:deal}
        console.log(parsed)
        return parsed
    }
}

export default Parsers
