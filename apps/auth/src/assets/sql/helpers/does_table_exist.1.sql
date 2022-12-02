SELECT EXISTS (
                SELECT
                FROM pg_tables
                WHERE schemaname = $1
                        AND tablename = $2
        );