import { BaseEntity } from './../../shared';

export class Tests implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public data?: string,
        public results?: string,
        public patient?: BaseEntity,
        public doctor?: BaseEntity,
        public visit?: BaseEntity,
    ) {
    }
}
