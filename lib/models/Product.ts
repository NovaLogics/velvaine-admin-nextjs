import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    collections: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    sizes: {
      type: [String],
      required: false,
    },
    colors: {
      type: [String],
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: {
        type: mongoose.Schema.Types.Decimal128,
        get: (value: mongoose.Schema.Types.Decimal128) => {
          return parseFloat(value.toString());
        },
      },
      required: true,
    },
    expense: {
      type: {
        type: mongoose.Schema.Types.Decimal128,
        get: (value: mongoose.Schema.Types.Decimal128) => {
          return parseFloat(value.toString());
        },
      },
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { getters: true } }
);


const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;