import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Alert } from "../../alerts/alert.model";

@Injectable()
export class AlertsDmService {

    dm: DataManagerService;
    alerts: AngularFireList<JSON>;
    readonly alertsListName = "alerts";
    readonly alertsListReference: string = '/alerts/';

    constructor(dm: DataManagerService) {
        this.dm = dm;
        this.alerts = dm.createList(this.alertsListName);
    }

    saveAlert(alert: Alert) {
        this.dm.set(this.alerts, alert.toFirebaseObject(), alert.getId());
    }

    getAlerts() {
        return this.alerts;
    }

    getAlert(alertId: string) {
        return this.dm.readObject(this.alertsListReference + alertId);
    }

    removeAlert(reference: string) {
        return this.dm.delete(this.alerts, reference).then(
            (list) => { this.alerts = list; return true }
        ).catch((error) => {
            return false;
        });
    }
}