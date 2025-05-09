import html2canvas from "html2canvas";
import React, { useRef } from "react";
import QRCode from "react-qr-code";

const employees = [
  {
    id: "0000000001",
    name: "Alice",
    dept: "HR",
    extraDetails: "Manager",
    email: "alice@company.com",
    phone: "123-456-7890",
  },
  {
    id: "0000000002",
    name: "Bob",
    dept: "Engineering",
    extraDetails: "Senior Engineer",
    email: "bob@company.com",
    phone: "987-654-3210",
  },
  {
    id: "0000000003",
    name: "Charlie",
    dept: "Sales",
    extraDetails: "Sales Lead",
    email: "charlie@company.com",
    phone: "555-555-5555",
  },
];

// Hidden printable QR component
const PrintableQR = React.forwardRef(({ employee }, ref) => {
  const qrData = `
    ID: ${employee.id}
    Name: ${employee.name}
    Department: ${employee.dept}
    Role: ${employee.extraDetails}
    Email: ${employee.email}
    Phone: ${employee.phone}
  `;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        background: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <QRCode value={qrData} size={200} />
      <p>{employee.id}</p> {/* Only show ID here */}
    </div>
  );
});

const EmployeeQRList = () => {
  const qrRefs = useRef(employees.map(() => React.createRef())); // Store refs for each QR

  const handlePrint = async (index) => {
    const element = qrRefs.current[index]?.current; // Access the current ref
    if (!element) {
      console.error("QR element is not available.");
      return;
    }

    const canvas = await html2canvas(element);
    const imageURL = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code for ID: ${employees[index].id}</title>
          <style>
            body { text-align: center; font-family: sans-serif; margin-top: 40px; }
            img { width: 400px; height: 400px; }
          </style>
        </head>
        <body>
          <img src="${imageURL}" />
         
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Employee QR List</h1>

      {employees.map((employee, index) => (
        <div key={employee.id} className="flex items-center gap-4">
          <div className="flex-1">
            <p>
              <strong>{employee.id}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePrint(index)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Print QR
            </button>
          </div>
        </div>
      ))}

      {/* Render Printable QR elements */}
      {employees.map((employee, index) => (
        <PrintableQR
          key={employee.id}
          employee={employee}
          ref={qrRefs.current[index]}
        />
      ))}
    </div>
  );
};

export default EmployeeQRList;
