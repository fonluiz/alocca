import { Alert } from "app/alerts/alert.model";

export class AlertFactory {
    create(title: string, message: string) {
        return new Alert(title, message);
    }
}