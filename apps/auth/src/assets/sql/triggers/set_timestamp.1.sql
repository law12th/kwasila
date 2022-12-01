CREATE TRIGGER set_timestamp_customer_on_update BEFORE
UPDATE ON users.customer FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_vendor_on_update BEFORE
UPDATE ON users.vendor FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();