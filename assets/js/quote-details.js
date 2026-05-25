const savedData = JSON.parse(
    localStorage.getItem("interiorQuote")
);


// AUTO FILL

document.getElementById("propertyTypeDisplay").value =
    savedData.propertyType;

document.getElementById("spaceTypeDisplay").value =
    savedData.spaceType;

document.getElementById("squareFeetDisplay").value =
    savedData.squareFeet + " sqft";

document.getElementById("materialDisplay").value =
    savedData.materialPackage;

document.getElementById("totalDisplay").value =
    "₹" + Number(savedData.totalPrice).toLocaleString("en-IN");




// DOWNLOAD PDF

document
    .getElementById("downloadPDF")
    .addEventListener("click", function () {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // CUSTOMER DATA

        const customerName =
            document.getElementById("customerName").value;

        const customerPhone =
            document.getElementById("customerPhone").value;

        const customerEmail =
            document.getElementById("customerEmail").value;

        const customerLocation =
            document.getElementById("customerLocation").value;


        // HEADER

        doc.setFillColor(30, 30, 30);

        doc.rect(0, 0, 210, 35, "F");

        doc.setTextColor(255, 255, 255);

        doc.setFontSize(24);

        doc.text("INTERIOR QUOTATION", 20, 22);

        doc.setFontSize(11);

        doc.text("Shree Vinayaka Interiors", 20, 30);


        // RESET COLOR

        doc.setTextColor(0, 0, 0);


        // CUSTOMER DETAILS TABLE

        doc.setFontSize(16);

        doc.text("Customer Details", 14, 50);

        doc.autoTable({

            startY: 55,

            head: [["Field", "Details"]],

            body: [

                ["Customer Name", customerName],

                ["Phone Number", customerPhone],

                ["Email", customerEmail],

                ["Location", customerLocation]

            ],

            theme: "grid",

            headStyles: {
                fillColor: [40, 40, 40]
            },

            styles: {
                fontSize: 11
            }

        });


        // PROJECT DETAILS TABLE

        doc.text(
            "Project Details",
            14,
            doc.lastAutoTable.finalY + 15
        );

        const cleanMaterial =
            savedData.materialPackage
                .replace("₹", "Rs.")
                .replace("/sqft", " per sqft");

        doc.autoTable({

            startY: doc.lastAutoTable.finalY + 20,

            head: [["Item", "Value"]],

            body: [

                ["Property Type", savedData.propertyType],

                ["Space Type", savedData.spaceType],

                ["Square Feet", savedData.squareFeet + " sqft"],

                ["Material Package", cleanMaterial],

                [

                    "Estimated Cost",

                    "Rs. " +
                    Number(savedData.totalPrice)
                        .toLocaleString("en-IN")

                ]

            ],

            theme: "grid",

            headStyles: {
                fillColor: [40, 40, 40]
            },

            styles: {
                fontSize: 11
            }

        });


        // TERMS

        const finalY = doc.lastAutoTable.finalY + 8;

        doc.setFontSize(16);

        doc.text(
            "Terms & Conditions",
            14,
            finalY + 5
        );

        doc.setFontSize(10);

        let termsY = finalY + 15;

        const terms = [

            "1. This quotation is an approximate estimate based on the information provided by the customer. Actual project cost may vary depending on site conditions, material selection, design modifications, and execution requirements.",

            "2. Advance payments made towards design, customization, or material procurement are non-refundable once the project execution has commenced.",

            "3. Estimated project completion timelines are subject to uninterrupted workflow, material availability, and timely client approvals.",

            "4. Warranty covers only manufacturing defects and does not include damage caused by water leakage, mishandling, external impact, or natural wear and tear.",

            "5. This quotation is valid for 15 days from the date of issue and subject to revision thereafter.",

            "6. Any additional work requested outside the agreed project scope may involve additional charges."

        ];

        terms.forEach((term) => {

            const splitText = doc.splitTextToSize(term, 170);

            doc.text(splitText, 20, termsY);

            termsY += splitText.length * 6;

        });

        // doc.text(
        //     "• This quotation is valid for 15 days from the date of issue and subject to revision thereafter.",
        //     20,
        //     finalY + 60,
        //     { maxWidth: 170 }
        // );

        // doc.text(
        //     "• Advance payment confirmation is required before production and installation process begins.",
        //     20,
        //     finalY + 70,
        //     { maxWidth: 170 }
        // );

        // doc.text(
        //     "• Any additional work requested outside the agreed scope may involve extra charges.",
        //     20,
        //     finalY + 80,
        //     { maxWidth: 170 }
        // );


        // FOOTER

        doc.setFillColor(30, 30, 30);

        doc.rect(0, 280, 210, 17, "F");

        doc.setTextColor(255, 255, 255);

        doc.setFontSize(10);

        doc.text(
            "Thank you for choosing Shree Vinayaka Interiors",
            60,
            290
        );


        // DOWNLOAD

        doc.save("Interior-Quotation.pdf");

    });