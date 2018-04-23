package com.vcu.dbtheory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Tests.class)
public abstract class Tests_ {

	public static volatile SingularAttribute<Tests, Doctor> doctor;
	public static volatile SingularAttribute<Tests, String> data;
	public static volatile SingularAttribute<Tests, Patient> patient;
	public static volatile SingularAttribute<Tests, String> name;
	public static volatile SingularAttribute<Tests, Long> id;
	public static volatile SingularAttribute<Tests, Visit> visit;
	public static volatile SingularAttribute<Tests, String> results;

}

