package com.vcu.dbtheory.domain;

import com.vcu.dbtheory.domain.enumeration.Sex;
import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Doctor.class)
public abstract class Doctor_ {

	public static volatile SingularAttribute<Doctor, String> firstName;
	public static volatile SingularAttribute<Doctor, String> lastName;
	public static volatile SingularAttribute<Doctor, String> specialty;
	public static volatile SingularAttribute<Doctor, LocalDate> birthdate;
	public static volatile SingularAttribute<Doctor, Sex> sex;
	public static volatile SingularAttribute<Doctor, Long> id;
	public static volatile SingularAttribute<Doctor, LocalDate> startDate;

}

