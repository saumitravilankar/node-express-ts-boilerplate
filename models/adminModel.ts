import mongoose, { Document, Schema } from "mongoose";

enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  EMPLOYEE = "EMPLOYEE",
}

interface Admin extends Document {
  name: string;
  email: string;
  phonenumber: string;
  password: string;
  isEnable: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema<Admin> = new Schema<Admin>(
  {
    name: {
      type: String,
      required: [true, `Please add name of admin`],
    },
    email: {
      type: String,
      unique: true,
      required: [true, `Please add email of admin`],
    },
    password: {
      type: String,
      required: [true, `Please add password`],
    },
    phonenumber: {
      type: String,
      unique: true,
      required: [true, `Please add phone number of admin`],
    },
    isEnable: {
      type: Boolean,
      default: true,
      required: [true, "Please send isEnabled value"],
    },
    role: {
      type: String,
      enum: Object.values(Role),
      require: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model<Admin>("Admin", AdminSchema);

export { Admin, Role };
