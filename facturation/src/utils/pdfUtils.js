export const saveAsPDF = (selectedInvoice, componentRef) => {
  if (!selectedInvoice) {
    alert('Veuillez sélectionner un document à enregistrer en PDF.');
    return;
  }
  
  // Create a temporary window for PDF with exact view mode styling
  const printWindow = window.open('', '_blank');
  const invoiceHTML = componentRef.current.outerHTML;
  
  // Get computed styles from the actual view mode elements
  const header = componentRef.current.querySelector('.header');
  const title = componentRef.current.querySelector('.facture-title');
  const tableHeaders = componentRef.current.querySelectorAll('.items-table th');
  const totalsSection = componentRef.current.querySelector('.totals-bank-section');
  const paymentInfo = componentRef.current.querySelector('.payment-info');
  const yellowSquare = componentRef.current.querySelector('.yellow-square-top');
  const decorativeSquare = componentRef.current.querySelector('.footer .decorative-square');
  
  const headerStyles = header ? window.getComputedStyle(header) : {};
  const titleStyles = title ? window.getComputedStyle(title) : {};
  const totalsStyles = totalsSection ? window.getComputedStyle(totalsSection) : {};
  const paymentStyles = paymentInfo ? window.getComputedStyle(paymentInfo) : {};
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${selectedInvoice.document_type}_${selectedInvoice.invoice_number}</title>
        <meta charset="UTF-8">
        <style>
          /* Copy all existing styles */
          ${Array.from(document.styleSheets)
            .map(sheet => {
              try {
                return Array.from(sheet.cssRules).map(rule => rule.cssText).join('');
              } catch (e) {
                return '';
              }
            })
            .join('')}
          
          /* Enhanced PDF-specific styles to match view mode exactly */
          @page {
            size: A4;
            margin: 0.5in;
          }
          
          body { 
            background: white !important; 
            margin: 0; 
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .invoice-container { 
            background: white !important; 
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 0 !important;
            max-width: none !important;
            width: 100% !important;
          }
          
          /* Header styles */
          .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            background-image: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            color: white !important;
            border: 1px solid #2c3e50 !important;
            border-radius: 8px !important;
            padding: 15px 30px !important;
            margin: 0 25px 20px 25px !important;
            position: relative !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .header * {
            color: white !important;
          }
          
          /* Title styles */
          .facture-title {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            background-image: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            color: white !important;
            border: 2px solid #ffd700 !important;
            border-radius: 8px !important;
            padding: 12px 20px !important;
            margin: 0 25px 20px 25px !important;
            text-align: center !important;
            font-size: 24px !important;
            font-weight: bold !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Table header styles */
          .items-table th {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            background-image: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            color: white !important;
            border: 1px solid #2c3e50 !important;
            padding: 8px 12px !important;
            font-weight: bold !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Totals section styles */
          .totals-bank-section {
            background: linear-gradient(135deg, #f8f9fa 0%, #e8e8e8 100%) !important;
            background-image: linear-gradient(135deg, #f8f9fa 0%, #e8e8e8 100%) !important;
            border: 1px solid #dee2e6 !important;
            border-radius: 8px !important;
            padding: 15px 20px !important;
            margin: 15px 25px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Payment info styles */
          .payment-info {
            background: linear-gradient(135deg, #fff8dc 0%, #ffe4b5 100%) !important;
            background-image: linear-gradient(135deg, #fff8dc 0%, #ffe4b5 100%) !important;
            border: 1px solid #ffd700 !important;
            border-radius: 8px !important;
            padding: 12px 15px !important;
            margin: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .payment-info h2 {
            color: #2c3e50 !important;
            border-bottom: 2px solid #ffd700 !important;
            margin-bottom: 10px !important;
            font-size: 16px !important;
          }
          
          .payment-info p {
            color: #2c3e50 !important;
            margin: 5px 0 !important;
            font-size: 14px !important;
          }
          
          /* Decorative elements */
          .yellow-square-top { 
            background: #ffd700 !important;
            width: 20px !important;
            height: 20px !important;
            position: absolute !important;
            top: -10px !important;
            right: 15px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .footer .decorative-square {
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%) !important;
            background-image: linear-gradient(135deg, #3498db 0%, #2980b9 100%) !important;
            width: 8px !important;
            height: 100% !important;
            max-height: 50px !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            border-radius: 8px 0 0 8px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Page boundary constraints */
          .invoice-container {
            max-width: 210mm !important;
            max-height: 297mm !important;
            margin: 0 auto !important;
            padding: 10mm !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
          }
          
          /* Compact all sections */
          .header {
            margin-bottom: 10px !important;
            padding: 10px 20px !important;
          }
          
          .facture-title {
            margin: 10px 25px !important;
            padding: 8px 15px !important;
          }
          
          .invoice-details {
            margin: 15px 25px !important;
            padding: 10px !important;
          }
          
          .items-table {
            margin: 15px 25px !important;
          }
          
          .items-table th,
          .items-table td {
            padding: 6px 8px !important;
            font-size: 13px !important;
          }
          
          .totals-bank-section {
            margin: 15px 25px 10px 25px !important;
            padding: 8px !important;
          }
          
          /* Ensure footer doesn't overflow */
          .footer {
            position: relative !important;
            overflow: hidden !important;
            margin: 10px 25px 5px 25px !important;
            padding: 8px 15px !important;
            font-size: 12px !important;
            page-break-inside: avoid !important;
          }
          
          /* Hide non-print elements */
          .no-print { 
            display: none !important; 
          }
          
          /* Force single page layout */
          @page {
            size: A4 !important;
            margin: 15mm !important;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Limit table height */
          .items-table tbody {
            max-height: 200px !important;
            overflow: hidden !important;
          }
          
          .items-table tbody tr:nth-child(n+6) {
            display: none !important;
          }
          
          /* Force all colors to print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        </style>
      </head>
      <body>
        ${invoiceHTML}
        <script>
          // Force color preservation after load
          setTimeout(() => {
            document.querySelectorAll('*').forEach(el => {
              el.style.setProperty('-webkit-print-color-adjust', 'exact', 'important');
              el.style.setProperty('print-color-adjust', 'exact', 'important');
              el.style.setProperty('color-adjust', 'exact', 'important');
            });
          }, 100);
        </script>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  
  // Wait for styles to load then print
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};

