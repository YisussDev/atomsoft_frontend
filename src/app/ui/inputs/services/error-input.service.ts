import {Injectable} from "@angular/core";
import {dictionaryEs} from "../dictionaries/dictionary-es";
import {dictionaryEn} from "../dictionaries/dictionary-en";

@Injectable({providedIn: 'root'})
export class ErrorInputService {

  private language: string = 'es';
  private dictionary!: { [key: string]: { expressable: boolean; message: string } };

  constructor() {
    this.initDictionary();
  }

  private initDictionary(): void {
    if (this.language == 'es') {
      this.dictionary = dictionaryEs;
    }
    if (this.language == 'en') {
      this.dictionary = dictionaryEn;
    }
  }

  public extractErrorFromDictionary(errors: any): string {
    const errorActual = Object.keys(errors)[0];
    let wordConstruct: string = this.dictionary[errorActual].message;
    if (this.dictionary[errorActual].expressable) {
      if (errors[errorActual][errorActual]) {
        wordConstruct = wordConstruct + ` ${errors[errorActual][errorActual]}`
      } else {
        wordConstruct = wordConstruct + ` ${errors[errorActual]}`
      }
    }
    return wordConstruct;
  }

}
