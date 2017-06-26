export class Professor {
    constructor(
        public id: number,
        public nome: string,
        public SIAP: string,
        public max_creditos: number,
        public min_creditos: number,
        public creditos_pos: number,
        public restricoes_horarios: string[]
    ) {}

}