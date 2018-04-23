package com.vcu.dbtheory.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Prescription.class)
public abstract class Prescription_ {

	public static volatile SingularAttribute<Prescription, Doctor> doctor;
	public static volatile SingularAttribute<Prescription, String> dosage;
	public static volatile SingularAttribute<Prescription, Integer> refills;
	public static volatile SingularAttribute<Prescription, Patient> patient;
	public static volatile SingularAttribute<Prescription, LocalDate> expiration;
	public static volatile SingularAttribute<Prescription, Medication> medication;
	public static volatile SingularAttribute<Prescription, Long> id;

}

