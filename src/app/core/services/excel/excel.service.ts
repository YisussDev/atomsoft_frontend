import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {

  constructor() {
  }

  public exportToExcel(data: any[], filename: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, filename);
  }

  private saveAsExcelFile(buffer: any, filename: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  public base64ToArrayBuffer(base64: string) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  public base64ToExcel(base64Data: string, fileName: string) {
    let arrayBuffer = this.base64ToArrayBuffer(base64Data);
    let data = new Blob([arrayBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

    // Crear un enlace para descargar el archivo Excel
    let url = window.URL.createObjectURL(data);
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(function () {
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  public generateCSV(fileCharged: File): Promise<any> {
    const fileName = fileCharged.name.split('.')[0];
    return fileCharged.arrayBuffer()
      .then((res: any) => {
        let data = new Uint8Array(res);
        let workbook = XLSX.read(data, {type: 'array'});
        let csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
        let blob = new Blob([csv], {type: 'text/csv'});
        let hiddenElement = document.createElement('a');
        hiddenElement.href = URL.createObjectURL(blob);
        hiddenElement.target = '_blank';
        hiddenElement.download = fileName + '.csv';
        hiddenElement.click();
        hiddenElement.remove();
      });
  }

  public convertToCsv(fileCharged: File): any {
    return fileCharged.arrayBuffer().then(res => {
      const fileName = fileCharged.name.split('.')[0];
      let data = new Uint8Array(res);
      let workbook = XLSX.read(data, {type: 'array'});
      let csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
      let blob = new Blob([csv], {type: 'text/csv'});
      let newFile = new File([blob], fileName, {type: 'text/csv'});
      return newFile;
    })
  }

  public downloadExcel(data: { data: any[]; nameSheet: string }[], filename: string): void {

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    const nameSheet: string = data[0].nameSheet;

    for (let sheet of data) {
      XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(sheet.data), sheet.nameSheet);
    }

    const excelBuffer: any = XLSX.write(book, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    // Limpiar el objeto URL creado para liberar memoria
    window.URL.revokeObjectURL(link.href);
  }

  public downloadExcelBeta(data: { data: any[]; nameSheet: string }[], filename: string): void {
    const book: XLSX.WorkBook = XLSX.utils.book_new();

    for (let sheet of data) {
      // Eliminar la fila de encabezados (el primer objeto)
      const modifiedData = sheet.data.slice(1); // Excluye el primer elemento

      // Convertir los datos modificados a una hoja sin encabezado
      const worksheet = XLSX.utils.json_to_sheet(modifiedData, {skipHeader: true});

      // Añadir la hoja al libro
      XLSX.utils.book_append_sheet(book, worksheet, sheet.nameSheet);
    }

    const excelBuffer: any = XLSX.write(book, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // Limpiar el objeto URL creado para liberar memoria
    window.URL.revokeObjectURL(link.href);
  }


}
