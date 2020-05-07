class Parsers {
    static parseDealOptions = (items) => {
        let final = {}
        items.forEach(item => {
            final = {...final, ...this.parseItemOptions(item.options_lists, item.name, item.quantity)}
        })
        return final
    }

    static parseItemOptions = (list, item, qty) => {
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

        let repeated = {}
        if(!qty)
            qty = 1

        Array(qty).fill(qty).forEach((e, i) => {
            repeated[`${item} #${i+1}`] = final
        })

        return {
            ...repeated
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
        const parsed = {[type]:deal}
        return parsed
    }

    static filterSelected = (name, i, list, selected, type) => {
        const listNames = list.map(l => Object.keys(l)[0])
        let ret = {}
        listNames.forEach(listName => {
            let string = `${name} #${i}`
            console.log(string)
            const ref= selected[string][listName]
            const selected_name = Object.keys(ref).filter(e => ref[e].checked)[0]
            const selected_charge = Object.values(ref).filter(e => e.checked)[0].charge
            ret[listName] = type ==='name'? selected_name:selected_charge
        })
        return ret
    }

    static parseBillItem = (item, selected, qty) => {
        return Array(qty).fill(0).map((k, i) => {
            return {
                name: item.name,
                id: item.id,
                price: item.price,
                options: this.filterSelected(item.name, i+1, item.options_lists, selected, 'name'),
                optionsPrices: this.filterSelected(item.name, i+1, item.options_lists, selected, 'price')
            }
        })
    }

    static combine = (lists) => {
        return lists.reduce((acc, el) => {
            return [...acc, ...el]
        }, [])
    }

    static parseBillDeal = (deal, selected) => {
        return {
            name: deal.name,
            id: deal.id,
            price: deal.price,
            items: this.combine(deal.items.map((item,i) => this.parseBillItem(item, selected, item.quantity)))
        }
    }

    static parseBillEntry = (entry, selected) => {
        return (entry.items)? this.parseBillDeal(entry, selected) :this.parseBillItem(entry, selected, entry.qty)[0]
    }
    static parseBillForPost = (bill, selected) => {
        if(bill.length === 0)
            return
        let arrayOfItems = bill.map((entry,i) => this.parseBillEntry(entry, selected))
        return arrayOfItems
    }
}

export default Parsers
