package com.vcu.dbtheory.repository;

import com.vcu.dbtheory.domain.Ailment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ailment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AilmentRepository extends JpaRepository<Ailment, Long> {

}
