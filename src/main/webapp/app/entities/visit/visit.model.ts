import { BaseEntity } from './../../shared';

export class Visit implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public notes?: string,
        public treatments?: string,
        public patient?: BaseEntity,
        public doctor?: BaseEntity,
    ) {
    }
}
