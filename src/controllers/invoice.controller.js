import { Invoice  } from "../models/invoice.model.js";
import { Course } from "../models/course.model.js"; 
import { User } from "../models/user.model.js";

import {ayncHandler} from "../middleware/async.js";
import { ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// creare a invoice 
const createInvoice = asyncHandler(async (req, res) => {});

// delete a invoice 
const deleteInvoice = asyncHandler(async (req, res) => {});

export {
    createInvoice,
    deleteInvoice
}