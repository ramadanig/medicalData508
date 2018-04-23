package com.vcu.dbtheory.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Visit.class)
public abstract class Visit_ {

	public static volatile SingularAttribute<Visit, LocalDate> date;
	public static volatile SingularAttribute<Visit, Doctor> doctor;
	public static volatile SingularAttribute<Visit, String> notes;
	public static volatile SingularAttribute<Visit, Patient> patient;
	public static volatile SingularAttribute<Visit, Long> id;
	public static volatile SingularAttribute<Visit, String> treatments;

}

