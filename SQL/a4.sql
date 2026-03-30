-- Question 1
CREATE DATABASE if not exists a4;
USE a4;
DROP TABLE if exists publisher, library_branch, borrower, book, book_authors, book_copies, book_loans;

CREATE TABLE PUBLISHER(
    Name VARCHAR(50) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    PRIMARY KEY(Name)
);
INSERT INTO PUBLISHER VALUES
    ('Pearson', '221B King St, Toronto, ON', '416-555-0101'),
    ('MITPress', '55 Hayward St, Cambridge, MA', '617-555-0142'),
    ('PrenticeHall', '1 Lake St, Upper Saddle River, NJ', '201-555-0177'),
    ('Wiley', '111 River St, Hoboken, NJ', '201-555-0199'),
    ('Springer', '233 Spring Ave, New York, NY', '212-555-0120'),
    ('Addison-Wesley', '75 Reading Rd, Boston, MA', '617-555-0115'),
    ('O’ReillyMedia', '1005 Gravenstein Hwy N, Sebastopol, CA', '707-555-0133'),
    ('HarperCollins', '195 Broadway, New York, NY', '212-555-0155');

CREATE TABLE LIBRARY_BRANCH(
    Branch_id INT NOT NULL,
    Branch_name VARCHAR(50) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    PRIMARY KEY(Branch_id)
);
INSERT INTO LIBRARY_BRANCH VALUES
    (1, 'Downtown Branch', '10 Centre St, Calgary, AB'),
    (2, 'North Hill Branch', '200 North Hill Rd, Calgary, AB'),
    (3, 'University Branch', '250 Campus Dr NW, Calgary, AB'),
    (4, 'Eastside Branch', '88 Eastgate Ave, Calgary, AB'),
    (5, 'Southgate Branch', '500 Southgate Blvd, Calgary, AB'),
    (6, 'Sharpstown', '77 Sharp St, Calgary, AB');

CREATE TABLE BORROWER(
    Card_no INT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    PRIMARY KEY(Card_no)
);
INSERT INTO BORROWER VALUES
    (5001, 'Ahmed Rahman', '12 Maple St, Calgary, AB', '403-555-0201'),
    (5002, 'Sarah Lee', '88 River Rd, Calgary, AB', '403-555-0202'),
    (5003, 'John Smith', '5 Oak Ave, Calgary, AB', '403-555-0203'),
    (5004, 'Priya Patel', '19 Pine Cres, Calgary, AB', '403-555-0204'),
    (5005, 'Chen Wang', '77 Cedar Dr, Calgary, AB', '403-555-0205'),
    (5006, 'Fatima Khan', '140 Elm St, Calgary, AB', '403-555-0206'),
    (5007, 'Omar Ali', '900 1st St SW, Calgary, AB', '403-555-0207'),
    (5008, 'Mia Johnson', '44 Lakeview Dr, Calgary, AB', '403-555-0208');
    
CREATE TABLE BOOK(
    Book_id INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Publisher_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(Book_id),
    FOREIGN KEY(Publisher_name) REFERENCES PUBLISHER(Name)
);
INSERT INTO BOOK VALUES
    (1001, 'Database Systems Concepts', 'Pearson'),
    (1002, 'Introduction to Algorithms', 'MITPress'),
    (1003, 'Clean Code', 'PrenticeHall'),
    (1004, 'Artificial Intelligence: A Modern Approach', 'Pearson'),
    (1005, 'Operating System Concepts', 'Wiley'),
    (1006, 'Computer Networks', 'Pearson'),
    (1007, 'The Pragmatic Programmer', 'Addison-Wesley'),
    (1008, 'Deep Learning', 'MITPress'),
    (1009, 'Pattern Recognition and Machine Learning', 'Springer'),
    (1010, 'Data Science for Business', 'O’ReillyMedia'),
    (1011, 'The Lost Tribe', 'HarperCollins'),
    (1012, 'The Data Warehouse Toolkit', 'Wiley');

CREATE TABLE BOOK_AUTHORS(
    Book_id INT NOT NULL,
    Author_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(Book_id, Author_name),
    FOREIGN KEY(Book_id) REFERENCES BOOK(Book_id)
);
INSERT INTO BOOK_AUTHORS VALUES
    (1001, 'Abraham Silberschatz'),
    (1001, 'Henry F. Korth'),
    (1001, 'S. Sudarshan'),
    (1002, 'Thomas H. Cormen'),
    (1002, 'Charles E. Leiserson'),
    (1002, 'Ronald L. Rivest'),
    (1002, 'Clifford Stein'),
    (1003, 'Robert C. Martin'),
    (1008, 'Ian Goodfellow'),
    (1008, 'Yoshua Bengio'),
    (1008, 'Aaron Courville'),
    (1010, 'Foster Provost'),
    (1010, 'Tom Fawcett'),
    (1011, 'Mark Lee'),
    (1012, 'Ralph Kimball'),
    (1012, 'Margy Ross');

CREATE TABLE BOOK_COPIES(
    Book_id INT NOT NULL,
    Branch_id INT NOT NULL,
    No_of_copies INT NOT NULL,
    PRIMARY KEY(Book_id, Branch_id),
    FOREIGN KEY(Book_id) REFERENCES BOOK(Book_id),
    FOREIGN KEY(Branch_id) REFERENCES LIBRARY_BRANCH(Branch_id)
);
INSERT INTO BOOK_COPIES VALUES
    (1001, 1, 4),
    (1001, 3, 2),
    (1002, 2, 3),
    (1002, 3, 5),
    (1003, 1, 3),
    (1004, 2, 2),
    (1005, 5, 4),
    (1006, 2, 3),
    (1007, 4, 2),
    (1008, 3, 3),
    (1008, 6, 2),
    (1009, 1, 1),
    (1010, 5, 2),
    (1011, 6, 7),
    (1011, 1, 3),
    (1012, 5, 2),
    (1012, 6, 2);

CREATE TABLE BOOK_LOANS(
    Book_id INT NOT NULL,
    Branch_id INT NOT NULL,
    Card_no INT NOT NULL,
    Date_out DATE NOT NULL,
    Due_date DATE NOT NULL,
    PRIMARY KEY(Book_id, Branch_id, Card_no),
    FOREIGN KEY(Book_id) REFERENCES BOOK(Book_id),
    FOREIGN KEY(Branch_id) REFERENCES LIBRARY_BRANCH(Branch_id),
    FOREIGN KEY(Card_no) REFERENCES BORROWER(Card_no)
);

INSERT INTO BOOK_LOANS VALUES
    (1011, 6, 5001, '2025-12-17', '2025-12-31'),
    (1008, 6, 5002, '2025-12-18', '2025-12-31'),
    (1001, 1, 5001, '2025-12-10', '2026-01-03'),
    (1002, 2, 5001, '2025-12-11', '2026-01-04'),
    (1003, 3, 5001, '2025-12-12', '2026-01-05'),
    (1004, 4, 5001, '2025-12-13', '2026-01-06'),
    (1010, 5, 5001, '2025-12-14', '2026-01-07'),
    (1006, 1, 5002, '2025-12-09', '2026-01-02'),
    (1002, 2, 5002, '2025-12-10', '2026-01-03'),
    (1001, 3, 5002, '2025-12-11', '2026-01-04'),
    (1007, 4, 5002, '2025-12-12', '2026-01-05'),
    (1012, 5, 5002, '2025-12-13', '2026-01-06'),
    (1011, 6, 5002, '2025-12-14', '2026-01-07'),
    (1005, 5, 5003, '2025-12-20', '2026-01-10'),
    (1009, 1, 5004, '2025-12-21', '2026-01-11'),
    (1004, 2, 5005, '2025-12-22', '2026-01-12'),
    (1003, 3, 5006, '2025-12-23', '2026-01-13');

-- Question 2a
SELECT bc.No_of_copies
FROM book_copies as bc, BOOK as b, library_branch as lb 
WHERE b.Title = 'The Lost Tribe' AND lb.Branch_name = 'Sharpstown' AND bc.Book_id = b.Book_id AND bc.Branch_id = lb.Branch_id;

-- Question 2b
SELECT Name   
FROM BORROWER
WHERE Card_no not in (SELECT Card_no FROM BOOK_LOANS);

-- Question 2c
SELECT b.title, br.name, br.address
FROM BOOK as b, BORROWER as br, BOOK_LOANS as bl, LIBRARY_BRANCH as lb
-- Due date can be anything, only for testing
WHERE lb.Branch_name = 'Sharpstown' AND bl.Due_date = '2025-12-31' AND b.Book_id = bl.Book_id AND br.Card_no = bl.Card_no AND lb.Branch_id = bl.Branch_id;

-- Question 2d
SELECT lb.Branch_name, COUNT(*)
FROM LIBRARY_BRANCH as lb
LEFT JOIN BOOK_LOANS as bl ON lb.Branch_id = bl.Branch_id
GROUP BY lb.Branch_name;

-- Question 2e
SELECT br.Name, br.Address, COUNT(*) as total
FROM BORROWER as br, BOOK_LOANS as bl
WHERE br.Card_no = bl.Card_no
GROUP BY br.Card_no
HAVING total > 5;

-- Question 2f
SELECT br.Name
FROM BORROWER as br
WHERE NOT EXISTS (
    SELECT branch_id FROM LIBRARY_BRANCH
    EXCEPT
    SELECT bl.Branch_id 
    FROM BOOK_LOANS as bl 
    WHERE bl.Card_no = br.Card_no
);

-- Question 2g
SELECT b.Title, SUM(bc.No_of_copies)
FROM BOOK as b, BOOK_COPIES as bc
WHERE b.Book_id = bc.Book_id
Group By b.Book_id
HAVING COUNT(*) > 1;