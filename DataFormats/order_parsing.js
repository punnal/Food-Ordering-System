

function parse_orders(orders){
  
    Object.values(orders["data"]).forEach((order_obj, i) => {
       order_obj["orders"] = []
       if ("items" in order_obj) 
       {
           order_obj["items"].forEach((item) =>{
             item["options"] = {}
             item["optionsPrices"] = {}
             if("option_list_choices" in item){
               item["option_list_choices"].forEach((choice) => {
                 item["options"][choice["list_name"]] = choice["option_choice"]
                 item["optionsPrices"][choice["list_name"]] = choice["price"]
               })
             }
           delete item.option_list_choices
           order_obj["orders"].push(item)
         })
       }
 
       if ("deals" in order_obj) 
       {
         order_obj["deals"].forEach((deal) =>{
           var deal_items = deal["items"]
           deal["items"] = []
           deal_items.forEach((item) => {
             item["options"] = {}
             item["optionsPrices"] ={}
             if("option_list_choices" in item){
               item["option_list_choices"].forEach((choice) => {
                 item["options"][choice["list_name"]] = choice["option_choice"]
                 item["optionsPrices"][choice["list_name"]] = choice["price"]
               })
             }
             delete item.option_list_choices
             deal["items"].push(item)
           })
           order_obj["orders"].push(deal)  
         })
       }
 
       delete order_obj.deals
       delete order_obj.items
       orders["data"][Object.keys(orders["data"])[i]] = order_obj
    })
 
    return orders
 }
 