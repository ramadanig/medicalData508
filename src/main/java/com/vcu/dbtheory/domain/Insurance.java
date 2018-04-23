package com.vcu.dbtheory.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Insurance.
 */
@Entity
@Table(name = "insurance")
public class Insurance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "group_id", nullable = false)
    private String groupId;

    @NotNull
    @Column(name = "individual_id", nullable = false)
    private String individualId;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Patient patient;

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

    public Insurance name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGroupId() {
        return groupId;
    }

    public Insurance groupId(String groupId) {
        this.groupId = groupId;
        return this;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getIndividualId() {
        return individualId;
    }

    public Insurance individualId(String individualId) {
        this.individualId = individualId;
        return this;
    }

    public void setIndividualId(String individualId) {
        this.individualId = individualId;
    }

    public Patient getPatient() {
        return patient;
    }

    public Insurance patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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
        Insurance insurance = (Insurance) o;
        if (insurance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), insurance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Insurance{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", groupId='" + getGroupId() + "'" +
            ", individualId='" + getIndividualId() + "'" +
            "}";
    }
}
