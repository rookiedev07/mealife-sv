import React from "react";

function Price() {
    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Price and Budget</h1>
            <p className="text-lg text-center mb-4">Recommended Price</p>

            <div>
                <label className="inline-flex items-center border border-black rounded-lg px-4 py-2 cursor-pointer mb-2">
                    <input type="radio" id="price-range" name="price" value="$0 to $15" className="mr-2" />
                    $0 to $15
                </label>
            </div>
            <div>
                <label className="inline-flex items-center border border-black rounded-lg px-4 py-2 cursor-pointer mb-2">
                    <input type="radio" id="price-range" name="price" value="$15 to $25" className="mr-2" />
                    $15 to $25
                </label>
            </div>
            <div>
                <label className="inline-flex items-center border border-black rounded-lg px-4 py-2 cursor-pointer mb-2">
                    <input type="radio" name="price" id="price-range" value="$25 to $40" className="mr-2" />
                    $25 to $40
                </label>
            </div>
            <div>
                <label className="inline-flex items-center border border-black rounded-lg px-4 py-2 cursor-pointer mb-4">
                    <input type="radio" name="price" id="price-range" value="$40+" className="mr-2" />
                    $40+
                </label>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Under 10$</h2>
                <div className="flex gap-8 mt-4">
                    <div className="w-64 h-64 bg-cover bg-center rounded-xl cursor-pointer" style={{ backgroundImage: "url('../src/assets/coffee.jpg')" }}>
                        <h1 className="text-white text-xl font-medium absolute bottom-4 left-4">Coffee & Tea</h1>
                    </div>
                    <div className="w-64 h-64 bg-cover bg-center rounded-xl cursor-pointer" style={{ backgroundImage: "url('../src/assets/desserts.jpg')" }}>
                        <h1 className="text-white text-xl font-medium absolute bottom-4 left-4">Desserts</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Price;
