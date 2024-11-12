import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/userModel.js";
import fs from "fs";

const createUser = asyncHandler(async (req, res) => {
    // get data from req.body
    const { name, email, dob } = req.body;

    // validate data
    if (!name || !email || !dob ) {
        return res.status(400).json(new ApiResponse(400, null, "Please provide all required fields."));
    }

    // get avatar from req.file
    const avatar = req.file.filename;

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        // delete avatar
        fs.unlinkSync(req.file.path);
        return res.status(400).json(new ApiResponse(400, null, "User already exists."));
    }
    
    // validate avatar
    if (!avatar) {
        return res.status(400).json(new ApiResponse(400, null, "Please provide an avatar."));
    }
    
    // create user
    const newUser = await User.create({ name, email, dob, avatar });

    // validate user creation
    if (!newUser) {
        return res.status(400).json(new ApiResponse(400, null, "User not created."));
    }

    // send response
    return res.status(201).json(new ApiResponse(201, newUser, "User created successfully."));
});

const getUser = asyncHandler(async (req, res) => {
    // get user id from params
    const { userId } = req.params;

    // get user
    const user = await User.findById(userId);

    // validate user
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found."));
    }

    // send response
    return res.status(200).json(new ApiResponse(200, user, "User found successfully."));
});

const getAllUsers = asyncHandler(async (req, res) => {
    // get users
    const users = await User.find();

    // validate users
    if (!users) {
        return res.status(404).json(new ApiResponse(404, null, "Users not found."));
    }

    // send response
    return res.status(200).json(new ApiResponse(200, users, "Users found successfully."));
});

export { createUser, getUser, getAllUsers };
