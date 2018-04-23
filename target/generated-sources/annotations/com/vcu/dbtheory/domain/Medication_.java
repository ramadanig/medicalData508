package com.vcu.dbtheory.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Medication.class)
public abstract class Medication_ {

	public static volatile SingularAttribute<Medication, String> precautions;
	public static volatile SingularAttribute<Medication, String> name;
	public static volatile SingularAttribute<Medication, String> description;
	public static volatile SingularAttribute<Medication, String> producer;
	public static volatile SingularAttribute<Medication, Long> id;

}

