const obj = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
// Helper function to convert values from a given base to decimal
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

// Lagrange interpolation to find the constant term (c)
function lagrangeInterpolation(points) {
    let c = 0; // We are primarily interested in finding the constant term c.

    const n = points.length;
    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        // Calculate L_i(0) where L_i(x) is the Lagrange basis polynomial
        let Li = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                Li *= (0 - xj) / (xi - xj); // We're interested in L_i(0) specifically
            }
        }

        // Accumulate the contribution of the term to the constant
        c += yi * Li;
    }

    return c;
}

// Main function to handle reading the input and processing
function main() {



        const n = obj.keys.n; // Total number of points
        const k = obj.keys.k; // Minimum points required

        const points = [];

        // Iterate through each point and decode the base-encoded y values
        for (const key in obj) {
            if (key === "keys") continue; // Skip the "keys" object

            const x = parseInt(key); // The key itself is x
            const base = parseInt(obj[key].base); // The base in which y is encoded
            const value = obj[key].value; // The actual value of y

            const y = convertToDecimal(value, base); // Decode y from the given base

            points.push([x, y]); // Store the point (x, y)
        }

        // Ensure we have at least k points to interpolate
        if (points.length < k) {
            console.error("Insufficient points to interpolate. Need at least", k, "points.");
            return;
        }

        // Find the constant term 'c' using Lagrange interpolation
        const constantTerm = lagrangeInterpolation(points);

        console.log("The constant term (c) of the polynomial is:", constantTerm);
}

// Run the main function
main();
