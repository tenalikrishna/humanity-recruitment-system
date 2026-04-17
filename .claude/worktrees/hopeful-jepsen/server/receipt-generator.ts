import PDFDocument from "pdfkit";
import { Donation } from "@shared/schema";
import path from "path";
import fs from "fs";

const logoPath = path.join(process.cwd(), "attached_assets/Logos-2_1766932865392.png");
const signaturePath = path.join(process.cwd(), "attached_assets/Abhishek_Sign_-_Edited_1766932843660.png");

function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToWords(-num);

  let words = '';

  if (Math.floor(num / 10000000) > 0) {
    words += numberToWords(Math.floor(num / 10000000)) + ' Crore ';
    num %= 10000000;
  }

  if (Math.floor(num / 100000) > 0) {
    words += numberToWords(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }

  if (Math.floor(num / 1000) > 0) {
    words += numberToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    words += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }

  if (num > 0) {
    if (num < 20) {
      words += ones[num];
    } else {
      words += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        words += ' ' + ones[num % 10];
      }
    }
  }

  return words.trim() + ' Rupees Only';
}

function formatDate(dateInput: Date | string | null | undefined): string {
  if (!dateInput) {
    return formatDate(new Date());
  }
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    return formatDate(new Date());
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function getIdTypeLabel(idType: string): string {
  switch (idType) {
    case 'pan': return 'PAN';
    case 'aadhaar': return 'Aadhaar';
    case 'ration': return 'Ration Card';
    default: return 'ID';
  }
}

export function generateDonationReceipt(donation: Donation): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: 'A4',
        layout: 'landscape',
        margin: 40
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const primaryColor = '#3191c2';
      const goldColor = '#ffac00';
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const margin = 40;
      const contentWidth = pageWidth - (margin * 2);

      doc.rect(0, 0, pageWidth, 85).fill(primaryColor);
      
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, margin + 10, 15, { height: 55 });
      } else {
        doc.fontSize(28).font('Helvetica-Bold').fillColor('white')
          .text('HUManity', margin + 10, 20);
        doc.fontSize(10).font('Helvetica').fillColor(goldColor)
          .text('Humanity Uplifting Mankind', margin + 10, 50);
      }

      doc.fontSize(18).font('Helvetica-Bold').fillColor('white')
        .text('Humanity Uplifting Mankind Foundation', 220, 15, { align: 'center', width: contentWidth - 250 });
      doc.fontSize(10).font('Helvetica').fillColor('white')
        .text('Registered under section 8 companies act', 220, 40, { align: 'center', width: contentWidth - 250 });
      doc.fontSize(8).fillColor('white')
        .text('GF1, Kranti Nivas 2, Opp. Srujana School Road, PM Palem Last Bus Stop, Visakhapatnam 530041', 220, 55, { align: 'center', width: contentWidth - 250 });

      doc.fillColor('#333333');
      const contentTop = 100;

      const receiptNo = `HUM-${new Date().getFullYear()}-${donation.id.slice(0, 8).toUpperCase()}`;
      doc.fontSize(11).font('Helvetica-Bold')
        .text(`Receipt No: ${receiptNo}`, margin, contentTop);
      doc.text(`Date: ${formatDate(donation.createdAt)}`, pageWidth - margin - 150, contentTop);

      const formTop = contentTop + 40;
      const lineHeight = 35;
      const labelWidth = 120;

      doc.fontSize(10).font('Helvetica-Bold').text('Donated by:', margin, formTop);
      doc.font('Helvetica').text(donation.name, margin + labelWidth, formTop);
      doc.moveTo(margin + labelWidth, formTop + 12).lineTo(margin + 400, formTop + 12).stroke('#cccccc');

      doc.font('Helvetica-Bold').text('Email id:', margin, formTop + lineHeight);
      doc.font('Helvetica').text(donation.email, margin + labelWidth, formTop + lineHeight);
      doc.moveTo(margin + labelWidth, formTop + lineHeight + 12).lineTo(margin + 350, formTop + lineHeight + 12).stroke('#cccccc');

      doc.font('Helvetica-Bold').text('Phone:', margin + 380, formTop + lineHeight);
      doc.font('Helvetica').text(donation.phone, margin + 430, formTop + lineHeight);
      doc.moveTo(margin + 430, formTop + lineHeight + 12).lineTo(pageWidth - margin, formTop + lineHeight + 12).stroke('#cccccc');

      const amountNum = typeof donation.amount === 'string' ? parseFloat(donation.amount) : Number(donation.amount);
      const amountWholeRupees = Math.round(amountNum);
      
      doc.font('Helvetica-Bold').text('Amount Received:', margin, formTop + lineHeight * 2);
      doc.font('Helvetica').text(`₹${amountWholeRupees.toLocaleString('en-IN')}`, margin + labelWidth, formTop + lineHeight * 2);
      doc.moveTo(margin + labelWidth, formTop + lineHeight * 2 + 12).lineTo(margin + 250, formTop + lineHeight * 2 + 12).stroke('#cccccc');

      doc.font('Helvetica-Bold').text('In words:', margin + 280, formTop + lineHeight * 2);
      doc.font('Helvetica').text(numberToWords(amountWholeRupees), margin + 340, formTop + lineHeight * 2);
      doc.moveTo(margin + 340, formTop + lineHeight * 2 + 12).lineTo(pageWidth - margin, formTop + lineHeight * 2 + 12).stroke('#cccccc');

      const paymentTop = formTop + lineHeight * 3 + 10;

      doc.font('Helvetica-Bold').text('Mode of Payment:', margin, paymentTop);
      doc.font('Helvetica').text('Online', margin + labelWidth, paymentTop);
      doc.moveTo(margin + labelWidth, paymentTop + 12).lineTo(margin + 200, paymentTop + 12).stroke('#cccccc');

      doc.font('Helvetica-Bold').text('Transaction ID:', margin + 230, paymentTop);
      doc.font('Helvetica').text(donation.razorpayPaymentId || 'N/A', margin + 330, paymentTop);
      doc.moveTo(margin + 330, paymentTop + 12).lineTo(margin + 520, paymentTop + 12).stroke('#cccccc');

      doc.font('Helvetica-Bold').text(`${getIdTypeLabel(donation.idType)}:`, margin + 550, paymentTop);
      doc.font('Helvetica').text(donation.idNumber, margin + 600, paymentTop);

      const taxTop = paymentTop + 35;
      doc.font('Helvetica-Bold').text('80G tax exemption:', margin, taxTop);
      doc.rect(margin + 115, taxTop - 2, 30, 14).stroke(primaryColor);
      doc.fontSize(9).text('Yes', margin + 120, taxTop);
      doc.fontSize(10).text('/ No', margin + 145, taxTop);
      doc.font('Helvetica').text('If Yes, we declare that the donation to the organisation is exempt u/s 80G.', margin + 175, taxTop);

      const footerTop = taxTop + 40;
      doc.rect(margin, footerTop, contentWidth, 30).fill('#e8f4fc');
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#333333');
      doc.text('CIN: U85190AP2021NPL120322', margin + 20, footerTop + 10);
      doc.text('PAN CARD NUMBER: AAGCH0887D', margin + 220, footerTop + 10);
      doc.text('80G NUMBER: AAGCH0887DF20225', margin + 450, footerTop + 10);

      const confirmTop = footerTop + 45;
      doc.fontSize(10).font('Helvetica')
        .text('We hereby confirm that the aforementioned donation has been received by HUManity organisation, Visakhapatnam.', margin, confirmTop, { align: 'center', width: contentWidth });

      doc.fontSize(9)
        .text('In case of queries, reach out to us at contact@humanityorg.in or visit www.humanityorg.in', margin, confirmTop + 18, { align: 'center', width: contentWidth });

      const signatureTop = confirmTop + 35;
      if (fs.existsSync(signaturePath)) {
        doc.image(signaturePath, pageWidth - margin - 130, signatureTop, { height: 40 });
      }
      doc.fontSize(10).font('Helvetica-Bold')
        .text('Authorised Signature', pageWidth - margin - 130, signatureTop + 45);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
