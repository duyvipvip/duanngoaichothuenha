import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})

export class StatusPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if(value == 0){
            return 'Đang Đợi Xác Nhận'
        }else if(value == 1){
            return 'Xác Nhận'
        }else if(value == 2){
            return 'Từ Chối'
        }
    }
}