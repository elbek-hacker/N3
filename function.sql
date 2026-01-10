-- BANK DATABASE SCHEMA

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    balance NUMERIC(15,2) NOT NULL CHECK(balance >= 0),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    from_account INT,
    to_account INT,
    amount NUMERIC(15,2) NOT NULL CHECK(amount > 0),
    transaction_type VARCHAR(20),
    status VARCHAR(20) DEFAULT 'SUCCESS',
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(from_account) REFERENCES accounts(id),
    FOREIGN KEY(to_account) REFERENCES accounts(id)
);

-- DATA

-- Customers
INSERT INTO customers (fullname, phoneNumber) VALUES
('Alice Johnson','+998901234001'),
('Bob Smith','+998901234002'),
('Charlie Brown','+998901234003'),
('David Lee','+998901234004'),
('Eva Green','+998901234005'),
('Frank Miller','+998901234006'),
('Grace Hopper','+998901234007'),
('Henry Ford','+998901234008'),
('Ivy White','+998901234009'),
('Jack Black','+998901234010');

-- Accounts
INSERT INTO accounts (customer_id, balance) VALUES
(1, 5000),
(2, 3000),
(3, 10000),
(4, 7500),
(5, 2000),
(6, 8000),
(7, 4500),
(8, 6000),
(9, 3500),
(10, 9000);

-- FUNCTION: Check balance

CREATE OR REPLACE FUNCTION check_balance(acc_id INT)
RETURNS NUMERIC AS $$
DECLARE
    bal NUMERIC;
BEGIN
    SELECT balance INTO bal
    FROM accounts
    WHERE id = acc_id;

    IF bal IS NULL THEN
        RAISE EXCEPTION 'Account not found!';
    END IF;

    RETURN bal;
END;
$$ LANGUAGE plpgsql;

-- PROCEDURE: Transfer moneyyy :)

CREATE OR REPLACE PROCEDURE transfer(
    sender_id INT,
    receiver_id INT,
    amount DEC
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF (SELECT balance FROM accounts WHERE id = sender_id) < amount THEN
        RAISE EXCEPTION 'Sender balance not enough!';
    END IF;

    UPDATE accounts
    SET balance = balance - amount
    WHERE id = sender_id;

    UPDATE accounts
    SET balance = balance + amount
    WHERE id = receiver_id;

    INSERT INTO transactions(
        from_account,
        to_account,
        amount,
        transaction_type,
        status
    )
    VALUES (
        sender_id,
        receiver_id,
        amount,
        'TRANSFER',
        'SUCCESS'
    );
END;
$$;

-- FUNCTION + TRIGGER: Automatic log on balance change

CREATE OR REPLACE FUNCTION log_balance_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO transactions(
        from_account,
        to_account,
        amount,
        transaction_type,
        status
    )
    VALUES (
        NEW.id,
        NULL,
        NEW.balance - OLD.balance,
        'BALANCE_CHANGE',
        'SUCCESS'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER balance_update_trigger
AFTER UPDATE ON accounts
FOR EACH ROW
WHEN (OLD.balance IS DISTINCT FROM NEW.balance)
EXECUTE FUNCTION log_balance_change();

-- TEST qilish :)

-- Check balances
SELECT check_balance(1) AS balance_alice;
SELECT check_balance(2) AS balance_bob;

-- Transfer money
BEGIN;
CALL transfer(1, 2, 500);
COMMIT;

-- Check balances after transfer
SELECT * FROM accounts WHERE id IN (1,2);

-- Check transactions log
SELECT * FROM transactions ORDER BY created_at DESC;

-- balance change
UPDATE accounts SET balance = balance + 100000 WHERE id = 3;
SELECT * FROM transactions WHERE from_account = 3 ORDER BY created_at DESC;
