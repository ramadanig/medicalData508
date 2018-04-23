package com.vcu.dbtheory.web.rest;

import com.vcu.dbtheory.DbtheoryApp;

import com.vcu.dbtheory.domain.Medication;
import com.vcu.dbtheory.repository.MedicationRepository;
import com.vcu.dbtheory.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MedicationResource REST controller.
 *
 * @see MedicationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DbtheoryApp.class)
public class MedicationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCER = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCER = "BBBBBBBBBB";

    private static final String DEFAULT_PRECAUTIONS = "AAAAAAAAAA";
    private static final String UPDATED_PRECAUTIONS = "BBBBBBBBBB";

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMedicationMockMvc;

    private Medication medication;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedicationResource medicationResource = new MedicationResource(medicationRepository);
        this.restMedicationMockMvc = MockMvcBuilders.standaloneSetup(medicationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medication createEntity(EntityManager em) {
        Medication medication = new Medication()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .producer(DEFAULT_PRODUCER)
            .precautions(DEFAULT_PRECAUTIONS);
        return medication;
    }

    @Before
    public void initTest() {
        medication = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedication() throws Exception {
        int databaseSizeBeforeCreate = medicationRepository.findAll().size();

        // Create the Medication
        restMedicationMockMvc.perform(post("/api/medications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medication)))
            .andExpect(status().isCreated());

        // Validate the Medication in the database
        List<Medication> medicationList = medicationRepository.findAll();
        assertThat(medicationList).hasSize(databaseSizeBeforeCreate + 1);
        Medication testMedication = medicationList.get(medicationList.size() - 1);
        assertThat(testMedication.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMedication.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMedication.getProducer()).isEqualTo(DEFAULT_PRODUCER);
        assertThat(testMedication.getPrecautions()).isEqualTo(DEFAULT_PRECAUTIONS);
    }

    @Test
    @Transactional
    public void createMedicationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicationRepository.findAll().size();

        // Create the Medication with an existing ID
        medication.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicationMockMvc.perform(post("/api/medications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medication)))
            .andExpect(status().isBadRequest());

        // Validate the Medication in the database
        List<Medication> medicationList = medicationRepository.findAll();
        assertThat(medicationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicationRepository.findAll().size();
        // set the field null
        medication.setName(null);

        // Create the Medication, which fails.

        restMedicationMockMvc.perform(post("/api/medications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medication)))
            .andExpect(status().isBadRequest());

        List<Medication> medicationList = medicationRepository.findAll();
        assertThat(medicationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProducerIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicationRepository.findAll().size();
        // set the field null
        medication.setProducer(null);

        // Create the Medication, which fails.

        restMedicationMockMvc.perform(post("/api/medications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medication)))
            .andExpect(status().isBadRequest());

        List<Medication> medicationList = medicationRepository.findAll();
        assertThat(medicationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMedications() throws Exception {
        // Initialize the database
        medicationRepository.saveAndFlush(medication);

        // Get all the medicationList
        restMedicationMockMvc.perform(get("/api/medications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medication.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].producer").value(hasItem(DEFAULT_PRODUCER.toString())))
            .andExpect(jsonPath("$.[*].precautions").value(hasItem(DEFAULT_PRECAUTIONS.toString())));
    }

    @Test
    @Transactional
    public void getMedication() throws Exception {
        // Initialize the database
        medicationRepository.saveAndFlush(medication);

        // Get the medication
        restMedicationMockMvc.perform(get("/api/medications/{id}", medication.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medication.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.producer").value(DEFAULT_PRODUCER.toString()))
            .andExpect(jsonPath("$.precautions").value(DEFAULT_PRECAUTIONS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedication() throws Exception {
        // Get the medication
        restMedicationMockMvc.perform(get("/api/medications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedication() throws Exception {
        // Initialize the database
        medicationRepository.saveAndFlush(medication);
        int databaseSizeBeforeUpdate = medicationRepository.findAll().size();

        // Update the medication
        Medication updatedMedication = medicationRepository.findOne(medication.getId());
        updatedMedication
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .producer(UPDATED_PRODUCER)
            .precautions(UPDATED_PRECAUTIONS);

        restMedicationMockMvc.perform(put("/api/medications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedication)))
            .andExpect(status().isOk());

        // Validate the Medication in the database
        List<Medication> medicationList = medicationRepository.findAll();
        assertThat(medicationList).hasSize(databaseSizeBeforeUpdate);
        Medication testMedication = medicationList.get(medicationList.size() - 1);
        assertThat(testMedication.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMedication.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMedication.getProducer()).isEqualTo(UPDATED_PRODUCER);
        assertThat(testMedication.getPrecautions()).isEqualTo(UPDATED_PRECAUTIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingMedication() throws Exception {
        int databaseSizeBeforeUpdate = medicationRepository.findAll().size();

        // Create the Medication

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMedicationMockMvc.perform(put("/api/medications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medication)))
            .andExpect(status().isCreated());

        // Validate the Medication in the database
        List<Medication> medicationList = medicationRepository.findAll();
        assertThat(medicationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMedication() throws Exception {
        // Initialize the database
        medicationRepository.saveAndFlush(medication);
        int databaseSizeBeforeDelete = medicationRepository.findAll().size();

        // Get the medication
        restMedicationMockMvc.perform(delete("/api/medications/{id}", medication.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Medication> medicationList = medicationRepository.findAll();
        assertThat(medicationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medication.class);
        Medication medication1 = new Medication();
        medication1.setId(1L);
        Medication medication2 = new Medication();
        medication2.setId(medication1.getId());
        assertThat(medication1).isEqualTo(medication2);
        medication2.setId(2L);
        assertThat(medication1).isNotEqualTo(medication2);
        medication1.setId(null);
        assertThat(medication1).isNotEqualTo(medication2);
    }
}
