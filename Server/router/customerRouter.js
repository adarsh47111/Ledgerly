import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from '../controller/customer.js';
const router = express.Router();

router.post('/', asyncHandler(createCustomer));
router.delete('/:id', asyncHandler(deleteCustomer));
router.put('/:id', asyncHandler(updateCustomer));
router.get('/', asyncHandler(getCustomers));
router.get('/:id', asyncHandler(getCustomer));


export default router;