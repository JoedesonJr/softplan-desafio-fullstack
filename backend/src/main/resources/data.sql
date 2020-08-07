INSERT INTO users (name, username, password, role, created_date, created_by)
    SELECT 'Administrador', 'admin', '$2a$10$w4aYImUDBwPU15JDDiBi1uwc5l7P2uhGhNE4QjZ3KyMVeoW2SgKFK', 'ROLE_ADMIN', CURRENT_TIMESTAMP, 'System'
    WHERE NOT EXISTS (SELECT * FROM users WHERE username = 'admin');