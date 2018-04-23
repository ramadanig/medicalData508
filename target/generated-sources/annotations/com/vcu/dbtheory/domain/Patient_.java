package com.vcu.dbtheory.domain;

import com.vcu.dbtheory.domain.enumeration.Sex;
import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Patient.class)
public abstract class Patient_ {

	public static volatile SingularAttribute<Patient, String> allergies;
	public static volatile SingularAttribute<Patient, Doctor> doctor;
	public static volatile SingularAttribute<Patient, String> firstName;
	public static volatile SingularAttribute<Patient, String> lastName;
	public static volatile SingularAttribute<Patient, LocalDate> birthdate;
	public static volatile SingularAttribute<Patient, String> address;
	public static volatile SingularAttribute<Patient, String> phone;
	public static volatile SingularAttribute<Patient, Sex> sex;
	public static volatile SingularAttribute<Patient, Long> id;
	public static volatile SingularAttribute<Patient, String> ssn;

}

