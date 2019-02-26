import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { BehaviorSubject } from 'rxjs';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
type AOA = any[][];

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private src = new BehaviorSubject({});
  public progress = this.src.asObservable();


  constructor() { }

  public async importFromExcel(evt: any, headers: string[]) {

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot process multiple files');
    }

    const reader: FileReader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      reader.onload = (e: any) => {

        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // response
        resolve(<AOA>(XLSX.utils.sheet_to_json(ws, { header: headers })));
      };

      reader.onprogress = (e: any) => {
        const prog = Math.round(e.loaded / e.total * 100);
        this.src.next(prog);
      };

      reader.onloadend = () => {
        this.src.next(0);
        reader.abort();
      };

      reader.readAsBinaryString(target.files[0]);
    });
  }


  public exportAsExcelFile(json: any[], excelFileName: string, headers: any[], headerSequence: any = {}): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, ...headerSequence);
    const wscols = [];
    console.log(json);

    if (headers.length) {
      for (let i = 0; i < headers.length; i++) {
        const element = headers[i];
        worksheet[`${String.fromCharCode(65 + i)}1`] = { t: 's', v: element.name };
        wscols.push({ width: element.hasOwnProperty('width') ? element.width : 10 });
      }
    }

    worksheet['!cols'] = wscols;

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

}
