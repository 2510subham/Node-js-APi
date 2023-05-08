import { Items } from '../model/itemModel';

export const getItem=async (req:any,res:any)=>
{
    try {
        const items = await Items.findAll();
        res.status(200).json({success:true,message:items});
    }
    catch (err) {
        res.status(400).json({success: false, message: "not get items" });
    }
}

export const createItem=async (req:any,res:any)=>{
    try {
        const { name, price } = req.body;
        await Items.create({
            name: name,
            price: price
        })
        console.log("item created"); 
        return res.status(200).json({success: true, message: "item created" });
    }
    catch (err) {
        return res.status(400).json({success: false, message: "item not created" });
    }
}

export const updateItem=async (req:any,res:any)=>{
    try {
        const { name, price } = req.body;
        await Items.update({
            name:name,
            price:price
        },{where:{name:name}})
        console.log("item updated");
        return res.status(200).json({success: true, message: "item updated" });

    }
    catch(err)
    {
        return res.status(400).json({success: false, message: "item not updated" });
    }
}

export const deleteItem=async (req:any,res:any)=>{
    try{

        const { name } = req.body;//destructing the body
        await Items.destroy({ where: { name: name } })
        return res.status(200).json({success: true, message: "item deleted" });
    }
    catch(err)
    {
        return res.status(400).json({success: false, message: "item not found" });
    }
}
