import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { RoomService } from 'src/@http-service/room.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
    public markers: marker[];
    public dir:any;
    ngOnInit() {
        
    }

    constructor(private RoomService: RoomService, private route: ActivatedRoute){
        this.RoomService.laymangtoadolocation()
            .then((data) => {
                this.markers = data as marker[];
            })
            this.route.queryParams.subscribe(params => {
                this.dir = {
                    origin: { lat: Number(params['lat1']), lng: Number(params['lng1']) },
                    destination: { lat: Number(params['lat2']), lng: Number(params['lng2']) }
                  }
            });
            
    }

    // google maps zoom level
    zoom: number = 8;
    //10.808311,106.7063024
    // initial center position for the map
    lat: number = 10.808311;
    lng: number = 106.7063024;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: MouseEvent) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    // markers: marker[] = [
    //     {
    //         lat: 51.673858,
    //         lng: 7.815982,
    //         label: 'A',
    //         draggable: true
    //     },
    //     {
    //         lat: 51.373858,
    //         lng: 7.215982,
    //         label: 'B',
    //         draggable: false
    //     },
    //     {
    //         lat: 51.723858,
    //         lng: 7.895982,
    //         label: 'C',
    //         draggable: true
    //     }
    // ]

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
