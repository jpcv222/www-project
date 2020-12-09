DROP TRIGGER IF EXISTS t_insert_conversation ON USERS_EXT;
CREATE TRIGGER t_insert_conversation
    AFTER INSERT ON USERS_EXT
    FOR EACH ROW
EXECUTE PROCEDURE f_insert_conversation();