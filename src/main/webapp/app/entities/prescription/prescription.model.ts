import { BaseEntity } from './../../shared';

export class Prescription implements BaseEntity {
    constructor(
        public id?: number,
        public dosage?: string,
        public expiration?: any,
        public refills?: number,
        public medication?: BaseEntity,
        public patient?: BaseEntity,
        public doctor?: BaseEntity,
    ) {
    }
}
