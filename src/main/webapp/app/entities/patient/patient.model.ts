import { BaseEntity } from './../../shared';

export const enum Sex {
    'Male',
    'Female'
}

export class Patient implements BaseEntity {
    constructor(
        public id?: number,
        public ssn?: string,
        public firstName?: string,
        public lastName?: string,
        public birthdate?: any,
        public sex?: Sex,
        public address?: string,
        public phone?: string,
        public allergies?: string,
        public doctor?: BaseEntity,
    ) {
    }
}
