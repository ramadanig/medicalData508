package com.vcu.dbtheory.web.rest;

import com.vcu.dbtheory.DbtheoryApp;

import com.vcu.dbtheory.domain.Ailment;
import com.vcu.dbtheory.repository.AilmentRepository;
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
 * Test class for the AilmentResource REST controller.
 *
 * @see AilmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DbtheoryApp.class)
public class AilmentResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SYMPTOMS = "AAAAAAAAAA";
    private static final String UPDATED_SYMPTOMS = "BBBBBBBBBB";

    private static final String DEFAULT_TREATMENTS = "AAAAAAAAAA";
    private static final String UPDATED_TREATMENTS = "BBBBBBBBBB";

    @Autowired
    private AilmentRepository ailmentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAilmentMockMvc;

    private Ailment ailment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AilmentResource ailmentResource = new AilmentResource(ailmentRepository);
        this.restAilmentMockMvc = MockMvcBuilders.standaloneSetup(ailmentResource)
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
    public static Ailment createEntity(EntityManager em) {
        Ailment ailment = new Ailment()
            .name(DEFAULT_NAME)
            .symptoms(DEFAULT_SYMPTOMS)
            .treatments(DEFAULT_TREATMENTS);
        return ailment;
    }

    @Before
    public void initTest() {
        ailment = createEntity(em);
    }

    @Test
    @Transactional
    public void createAilment() throws Exception {
        int databaseSizeBeforeCreate = ailmentRepository.findAll().size();

        // Create the Ailment
        restAilmentMockMvc.perform(post("/api/ailments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ailment)))
            .andExpect(status().isCreated());

        // Validate the Ailment in the database
        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeCreate + 1);
        Ailment testAilment = ailmentList.get(ailmentList.size() - 1);
        assertThat(testAilment.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAilment.getSymptoms()).isEqualTo(DEFAULT_SYMPTOMS);
        assertThat(testAilment.getTreatments()).isEqualTo(DEFAULT_TREATMENTS);
    }

    @Test
    @Transactional
    public void createAilmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ailmentRepository.findAll().size();

        // Create the Ailment with an existing ID
        ailment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAilmentMockMvc.perform(post("/api/ailments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ailment)))
            .andExpect(status().isBadRequest());

        // Validate the Ailment in the database
        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ailmentRepository.findAll().size();
        // set the field null
        ailment.setName(null);

        // Create the Ailment, which fails.

        restAilmentMockMvc.perform(post("/api/ailments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ailment)))
            .andExpect(status().isBadRequest());

        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSymptomsIsRequired() throws Exception {
        int databaseSizeBeforeTest = ailmentRepository.findAll().size();
        // set the field null
        ailment.setSymptoms(null);

        // Create the Ailment, which fails.

        restAilmentMockMvc.perform(post("/api/ailments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ailment)))
            .andExpect(status().isBadRequest());

        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTreatmentsIsRequired() throws Exception {
        int databaseSizeBeforeTest = ailmentRepository.findAll().size();
        // set the field null
        ailment.setTreatments(null);

        // Create the Ailment, which fails.

        restAilmentMockMvc.perform(post("/api/ailments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ailment)))
            .andExpect(status().isBadRequest());

        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAilments() throws Exception {
        // Initialize the database
        ailmentRepository.saveAndFlush(ailment);

        // Get all the ailmentList
        restAilmentMockMvc.perform(get("/api/ailments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ailment.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].symptoms").value(hasItem(DEFAULT_SYMPTOMS.toString())))
            .andExpect(jsonPath("$.[*].treatments").value(hasItem(DEFAULT_TREATMENTS.toString())));
    }

    @Test
    @Transactional
    public void getAilment() throws Exception {
        // Initialize the database
        ailmentRepository.saveAndFlush(ailment);

        // Get the ailment
        restAilmentMockMvc.perform(get("/api/ailments/{id}", ailment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ailment.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.symptoms").value(DEFAULT_SYMPTOMS.toString()))
            .andExpect(jsonPath("$.treatments").value(DEFAULT_TREATMENTS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAilment() throws Exception {
        // Get the ailment
        restAilmentMockMvc.perform(get("/api/ailments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAilment() throws Exception {
        // Initialize the database
        ailmentRepository.saveAndFlush(ailment);
        int databaseSizeBeforeUpdate = ailmentRepository.findAll().size();

        // Update the ailment
        Ailment updatedAilment = ailmentRepository.findOne(ailment.getId());
        updatedAilment
            .name(UPDATED_NAME)
            .symptoms(UPDATED_SYMPTOMS)
            .treatments(UPDATED_TREATMENTS);

        restAilmentMockMvc.perform(put("/api/ailments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAilment)))
            .andExpect(status().isOk());

        // Validate the Ailment in the database
        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeUpdate);
        Ailment testAilment = ailmentList.get(ailmentList.size() - 1);
        assertThat(testAilment.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAilment.getSymptoms()).isEqualTo(UPDATED_SYMPTOMS);
        assertThat(testAilment.getTreatments()).isEqualTo(UPDATED_TREATMENTS);
    }

    @Test
    @Transactional
    public void updateNonExistingAilment() throws Exception {
        int databaseSizeBeforeUpdate = ailmentRepository.findAll().size();

        // Create the Ailment

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAilmentMockMvc.perform(put("/api/ailments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ailment)))
            .andExpect(status().isCreated());

        // Validate the Ailment in the database
        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAilment() throws Exception {
        // Initialize the database
        ailmentRepository.saveAndFlush(ailment);
        int databaseSizeBeforeDelete = ailmentRepository.findAll().size();

        // Get the ailment
        restAilmentMockMvc.perform(delete("/api/ailments/{id}", ailment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ailment> ailmentList = ailmentRepository.findAll();
        assertThat(ailmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ailment.class);
        Ailment ailment1 = new Ailment();
        ailment1.setId(1L);
        Ailment ailment2 = new Ailment();
        ailment2.setId(ailment1.getId());
        assertThat(ailment1).isEqualTo(ailment2);
        ailment2.setId(2L);
        assertThat(ailment1).isNotEqualTo(ailment2);
        ailment1.setId(null);
        assertThat(ailment1).isNotEqualTo(ailment2);
    }
}
