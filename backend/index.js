const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const PORT = process.env.PORT || 8080;

// mongodb connection
// console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

// signup schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

// signup model
const userModel = mongoose.model("user", userSchema);

//API
app.get("/", (req, res) => {
  res.send("server is running");
});

// signup api
app.post("/signup", async (req, res) => {
  //   console.log(req.body);
  const { email } = req.body;
  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  } catch (err) {
    res.send({ message: "some issues occurs" });
  }
});

// login api
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userModel.findOne({ email: email });
    if (result && password === result.password) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      //   console.log(dataSend);
      res.send({ message: "Login Successfully", alert: true, data: dataSend });
    } else {
      res.send({
        message: "check your email and password",
        alert: false,
      });
    }
  } catch (err) {
    console.log("invalid");
  }
});

// product schema
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

// product modal
const productModel = mongoose.model("product", productSchema);

// upload product in data-base api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body);
  const data = await productModel(req.body);
  const dataSave = await data.save();
  res.send({ message: "Your product have uploaded successfully" });
});

// get product from db api
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

// payment get-way

// console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/checkout-payment", async (req, res) => {
  // console.log("body data", req.body);
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NrEQxSACskp9GIg2GYepGRe" }],
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };
    const session = await stripe.checkout.sessions.create(params);
    // console.log("session", session);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.listen(PORT, () => {
  console.log("server is running at port : " + PORT);
});
