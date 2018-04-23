import { BaseEntity } from './../../shared';

export const enum Sex {
    'Male',
    'Female'
}

export class Doctor implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public sex?: Sex,
        public birthdate?: any,
        public startDate?: any,
        public specialty?: string,
    ) {
    }
}
