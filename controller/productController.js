import Product from '../model/product.js';

export function createProduct(req, res) {
    if(req.user == null){ //check karanawa user login una naththam
        res.status(401).json({ message: 'You need to login first' });
        return;
    }
    if(req.user.role !== 'admin'){ //check karanawa user admin naththam
        res.status(403).json({ message: 'You are not authorized to create products' });
        return;
    }

    const product = new Product(req.body); //new product object ekak hadanawa model eka use karala
    product.save().then(
        () => {
            res.json({ message: 'Product save successfully' });
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Product not saved' });
        }
    );
}

export function getProduct(req, res) {
    Product.find().then(
        (products) => {
            res.json(products);
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    );
}

export function deleteProduct(req, res) {
    if(req.user == null){
        res.status(401).json({ message: 'You need to login first' });
        return;
    }
    if(req.user.role !== 'admin'){
        res.status(403).json({ message: 'You are not authorized to delete products' });
        return;
    }

    Product.findOneAndDelete({ 
        productId: req.params.productId //postman eke url eke agata id eka dila delete karanawa
     }).then(
            () => {
                res.json({ message: 'Product deleted successfully' });
            }
        ).catch(
            (err) => {
                res.status(500).json({ message: 'Error deleting product' });
            }
        );
}

export function updateProduct(req, res) {
    if(req.user == null){
        res.status(401).json({ message: 'You need to login first' });
        return;
    }
    if(req.user.role !== 'admin'){
        res.status(403).json({ message: 'You are not authorized to update products' });
        return;
    }
    Product.findOneAndUpdate(
        { productId: req.params.productId },
        req.body,).then(
            () => {
                res.json({ message: 'Product updated successfully' });
            }
        ).catch(
            (err) => {
                res.status(500).json({ message: 'Error updating product' });
            }
        );
}