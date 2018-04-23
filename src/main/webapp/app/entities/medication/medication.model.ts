import { BaseEntity } from './../../shared';

export class Medication implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public producer?: string,
        public precautions?: string,
    ) {
    }
}
