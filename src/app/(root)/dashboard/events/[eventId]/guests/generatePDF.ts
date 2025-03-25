import { jsPDF } from 'jspdf';
import { EventUsers } from './types';

export const generateGuestListPDF = (eventUsers: EventUsers) => {
  const doc = new jsPDF();
  doc.setFontSize(24);
  doc.setTextColor('#000000');
  doc.text('Guest List', 20, 20);
  doc.setFontSize(12);
  doc.setTextColor('#666666');
  doc.text('Name', 20, 40);
  doc.text('Email', 80, 40);
  doc.text('Status', 160, 40);
  if (eventUsers.OWNER.length > 0 || eventUsers.MEMBER.length > 0) {
    let yPosition = 50;
    eventUsers.OWNER.forEach((user) => {
      const email = user.userProfile.email || `${user.userProfile.name}@gmail.com`;
      doc.setTextColor('#000000');
      doc.text(user.userProfile.name, 20, yPosition);
      doc.text(email, 80, yPosition);
      doc.text('Owner', 160, yPosition);
      yPosition += 10;
    });
    eventUsers.MEMBER.forEach((user) => {
      const email = user.userProfile.email || `${user.userProfile.name}@gmail.com`;
      doc.setTextColor('#000000');
      doc.text(user.userProfile.name, 20, yPosition);
      doc.text(email, 80, yPosition);
      doc.text(user.registrationStatus || 'Pending', 160, yPosition);
      yPosition += 10;
    });
  } else {
    doc.setTextColor('#666666');
    doc.text('No guests have been added yet.', 20, 50);
  }

  doc.save('guest-list.pdf');
};