import Order from "../model/oder.js";

export async function createOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'You need to login first' });
  }

  const body = req.body;

  const orderData = {
    // Model expects `oderId` and `name` (note existing model typos). Populate both
  
    orderId: "",
    email: body.email || '',
    name: body.name || (req.user ? `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim() : ''),
    address: body.address || '',
    phoneNumber: body.phoneNumber || '',
    billItems: Array.isArray(body.billItems) ? body.billItems : [],
    total: typeof body.total === 'number' ? body.total : 0,
  };

  try {
    const lastBill = await Order.findOne().sort({ date: -1 }).limit(1);

    // Determine last order id from model field (the model uses `oderId`)
    if (!lastBill) {
      orderData.oderId = "ORD0001";
      orderData.orderId = "ORD0001";
    } else {
      const lastOrderId = lastBill.oderId || lastBill.orderId || '';
      const lastOrderNumber = (lastOrderId || 'ORD0000').replace(/[^0-9]/g, '');
      const newOrderNumberInt = parseInt(lastOrderNumber || '0', 10) + 1;
      const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, "0");
      const newId = "ORD" + newOrderNumberStr;
      orderData.oderId = newId;
      orderData.orderId = newId;
    }

    const order = new Order(orderData);
    await order.save();

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
  
 