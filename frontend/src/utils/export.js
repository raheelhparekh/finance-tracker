// Import jsPDF and the autoTable plugin
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const exportToPDF = (transactions) => {
  try {
    const doc = new jsPDF();
    let currentY = 20;
    
    // Add title
    doc.setFontSize(20);
    doc.text('Financial Report', 20, currentY);
    currentY += 15;
    
    doc.setFontSize(12);
    // Add date
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, currentY);
    currentY += 15;

    // Add transactions
    doc.text('Transaction History', 20, currentY);
    currentY += 10;
    
    if (!transactions || transactions.length === 0) {
      doc.text('No transactions found.', 20, currentY);
    } else {
      // Use autoTable function directly
      autoTable(doc, {
        startY: currentY,
        head: [['Date', 'Description', 'Category', 'Amount', 'Type']],
        body: transactions.map(t => [
          new Date(t.date).toLocaleDateString(),
          t.description || 'N/A',
          t.category?.name || 'Uncategorized',
          `$${(t.amount || 0).toFixed(2)}`,
          t.type || 'N/A'
        ]),
      });
    }

    doc.save('financial-report.pdf');
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
    return false;
  }
};

export const exportToCSV = (transactions) => {
  try {
    if (!transactions || transactions.length === 0) {
      alert('No transactions to export.');
      return false;
    }

    const data = transactions.map(t => ({
      Date: new Date(t.date).toLocaleDateString(),
      Description: t.description || 'N/A',
      Category: t.category?.name || 'Uncategorized',
      Amount: t.amount || 0,
      Type: t.type || 'N/A'
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'transactions.csv');
    return true;
  } catch (error) {
    console.error('Error generating CSV:', error);
    alert('Failed to generate CSV. Please try again.');
    return false;
  }
};
