import userModel from "../models/userModel.js"


//add items to user cart
const addToCart = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData || {}; // Ensure cartData exists
  
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      } else {
        cartData[req.body.itemId] += 1;
      }
  
      await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
  
      res.json({ success: true, message: "Added to cart" });
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

//remove items from user cart
const removeFromCart = async (req , res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData ;
    
        if (cartData[req.body.itemId]>0) {
          cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    
        res.json({ success: true, message: "Removed from cart" });
      } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
}

//fetch user cart data
const getCart = async (req , res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData ;
        res.json({ success: true, cartData  });
      } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
}

export {addToCart,removeFromCart,getCart}