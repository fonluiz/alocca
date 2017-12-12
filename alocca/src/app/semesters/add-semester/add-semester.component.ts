import { Component, OnInit } from '@angular/core';
import { SemestersDmService } from '../../data-manager/semesters/semesters-dm.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Semester } from '../semester.model';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-add-semester',
    templateUrl: './add-semester.component.html',
    styleUrls: ['./add-semester.component.css']
})
export class AddSemesterComponent implements OnInit {

    MAX_YEAR: number;
    years: number[];
    halves: number[];
    year: number;
    half: number;
    SAVED_SUCCESSFULLY_MESSAGE: string = "Semestre criado com sucesso!";
    TIMEOUT_SAVED_MESSAGE: number = 2500;

    constructor(
        private semesterDmService: SemestersDmService,
        private snackService: SnackbarService,
        private dialogRef: MatDialogRef<AddSemesterComponent>
    ) {
        this.years = [];
        this.MAX_YEAR = 2030;
        this.initializeYears();
        this.halves = [1, 2];
    }

    /**
     * Populates the list of years, from 2017 to the MAX_YEAR defined (2030).
     */
    private initializeYears() {
        var yearToBeAdded = 2017;
        while (yearToBeAdded <= this.MAX_YEAR) {
            this.years.push(yearToBeAdded);
            yearToBeAdded++;
        }
    }

    /**
     * Creates a new semester.
     */
    onAddNewSemester() {
      let semester = new Semester(this.year, this.half);
      this.semesterDmService.saveSemester(semester)
      this.closeDialog(semester.getId())
    }

    closeDialog(result) {
        this.dialogRef.close(result);
    }
    /**
     * Executes its commands once the class constructor is called.
     */
    ngOnInit() {
    }

}
