import Order from "../model/oder.js";

export async function createOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'You need to login first' });
  }

  const body = req.body;

  const orderData = {  //order data eka object ekakata store karanawa
    
  
    orderId: "",
    email: body.email || '',
    name: body.name || (req.user ? `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim() : ''),
    address: body.address || '',
    phoneNumber: body.phoneNumber || '',
    billItems: Array.isArray(body.billItems) ? body.billItems : [],
    total: typeof body.total === 'number' ? body.total : 0,
  };  //

  try {
    const lastBill = await Order.findOne().sort({ date: -1 }).limit(1);  //last oder eka gannawa

  
    if (!lastBill) {   //naththam first order eka create karanawa
    
      orderData.orderId = "ORD0001";

    } else {  //last order eka thiyenawanam eka wada eka create karanawa
      const lastOrderId = lastBill.oderId || lastBill.orderId || '';
      const lastOrderNumber = (lastOrderId || 'ORD0000').replace(/[^0-9]/g, '');
      const newOrderNumberInt = parseInt(lastOrderNumber || '0', 10) + 1;
      const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, "0");
      const newId = "ORD" + newOrderNumberStr;
      orderData.oderId = newId;
      orderData.orderId = newId;
    }

    const order = new Order(orderData); //new order object ekak hadanawa model eka use karala
    await order.save(); //database ekata save karanawa

    res.json({ message: "Order created successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating order" });
  }
}

export function getOrders(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'You need to login first' });
  }
  if (req.user.role == 'admin') {
    Order.find().then(
      (orders) => {
        res.json(orders);
      }
    ).catch(
      (err) => {
        res.status(500).json({ message: 'Error retrieving orders' });
      }
    );
  } else {
    Order.find({ email: req.user.email }).then(
      (orders) => {
        res.json(orders);
      }
    ).catch(
      (err) => {
        res.status(500).json({ message: 'Error retrieving orders' });
      }
    );
  }
}
  
 