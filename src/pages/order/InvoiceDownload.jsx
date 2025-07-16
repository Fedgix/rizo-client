import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './Invoice';

const InvoiceDownload = ({ order }) => {
  return (
    <PDFDownloadLink
      document={<InvoicePDF order={order} />}
      fileName={`invoice_${order.orderNumber}.pdf`}
      style={{
        textDecoration: 'none',
        padding: '10px',
        color: '#fff',
        backgroundColor: '#000',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Generating PDF...' : 'Download Invoice'
      }
    </PDFDownloadLink>
  );
};

export default InvoiceDownload;