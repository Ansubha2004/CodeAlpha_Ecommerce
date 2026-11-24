import ordermodel from "../models/ordermodel.js"

const ship =60*60 * 1000;
const deliver = 5*60*60 * 1000;

export const orderstatus=async (order)=>{
    try{
        const elapsed=Date.now()-new Date(order.createdAt).getTime();
        if (order.orderStatus === "Delivered") {
          return;
        }
        if (elapsed < ship) {
            setTimeout(async () => {
              const updatedOrder = await ordermodel.findById(order._id);
      
              if (updatedOrder?.orderStatus === "Processing") {
                updatedOrder.orderStatus = "Shipped";
                await updatedOrder.save();
              }
            }, ship - elapsed);
          }
    
          if (elapsed < deliver) {
            setTimeout(async () => {
              const updatedOrder = await ordermodel.findById(order._id);
      
              if (
                updatedOrder &&
                ["Processing", "Shipped"].includes(updatedOrder.orderStatus)
              ) {
                updatedOrder.orderStatus = "Delivered";
                await updatedOrder.save();
              }
            }, deliver - elapsed);
          }
    }
    catch (error) {
        console.log("Order timer error:", error.message);
      }
}   