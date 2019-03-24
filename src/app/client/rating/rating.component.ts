import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

    @Input() rating: number;
    @Input() itemId: number;
    @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

    inputName: string;
    ngOnInit() {
        this.inputName = this.itemId + '_rating';
    }
    onClick(rating: number): void {
        this.rating = rating;
        this.ratingClick.emit({
            idUser: JSON.parse(localStorage.getItem('data')).user._id,
            itemId: this.itemId,
            star: rating
        });
    }

}
