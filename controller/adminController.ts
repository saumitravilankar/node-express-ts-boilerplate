import expressAsyncHandler from "express-async-handler";
// import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import { Admin } from "../models/adminModel";
import { Request, Response } from "express";

// Get list of all admins
const getAdmins = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find({});
    if (admins) {
      res.status(200).json({
        admins,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error fetching admin data");
  }
});

// Add new admin entry
const registerAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, phonenumber, isEnable, role } = req.body;
    if (!name || !email || !phonenumber || !isEnable || !role) {
      res.status(400);
      throw new Error(`All fields are mandatory.`);
    }

    // Find admin with existing email
    const existingEmail = await Admin.findOne({
      email,
    });
    if (existingEmail) {
      res.status(400);
      throw new Error(`Email already in use, please enter a new email.`);
    }
    const existingPhonenumber = await Admin.findOne({
      phonenumber,
    });

    // Find admin with existing phone number
    if (existingPhonenumber) {
      res.status(400);
      throw new Error(
        `Phone number already in use, please enter a new phone number.`
      );
    }
    const admin = await Admin.create({
      name,
      email,
      phonenumber,
      isEnable,
      role,
    });
    if (admin) {
      res.status(201).json({ _id: admin.id, email: admin.email });
    } else {
      res.status(400);
      throw new Error("Error creating admin");
    }
  }
);

// Update the admin/employee
const updateAdmin = expressAsyncHandler(async (req: Request, res: Response) => {
  const { id, name, email, phonenumber, isEnable, role } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Admin id is required.");
  }

  // Find admin with existing email
  const existingEmailAdmin = await Admin.findOne({
    email,
  });
  if (existingEmailAdmin && existingEmailAdmin._id.toString() !== id) {
    res.status(400);
    throw new Error("Email already in use, please enter a new email.");
  }

  // Find admin with existing phone number
  const existingPhonenumberAdmin = await Admin.findOne({ phonenumber });
  if (
    existingPhonenumberAdmin &&
    existingPhonenumberAdmin._id.toString() !== id
  ) {
    res.status(400);
    throw new Error(
      "Phone number already in use, please enter a new phone number."
    );
  }

  // Update admin details
  const admin = await Admin.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phonenumber,
      isEnable,
      role,
    },
    { new: true }
  );

  if (admin) {
    res.status(200).json({
      admin,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found.");
  }
});

// Delete the admin
const deleteAdmin = expressAsyncHandler(async (req: Request, res: Response) => {
  const adminId = req.params.id;
  if (!adminId) {
    res.status(400);
    throw new Error(`Admin Id not found in params`);
  }

  const admin = await Admin.findById(adminId);

  if (!admin) {
    res.status(400);
    throw new Error(`Admin not found`);
  } else {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (deletedAdmin) {
      res.status(200).json({ message: `${admin.role} deleted successfully` });
    }
  }
});

export { getAdmins, registerAdmin, updateAdmin, deleteAdmin };
