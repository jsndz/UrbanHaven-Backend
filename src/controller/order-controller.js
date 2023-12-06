import Order from "../models/Order.js";

export const fetchOrderByUser = async (req, res) => {
  const {user} = req.query;
  try {
    const orders = await Order.find({user:user}).populate("user");
    return res.status(201).json({
      data: orders,
      message: "Successfully returned Orders",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't get Orders",
      success: false,
      err: { error },
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json({
      data: order,
      message: "Successfully created Order",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't create Order",
      success: false,
      err: { error },
    });
  }
};
export const updateOrder = async (req, res) => {
  const {id} = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id,req.body,{new:true});
    
    return res.status(201).json({
      data: order,
      message: "Successfully updated Order by id",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't update Order",
      success: false,
      err: { error },
    });
  }
};

export const deleteOrder = async (req, res) => {
  
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    return res.status(201).json({
      data: order,
      message: "Successfully deleted Order by id",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't delete Order",
      success: false,
      err: { error },
    });
  }
};

export const fetchAllOrders = async (req, res) => {
    let query = Order.find({deleted:{$ne:true}});
    const totalDocsQuery = Order.find({}); 
   
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query._page && req.query._limit) {
      const page = req.query._page;
      const pageSize = req.query._limit;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const response = await query.exec();
      const totalDocs = await totalDocsQuery.count().exec(); 
      res.set('X-total-count', totalDocs);
      return res.status(200).json({
        data: response,
        message: "Successfully returned Orders",
        success: true,
        err: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        message: "Couldn't get Orders",
        success: false,
        err: { error },
      });
    }
  };