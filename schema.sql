CREATE TABLE doctors (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, sex ENUM('male','female') NOT NULL, birth_date DATE NOT NULL, specialty VARCHAR(255) NOT NULL, start_date DATE NOT NULL);
CREATE TABLE patients (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, ssn VARCHAR(11) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, sex ENUM('male','female') NOT NULL, birth_date DATE NOT NULL, address VARCHAR(255) NOT NULL, phone VARCHAR(11), allergies VARCHAR(255), doctor_id INT NOT NULL);
CREATE TABLE prescriptions (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, dosage VARCHAR(255) NOT NULL, expiration DATE NOT NULL, refills INT NOT NULL, medication_id INT NOT NULL, patient_id INT NOT NULL, doctor_id INT NOT NULL);
CREATE TABLE tests (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, data VARCHAR(255) NOT NULL, results VARCHAR(255) NOT NULL, ailment_id INT, doctor_id INT NOT NULL, patient_id INT NOT NULL, visit_id INT NOT NULL);
CREATE TABLE visits (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, date DATE NOT NULL, notes VARCHAR(255), treatments VARCHAR(255), patient_id INT NOT NULL, doctor_id INT NOT NULL);
CREATE TABLE insurances (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, group_id VARCHAR(255) NOT NULL, individual_id VARCHAR(255) NOT NULL, patient_id INT NOT NULL);
CREATE TABLE medications (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, description VARCHAR(255), producer VARCHAR(255), precautions VARCHAR(255));
CREATE TABLE ailments (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, symptoms VARCHAR(255), treatments VARCHAR(255));

INSERT INTO ailments VALUES (0,'Breast Cancer','Breast discomfort, presence of a lump in the breast','Chemotherapy recommended');
INSERT INTO ailments VALUES (0,'Chickenpox','Itchy, blister-like rash on the skin','Treatment involves relieving symptoms');
INSERT INTO ailments VALUES (0,'Measles','Cough, runny nose, inflamed eyes, red blotchy skin rash','Fever reducer regimen and vitamin A to help with symptoms');
INSERT INTO ailments VALUES (0,'Mumps','Swollen, painful salivary glands, fever, headache, fatigue, appetite loss','Treatment focuses on symptom relief');
INSERT INTO ailments VALUES (0,'Alcohol Poisoning','Slurred speech, incoordination, mood swings, and coma','Rest, hydration, IV fluids in severe cases');

INSERT INTO medications VALUES (0,'NovoLog','Insulin Medication','MedStar','');
INSERT INTO medications VALUES (0,'Advair','Asthma Medication','MedStar','May cause lightheadedness');
INSERT INTO medications VALUES (0,'Soliris','Treats Paroxysymal nocturnal hemoglobinuria','Alexion Pharmaceuticals','Contains tree nuts');

INSERT INTO doctors VALUES (0,'Gregory','House','male','1969-04-20','Infectious Disease','2008-07-04');
INSERT INTO doctors VALUES (0,'James','Wilson','male','1967-06-22','Oncology','2009-10-16');
INSERT INTO doctors VALUES (0,'Gordon','Freeman','male','1952-01-09','Radiology','2011-03-30');
INSERT INTO doctors VALUES (0,'Melani','DeSilva','female','1975-09-13','Pediatrics','2009-10-13');

INSERT INTO patients VALUES (0,'123-45-6789','Julian','Slaughter','male','1996-06-26','123 Sesame Street','19004904827','',4);
INSERT INTO patients VALUES (0,'678-45-1293','Ibrahim','Ramadan','male','1995-02-21','421 Cool Street','19004929102','',3);
INSERT INTO patients VALUES (0,'786-45-1932','Stuart','Geipel','male','1995-09-11','1 Infinite Loop','19002123378','Nuts',1);

INSERT INTO prescriptions VALUES (0,'Take as needed during asthma attacks','2018-10-19',1,2,3,1);


-- ##### 20 QUERIES BEGIN HERE ##### --


-- Query 1 - List all visits by one patient in the last year
SELECT a.* FROM visit a WHERE a.patient_id = 1001 AND a.jhi_date >= DATE '2018-01-01';

-- Query 2 - List all tests run on one patient during a certain visit
SELECT a.* FROM tests a WHERE a.patient_id = 1001 AND a.visit_id = 1051;

-- Query 3 - List all doctors with a certain specialty
SELECT * FROM doctor WHERE specialty = 'Oncology';

-- Query 4 - List all doctors who have seen a certain patient
SELECT a.* FROM doctor a, visit b WHERE b.patient_id = 1001 AND b.doctor_id = a.id;

-- Query 5 - When does a patient's insurance run out
-- NOTE: NOT POSSIBLE - Insurance doesn't contain an expiration date in the current schema.
-- An expiration date could be added, though.

-- Query 6 - List all sicknesses that a patient has had
-- NOTE: NOT POSSIBLE - The many-to-many relationship between ailments and tests that would
-- derive ailments doesn't cooperate with jHipster, so it had to be ignored.

-- Query 7 - List the doctor's notes from the last visit for a certain patient
SELECT a.notes FROM visit a WHERE a.patient_id = 1001 ORDER BY a.jhi_date DESC LIMIT 1;

-- Query 8 - When was the last time that this patient saw a doctor
SELECT a.jhi_date FROM visit a WHERE a.patient_id = 1001 ORDER BY a.jhi_date DESC LIMIT 1;

-- Query 9 - What prescriptions has a certain doctor prescribed
SELECT b.name FROM prescription a, medication b WHERE a.doctor_id = 1021 AND b.id = a.medication_id;

-- Query 10 - When should a patient refill their prescription
-- NOTE: NOT POSSIBLE - refills are fulfilled on an as-needed basis, varying between drugs.
-- This means that when one patient needs to refill their prescription varies from what may be
-- entered in a database based on the patient missing dosages, or the drug being used sporadically
-- (like an inhaler).

-- Query 11 w/ modification. You cannot look-up how many total refills they have done, but
-- you can look up how many refills they have left.
select p.last_name || ', ' || p.first_name as patient_name, pr.refills as refill_remaining
from patient p, prescription pr
group by pr.patient_id, p.id;

-- Query 12 - What medication is a person using at this moment.
select p.last_name || ', ' || p.first_name as patient_name, pr.expiration as expiration_date
from patient p, prescription pr
where pr.patient_id = p.id;

-- Query 13 - What medication has a patient used before.
select p.last_name || ', ' || p.first_name as patient_name, m.name as medication_name
from patient p, medication m, prescription pr
where pr.medication_id = m.id and pr.patient_id = p.id;

-- Query 14 - How many patients has the doctor seen in the last year.
select d.last_name || ', ' || d.first_name as doctor_name, count(v.id) as visit_count
from doctor d, visit v
where d.id = v.doctor_id
group by d.id, v.id;

-- Query 15 - How many visits has a person had.
select p.last_name || ', ' || p.first_name as patient_name, count(v.id) as visit_count
from patient p, visit v
where p.id = v.patient_id
group by p.id, v.id;

-- Query 16 - List all patients a doctor has seen
SELECT a.* FROM patient a, visit b WHERE a.id = b.patient_id AND b.doctor_id = 1021;

-- Query 17 - List all appointments a doctor should have for a day
SELECT * FROM visit a WHERE a.doctor_id = 1021 AND a.jhi_date = '2018-04-23';

-- Query 18 - What sickness did this person have on their last visit
SELECT a.notes FROM visit a WHERE a.patient_id = 1001 ORDER BY a.jhi_date DESC LIMIT 1;

-- Query 19 - What symptoms was this person showing on their last visit
SELECT a.notes FROM visit a WHERE a.patient_id = 1001 ORDER BY a.jhi_date DESC LIMIT 1;

-- Query 20 - What drug this person was prescribed on their last visit
-- NOTE: NOT POSSIBLE - 'prescriptions' are not related to 'visits' in any meaningful way.
-- This could be fixed by adding a new relationship, but in the original ERD, this wasn't present,
-- making this query impossible.