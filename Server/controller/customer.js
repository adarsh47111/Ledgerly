import CustomerModel from '../model/customerModel.js';
import APIError from '../types/Error.js'

const createCustomer = async (req, res, next) => {
    const { name, email, phone, address } = req.body;
    const logged_user = req.user;


    if (!name || !email || !phone || !address) {
        throw new APIError('Please provide all required fields', 400);
    }

    const customer = await CustomerModel.findOne({ createdBy: logged_user, email: email });

    if (customer) {
        throw new APIError('Customer already exists', 400);
    }

    const newCustomer = await CustomerModel.create({
        createdBy: logged_user,
        name,
        email,
        phone,
        address
    });

    res.status(201).json({
        success: true,
        message: 'Customer created successfully',
        data: newCustomer
    });
}

const getCustomers = async (req, res, next) => {
    const logged_user = req.user;

    const customers = await CustomerModel.find({ createdBy: logged_user });

    res.status(200).json({
        success: true,
        data: customers
    });
}

const getCustomer = async (req, res, next) => {
    const { id } = req.params;
    const logged_user = req.user;

    const customer = await CustomerModel.findOne({ createdBy: logged_user, _id: id });

    if (!customer) {
        throw new APIError('Customer not found', 404);
    }

    res.status(200).json({
        success: true,
        data: customer
    });
}

const updateCustomer = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const logged_user = req.user;

    console.log(id);
    

    if (!name || !email || !phone || !address) {
        throw new APIError('Please provide all required fields', 400);
    }

    const customer = await CustomerModel.findOne({ createdBy: logged_user, _id: id });

    if (!customer) {
        throw new APIError('Customer not found', 404);
    }

    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;

    await customer.save();

    res.status(200).json({
        success: true,
        message: 'Customer updated successfully',
        data: customer
    });
}

const deleteCustomer = async (req, res, next) => {
    const { id } = req.params;
    const logged_user = req.user;

    const customer = await CustomerModel.findOneAndDelete({ createdBy: logged_user, _id: id });

    if (!customer) {
        throw new APIError('Customer not found', 404);
    }

    res.status(200).json({
        success: true,
        message: 'Customer deleted successfully'
    });
}

export { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer };