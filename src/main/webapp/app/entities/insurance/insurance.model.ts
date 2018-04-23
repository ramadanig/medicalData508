import { BaseEntity } from './../../shared';

export class Insurance implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public groupId?: string,
        public individualId?: string,
        public patient?: BaseEntity,
    ) {
    }
}
