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

    static parseMenuBeforePush = (type, data) => {
        const parsed = {[type]:data}
        return parsed
    }

    static parseDealsBeforePush = (deal, type) => {
        let arr = []
        if(deal.items)
            deal.items.forEach(item => arr = [...arr, ...Array(parseInt(item.quantity)).fill(item.id)])
        deal.items = arr
        console.log(deal.items)
        const parsed = {[type]:deal}
        return parsed
    }
}

export default Parsers
