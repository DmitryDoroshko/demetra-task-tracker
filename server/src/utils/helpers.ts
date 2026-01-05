const ALLOWED_TABLES = ["tasks"] as const;

const PRIMARY_KEYS = {
  tasks: "task_id",
} as const;

const UPDATABLE_COLUMNS = {
  tasks: ["title", "description", "is_completed"] as const,
};

export const buildPartialUpdateQuery = (
  tableName: typeof ALLOWED_TABLES[number],
  primaryKeyColumn: string,
  idValue: string,
  updates: Record<string, unknown>,
) => {
  if (!ALLOWED_TABLES.includes(tableName)) {
    throw new Error("Invalid table name");
  }

  const allowedColumns = UPDATABLE_COLUMNS[tableName];

  const columns = Object.keys(updates);

  if (columns.length === 0) {
    throw new Error("No fields for update found.");
  }

  for (const column of columns) {
    if (!allowedColumns.includes(column as any)) {
      throw new Error(`Invalid column: ${column}`);
    }
  }

  const primaryKey = PRIMARY_KEYS[tableName];

  if (primaryKeyColumn !== primaryKey) {
    throw new Error(`Invalid primary key column: ${primaryKeyColumn}`);
  }

  const values = Object.values(updates);

  const setClauses = columns.map((column, index) => `${column} = $${index + 1}`).join(", ");

  values.push(idValue);

  const idPlaceholder = `$${values.length}`;
  const query = `
      UPDATE ${tableName}
      SET ${setClauses}
      WHERE ${primaryKeyColumn} = ${idPlaceholder}
      RETURNING *;
  `;
  return { query, values };
};