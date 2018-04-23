package com.vcu.dbtheory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vcu.dbtheory.domain.Ailment;

import com.vcu.dbtheory.repository.AilmentRepository;
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
 * REST controller for managing Ailment.
 */
@RestController
@RequestMapping("/api")
public class AilmentResource {

    private final Logger log = LoggerFactory.getLogger(AilmentResource.class);

    private static final String ENTITY_NAME = "ailment";

    private final AilmentRepository ailmentRepository;

    public AilmentResource(AilmentRepository ailmentRepository) {
        this.ailmentRepository = ailmentRepository;
    }

    /**
     * POST  /ailments : Create a new ailment.
     *
     * @param ailment the ailment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ailment, or with status 400 (Bad Request) if the ailment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ailments")
    @Timed
    public ResponseEntity<Ailment> createAilment(@Valid @RequestBody Ailment ailment) throws URISyntaxException {
        log.debug("REST request to save Ailment : {}", ailment);
        if (ailment.getId() != null) {
            throw new BadRequestAlertException("A new ailment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ailment result = ailmentRepository.save(ailment);
        return ResponseEntity.created(new URI("/api/ailments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ailments : Updates an existing ailment.
     *
     * @param ailment the ailment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ailment,
     * or with status 400 (Bad Request) if the ailment is not valid,
     * or with status 500 (Internal Server Error) if the ailment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ailments")
    @Timed
    public ResponseEntity<Ailment> updateAilment(@Valid @RequestBody Ailment ailment) throws URISyntaxException {
        log.debug("REST request to update Ailment : {}", ailment);
        if (ailment.getId() == null) {
            return createAilment(ailment);
        }
        Ailment result = ailmentRepository.save(ailment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ailment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ailments : get all the ailments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ailments in body
     */
    @GetMapping("/ailments")
    @Timed
    public List<Ailment> getAllAilments() {
        log.debug("REST request to get all Ailments");
        return ailmentRepository.findAll();
        }

    /**
     * GET  /ailments/:id : get the "id" ailment.
     *
     * @param id the id of the ailment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ailment, or with status 404 (Not Found)
     */
    @GetMapping("/ailments/{id}")
    @Timed
    public ResponseEntity<Ailment> getAilment(@PathVariable Long id) {
        log.debug("REST request to get Ailment : {}", id);
        Ailment ailment = ailmentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ailment));
    }

    /**
     * DELETE  /ailments/:id : delete the "id" ailment.
     *
     * @param id the id of the ailment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ailments/{id}")
    @Timed
    public ResponseEntity<Void> deleteAilment(@PathVariable Long id) {
        log.debug("REST request to delete Ailment : {}", id);
        ailmentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
