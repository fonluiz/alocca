/**
 * @api {model} projeto/src/app/professors/schedule-restriction.model.ts Schedule Restriction Model
 * @apiName Schedule Restriction Model
 * @apiGroup Professor
 * @apiParam {string[]} tough List of tough restrictions.
 * @apiParam {string[]} tractable List of tractable restrictions.
 */

export class ScheduleRestriction {
    constructor(
        public tough: string[],
        public tractable: string[]
    ) { }

}