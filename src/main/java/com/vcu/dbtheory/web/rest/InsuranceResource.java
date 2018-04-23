package com.vcu.dbtheory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vcu.dbtheory.domain.Insurance;

import com.vcu.dbtheory.repository.InsuranceRepository;
import com.vcu.dbtheory.web.rest.errors.BadRequestAlertException;
import com.vcu.dbtheory.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Insurance.
 */
@RestController
@RequestMapping("/api")
public class InsuranceResource {

    private final Logger log = LoggerFactory.getLogger(InsuranceResource.class);

    private static final String ENTITY_NAME = "insurance";

    private final InsuranceRepository insuranceRepository;

    public InsuranceResource(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    /**
     * POST  /insurances : Create a new insurance.
     *
     * @param insurance the insurance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new insurance, or with status 400 (Bad Request) if the insurance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/insurances")
    @Timed
    public ResponseEntity<Insurance> createInsurance(@Valid @RequestBody Insurance insurance) throws URISyntaxException {
        log.debug("REST request to save Insurance : {}", insurance);
        if (insurance.getId() != null) {
            throw new BadRequestAlertException("A new insurance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Insurance result = insuranceRepository.save(insurance);
        return ResponseEntity.created(new URI("/api/insurances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /insurances : Updates an existing insurance.
     *
     * @param insurance the insurance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated insurance,
     * or with status 400 (Bad Request) if the insurance is not valid,
     * or with status 500 (Internal Server Error) if the insurance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/insurances")
    @Timed
    public ResponseEntity<Insurance> updateInsurance(@Valid @RequestBody Insurance insurance) throws URISyntaxException {
        log.debug("REST request to update Insurance : {}", insurance);
        if (insurance.getId() == null) {
            return createInsurance(insurance);
        }
        Insurance result = insuranceRepository.save(insurance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, insurance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /insurances : get all the insurances.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of insurances in body
     */
    @GetMapping("/insurances")
    @Timed
    public List<Insurance> getAllInsurances() {
        log.debug("REST request to get all Insurances");
        return insuranceRepository.findAll();
        }

    /**
     * GET  /insurances/:id : get the "id" insurance.
     *
     * @param id the id of the insurance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the insurance, or with status 404 (Not Found)
     */
    @GetMapping("/insurances/{id}")
    @Timed
    public ResponseEntity<Insurance> getInsurance(@PathVariable Long id) {
        log.debug("REST request to get Insurance : {}", id);
        Insurance insurance = insuranceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(insurance));
    }

    /**
     * DELETE  /insurances/:id : delete the "id" insurance.
     *
     * @param id the id of the insurance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/insurances/{id}")
    @Timed
    public ResponseEntity<Void> deleteInsurance(@PathVariable Long id) {
        log.debug("REST request to delete Insurance : {}", id);
        insuranceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
