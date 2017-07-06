/**
 * @api {model} projeto/src/app/professors/professor.model.ts Professor Model
 * @apiName Professor Model
 * @apiGroup Professor
 * @apiParam {string} name Professor's name.
 * @apiParam {string} SIAP Professor SIAP's number ID.
 */

export class Professor {
    constructor(
        public nome: string,
        public SIAP: string
    ) {}

} 