import { FormupYupSchema } from '../interfaces';
import getSchemaField from './getSchemaField';

/**
 * If defined, extracts the field label from the schema.
 * @param name The field name
 * @param schema The schema
 */
const getFieldLabel = (
  name: string,
  schema: FormupYupSchema,
) => {
  const schemaField = getSchemaField(name, schema);

  return schemaField?.['_label'];
};

export default getFieldLabel;
