/**
 * @api {model} projeto/src/app/professors/professor.model.ts Professor Model
 * @apiName Professor Model
 * @apiGroup Professor
 * @apiParam {string} name Professor's name.
 * @apiParam {string} SIAPE Professor SIAPE's number ID.
 */

export class Professor {
    constructor(
        public SIAPE: string,
        public name: string
    ) {}

}