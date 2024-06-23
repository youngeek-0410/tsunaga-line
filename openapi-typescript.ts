import fs from 'node:fs';
import openapiTS from 'openapi-typescript';
// import spec from './backend/docs/openapi.json';

(async () => {
  try {
    const schema = await fs.promises.readFile('backend/docs/openapi.json', 'utf8');

    // const typeFileContent = await openapiTS(JSON.parse(schema), {
    //   transform(schemaObject, _metadata): string | undefined {
    //     if ('format' in schemaObject && schemaObject.format === 'binary') {
    //       return schemaObject.nullable ? 'File | Blob | null' : 'File | Blob';
    //     }
    //   },
    // });

    const typeFileContent = await openapiTS(JSON.parse(schema));

    await fs.promises.writeFile('src/fetcher/openapi-generated.d.ts', typeFileContent);
  } catch (e) {
    console.error(e);
  }
})();
