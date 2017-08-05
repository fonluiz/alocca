import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class NavbarService {
    /**
     * Selected semester.
     */
    semesterSelected: EventEmitter<string> = new EventEmitter();

    /**
    * Provide a reference for the emitter of the current selected semester.
    * 
    * @returns {EventEmitter<string>}
    */
    public getSemesterSelectedEmitter(): EventEmitter<string> {
        return this.semesterSelected;
    }

    /**
    * 
    * @param semester 
    * Selected semester to be emitted.
    */
    public emitSemesterSelected(semester: string){
        this.semesterSelected.emit(semester)
    }
}