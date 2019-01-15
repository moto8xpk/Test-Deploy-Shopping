import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class EncodeService {

  constructor() { }

  encodeAsciiPassword(password: string) {
    return Md5.hashAsciiStr(password).toString();
  }
  encodeNormalPassword(password: string) {
    return Md5.hashStr(password).toString();
  }
  compareAsciiPassword() {

  }

  compareNormalPassword() {

  }
}
