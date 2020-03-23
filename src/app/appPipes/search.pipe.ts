// import { PipeTransform, Pipe } from "@angular/core";
// @Pipe({
//   name: "filter"
// })
// export class searchPipe implements PipeTransform {
// transform(value: any, searchTerm: any): any {
//   return value.filter(search => {
//     return search.Country.indexOf(searchTerm) > 1;
//   });
// }
//   transform(value: any) {
//     console.log(value);
//   }
// }

import { Pipe } from "@angular/core";

@Pipe({ name: "filesize" })
export class FileSizePipe {}
