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

-- TODO: TESTS, VISITS, INSURANCES, MORE PRESCRIPTIONS