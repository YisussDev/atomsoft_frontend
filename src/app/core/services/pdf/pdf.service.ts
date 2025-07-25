import {Injectable} from "@angular/core";
import {PDFDocument} from 'pdf-lib';

@Injectable()
export class PdfService {

  public async generateVoucher(
    base64ImageData: string,
    fileName: string,
    options?: { paddingX?: number; paddingY?: number }
  ): Promise<void> {
    try {
      // 1. Cargar plantilla base del voucher
      const existingPdfBytes = await fetch('/assets/files/voucher/base_voucher.pdf')
        .then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPages()[0];

      // 2. Validar entrada
      if (!base64ImageData.startsWith('data:image/')) {
        throw new Error('El dato proporcionado no es una imagen base64 válida.');
      }

      // 3. Obtener dimensiones del PDF
      const { width: pdfWidth, height: pdfHeight } = page.getSize();

      // 4. Insertar imagen
      const image = await pdfDoc.embedPng(base64ImageData);
      const imgDims = image.scale(1); // dimensiones originales del PNG

      // 5. Padding configurables
      const paddingX = options?.paddingX ?? 0;
      const paddingY = options?.paddingY ?? 0;

      const availableWidth = pdfWidth - 2 * paddingX;
      const availableHeight = pdfHeight - 2 * paddingY;

      // 6. Calcular escala para mantener aspecto sin exceder espacio disponible
      const widthRatio = availableWidth / imgDims.width;
      const heightRatio = availableHeight / imgDims.height;
      const scaleFactor = Math.min(widthRatio, heightRatio, 1); // no escalar más grande

      const imgWidth = imgDims.width * scaleFactor;
      const imgHeight = imgDims.height * scaleFactor;

      // 7. Centrar imagen dentro del área disponible
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      page.drawImage(image, {
        x,
        y,
        width: imgWidth,
        height: imgHeight,
      });

      // 8. Guardar y descargar PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    } catch (error) {
      console.error('Error al generar el voucher PDF:', error);
    }
  }



}
