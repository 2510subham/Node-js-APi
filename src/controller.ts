import { Items } from './model';
export async function createItem(name:string,price:number) {
    try {
        await Items.create({
            name:name,
            price:price
        })
        console.log("item created"); 
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false; 
    }
}
export async function updateItem(name:string,price:number) {
    try {
        await Items.update({
            name:name,
            price:price
        },{where:{name:name}})
        console.log("item updated");
        return true; 
    }
    catch(err)
    {
        console.log(err);
        return false; 
    }
}

