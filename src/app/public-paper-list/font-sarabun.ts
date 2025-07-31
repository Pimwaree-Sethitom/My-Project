import jsPDF from 'jspdf';

export function registerSarabunFont() {
  (jsPDF as any).addFileToVFS("Sarabun-Regular.ttf", "AAEAAAATAQAABAAw...");
  (jsPDF as any).addFont("Sarabun-Regular.ttf", "Sarabun", "normal");
}