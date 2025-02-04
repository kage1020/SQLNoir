import React from 'react';
import { Table2, Key, Link, Loader2 } from 'lucide-react';
import { db } from '../../services/DatabaseService';
import { useDatabase } from '../../hooks/useDatabase';

interface SchemaInfo {
  tableName: string;
  columns: {
    name: string;
    type: string;
    isPrimary: boolean;
    isForeign: boolean;
  }[];
}

interface DatabaseSchemaProps {
  caseId: string;
}

export function DatabaseSchema({ caseId }: DatabaseSchemaProps) {
  const [schema, setSchema] = React.useState<SchemaInfo[]>([]);
  const { isLoading, error } = useDatabase(caseId);

  React.useEffect(() => {
    const fetchSchema = async () => {
      try {
        // Only fetch schema if database is ready
        if (!isLoading && !error) {
          // Query to get table information
          const tableResult = await db.executeQuery(`
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name NOT LIKE 'sqlite_%'
          `);

          const schemaInfo: SchemaInfo[] = [];

          // For each table, get its column information
          for (const [tableName] of tableResult.values) {
            const columnResult = await db.executeQuery(`PRAGMA table_info('${tableName}')`);
            const foreignKeyResult = await db.executeQuery(`PRAGMA foreign_key_list('${tableName}')`);

            const foreignKeys = new Set(foreignKeyResult.values.map((row: any[]) => row[3])); // 'from' column name

            const columns = columnResult.values.map((row: any[]) => ({
              name: row[1], // column name
              type: row[2], // data type
              isPrimary: row[5] === 1, // pk
              isForeign: foreignKeys.has(row[1])
            }));

            schemaInfo.push({
              tableName: tableName as string,
              columns
            });
          }

          setSchema(schemaInfo);
        }
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    };

    fetchSchema();
  }, [isLoading, error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 text-amber-700 animate-spin" />
        <span className="ml-2 text-amber-900">Loading schema...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded">
        <p className="font-bold">Failed to load schema</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (schema.length === 0) {
    return (
      <div className="bg-amber-100/50 p-6 rounded-lg border border-amber-900/10">
        <p className="text-amber-800">No tables found in the database.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {schema.map((table) => (
        <div key={table.tableName} className="bg-amber-100/50 rounded-lg overflow-hidden border border-amber-900/10">
          <div className="bg-amber-100 px-4 py-2 flex items-center">
            <Table2 className="w-4 h-4 mr-2 text-amber-900" />
            <span className="font-detective text-amber-900">{table.tableName}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-amber-50">
                  <th className="px-6 py-3 text-left text-xs font-detective text-amber-900">Column</th>
                  <th className="px-6 py-3 text-left text-xs font-detective text-amber-900">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-detective text-amber-900">Key</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-200">
                {table.columns.map((column) => (
                  <tr key={column.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                      {column.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-700">
                      {column.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {column.isPrimary && (
                        <Key className="w-4 h-4 text-amber-900" title="Primary Key" />
                      )}
                      {column.isForeign && (
                        <Link className="w-4 h-4 text-amber-700" title="Foreign Key" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}