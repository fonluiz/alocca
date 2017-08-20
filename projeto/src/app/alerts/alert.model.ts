/**
 * @api {model} projeto/src/app/alerts/alert.model.ts Alert Model
 * @apiName Alert Model
 * @apiGroup Alert
 * @apiParam {string} title Alert Title
 * @apiParam {string} message Describing Message to be displayed 
 */

export class Alert {
    constructor(
        public title: string,
        public message: string
    ) { }

}