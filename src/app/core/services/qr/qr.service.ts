import {Injectable} from "@angular/core";
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {

  constructor() {
  }

  public async generateQrByUrl(url: string): Promise<string> {
    try {
      const qrDataUrl: string = await QRCode.toDataURL(url, {
        scale: 5,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#00000000' // fondo transparente
        }
      });
      return qrDataUrl;
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      throw error; // importante: relanza el error si el llamador necesita manejarlo
    }
  }

}
