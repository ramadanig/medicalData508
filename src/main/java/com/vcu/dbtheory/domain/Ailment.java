package com.vcu.dbtheory.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Ailment.
 */
@Entity
@Table(name = "ailment")
public class Ailment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "symptoms", nullable = false)
    private String symptoms;

    @NotNull
    @Column(name = "treatments", nullable = false)
    private String treatments;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Ailment name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public Ailment symptoms(String symptoms) {
        this.symptoms = symptoms;
        return this;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getTreatments() {
        return treatments;
    }

    public Ailment treatments(String treatments) {
        this.treatments = treatments;
        return this;
    }

    public void setTreatments(String treatments) {
        this.treatments = treatments;
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
        Ailment ailment = (Ailment) o;
        if (ailment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ailment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ailment{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", symptoms='" + getSymptoms() + "'" +
            ", treatments='" + getTreatments() + "'" +
            "}";
    }
}
