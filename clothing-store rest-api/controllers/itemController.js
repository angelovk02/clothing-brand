const itemModel = require('../models/itemModel');
const userModel = require('../models/userModel')


// function getAllItems(req, res, next) {
//     itemModel.find()
//         .then(items => res.json(items))
//         .catch(next);
// }

function getUser(req, res, next) {
    const userEmail = req.body
    userModel.findOne({ email: userEmail })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(next)
}

function addToCart(req, res, next) {
    const { userEmail, itemId } = req.body;
    userModel.findOneAndUpdate(
        { email: userEmail },
        { $push: { cart: itemId } },
        { new: true }
    )
        .then((user) => {

            return res.status(200).json(user)
        })
        .catch(next)
}


function addItem(req, res, next) {
    const { id, name, image, category, price } = req.body;


    itemModel.create({ id, name, image, category, price })
        .then(item => res.status(200).json(item))
        .catch(next);
}

function findHoodies(req, res, next) {
    itemModel.find({ category: 'hoodies' })
        .then(items => res.json(items))
        .catch(next);
}

function findPants(req, res, next) {
    itemModel.find({ category: 'pants' })
        .then(items => res.json(items))
        .catch(next);
}

function findTshirts(req, res, next) {
    itemModel.find({ category: 't-shirts' })
        .then(items => res.json(items))
        .catch(next);
}


const getUserCartItemsIds = (userEmail) => {
    return userModel.findOne({ email: userEmail })
        .select('cart')
        .exec()
        .then(user => {
            return user.cart;
        });
};


const getAllCartItems = (cartItemIds) => {
    return itemModel.find({ id: { $in: cartItemIds } })
        .exec()
        .then(items => {
            return items;
        });
};

function findUserItems(req, res, next) {

    const { email: userEmail } = req.user;
    getUserCartItemsIds(userEmail)
        .then(cartItemIds => {
            return getAllCartItems(cartItemIds);
        })
        .then(cartItems => {
            return res.status(200).json(cartItems);
        })
        .catch(next)
}


const removeItemFromCart = (userEmail, itemIdToRemove) => {
    return userModel
        .findOneAndUpdate(
            { email: userEmail },
            { $pull: { cart: itemIdToRemove } },
            { new: true }
        )
        .exec()
        .then(updatedUser => {
            return updatedUser;
        });
};


function removeFromCartHandler(req, res, next) {
    const { email: userEmail } = req.user;
    const itemIdToRemove = req.params.itemId;

    removeItemFromCart(userEmail, itemIdToRemove)
        .then(updatedUser => {
            return res.status(200).json(updatedUser.cart);
        })
        .catch(next);
}

function placeOrder(req, res, next) {
    const { email: userEmail } = req.user;
    const { city, address } = req.body;

    getUserCartItemsIds(userEmail)
        .then(cartItemIds => {
            return Promise.all([
                moveCartItemsToBoughtItems(userEmail, cartItemIds),
                updateUserDeliveryInfo(userEmail, { city, address }),
                clearUserCart(userEmail)
            ]);
        })
        .then(() => {
            return res.status(200).json({ message: 'Order placed successfully!' });
        })
        .catch(next);
}

function moveCartItemsToBoughtItems(userEmail, cartItemIds) {
    return userModel.findOneAndUpdate(
        { email: userEmail },
        { $push: { boughtItems: { $each: cartItemIds } } },
        { new: true }
    ).exec();
}

function updateUserDeliveryInfo(userEmail, deliveryInfo) {
    return userModel.findOneAndUpdate(
        { email: userEmail },
        { $set: { deliveryInfo } },
        { new: true }
    ).exec();
}

function clearUserCart(userEmail) {
    return userModel.findOneAndUpdate(
        { email: userEmail },
        { cart: [] },
        { new: true }
    ).exec();
}


function updateItem(req, res, next) {
    const itemId = req.params.itemId
    console.log(itemId)
    const updatedItem = req.body

    itemModel.findOneAndUpdate({ id: itemId }, updatedItem, { new: true }, (err, item) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ error: 'Error updating item.' });
        }

        if (!item) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        return res.json(item);
    });
}

function deleteItem(req, res, next) {
    const itemId = req.params.itemId;

    itemModel.findOneAndDelete({ id: itemId }, (err, item) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Error deleting item.' });
        }

        if (!item) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        return res.json({ message: 'Item deleted successfully.' });
    });
}

module.exports = {
    addItem,
    findHoodies,
    findPants,
    findTshirts,
    addToCart,
    getUser,
    findUserItems,
    removeFromCartHandler,
    placeOrder,
    updateItem,
    deleteItem

}
