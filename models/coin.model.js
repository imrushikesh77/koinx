import mongoose from "mongoose";

const coinSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
        trim: true
    },
    "marketCap": {
        type: Number,
        required: true
    },
    "currentPrice": {
        type: Number,
        required: true
    },
    "pastPrice": [
        {
            price: {
                type: Number,
                required: true
            },
            dateTime: {
                type: Date,
                required: true,
            },
        }
    ],
    "24hChange": {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Coin = mongoose.model("Coin", coinSchema);

export default Coin;
    