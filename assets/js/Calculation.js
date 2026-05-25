const materialRates = {
    basic: 1200,
    premium: 2200,
    luxury: 3800
};

const sqftInput = document.getElementById('sqft');
const materialType = document.getElementById('materialType');
const propertyType = document.getElementById('propertyType');
const spaceType = document.getElementById('spaceType');

function calculateQuote() {

    const sqft = parseInt(sqftInput.value) || 0;
    const material = materialType.value;

    const rate = materialRates[material];

    const total = sqft * rate;

    document.getElementById('totalAmount').innerText =
        '₹' + total.toLocaleString('en-IN');

    document.getElementById('summaryProperty').innerText =
        propertyType.value;

    document.getElementById('summarySpace').innerText =
        spaceType.value;

    document.getElementById('summaryMaterial').innerText =
        material.charAt(0).toUpperCase() + material.slice(1);

    document.getElementById('summarySqft').innerText =
        sqft + ' sqft';
}

sqftInput.addEventListener('input', calculateQuote);
materialType.addEventListener('change', calculateQuote);
propertyType.addEventListener('change', calculateQuote);
spaceType.addEventListener('change', calculateQuote);

calculateQuote();


const goToQuote = document.getElementById("goToQuote");

goToQuote.addEventListener("click", function (e) {

    e.preventDefault();

    const sqft = parseInt(sqftInput.value) || 0;

    const material = materialType.value;

    const rate = materialRates[material];

    const total = sqft * rate;

    const quoteData = {

        propertyType: propertyType.value,

        spaceType: spaceType.value,

        squareFeet: sqft,

        materialPackage:
            materialType.options[
                materialType.selectedIndex
            ].text,

        materialRate: rate,

        totalPrice: total

    };

    console.log(quoteData);

    localStorage.setItem(
        "interiorQuote",
        JSON.stringify(quoteData)
    );

    window.location.href = "quote-details.html";

});