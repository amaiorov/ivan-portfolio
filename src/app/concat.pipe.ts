import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
   name : 'concat'
})
export class ConcatPipe implements PipeTransform {
   transform(val) {
     return typeof val === 'string' ? val : val.join('\n');
   }
 }
