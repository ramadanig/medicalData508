import { BaseEntity } from './../../shared';

export class Ailment implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public symptoms?: string,
        public treatments?: string,
    ) {
    }
}
