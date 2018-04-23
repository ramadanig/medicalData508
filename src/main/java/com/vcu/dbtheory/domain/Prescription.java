package com.vcu.dbtheory.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Prescription.
 */
@Entity
@Table(name = "prescription")
public class Prescription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "dosage", nullable = false)
    private String dosage;

    @NotNull
    @Column(name = "expiration", nullable = false)
    private LocalDate expiration;

    @NotNull
    @Min(value = 0)
    @Column(name = "refills", nullable = false)
    private Integer refills;

    @ManyToOne(optional = false)
    @NotNull
    private Medication medication;

    @ManyToOne(optional = false)
    @NotNull
    private Patient patient;

    @ManyToOne(optional = false)
    @NotNull
    private Doctor doctor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDosage() {
        return dosage;
    }

    public Prescription dosage(String dosage) {
        this.dosage = dosage;
        return this;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public LocalDate getExpiration() {
        return expiration;
    }

    public Prescription expiration(LocalDate expiration) {
        this.expiration = expiration;
        return this;
    }

    public void setExpiration(LocalDate expiration) {
        this.expiration = expiration;
    }

    public Integer getRefills() {
        return refills;
    }

    public Prescription refills(Integer refills) {
        this.refills = refills;
        return this;
    }

    public void setRefills(Integer refills) {
        this.refills = refills;
    }

    public Medication getMedication() {
        return medication;
    }

    public Prescription medication(Medication medication) {
        this.medication = medication;
        return this;
    }

    public void setMedication(Medication medication) {
        this.medication = medication;
    }

    public Patient getPatient() {
        return patient;
    }

    public Prescription patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public Prescription doctor(Doctor doctor) {
        this.doctor = doctor;
        return this;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Prescription prescription = (Prescription) o;
        if (prescription.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prescription.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Prescription{" +
            "id=" + getId() +
            ", dosage='" + getDosage() + "'" +
            ", expiration='" + getExpiration() + "'" +
            ", refills='" + getRefills() + "'" +
            "}";
    }
}
