import { Injectable } from "@angular/core";

@Injectable()
export class NavbarService {

    private selectedSemester: string;

    public getSemester(): string {
        return this.selectedSemester;
    }

    public setSemester(newSemester: string){
        this.selectedSemester = newSemester;
    }
}