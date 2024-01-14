import type { FieldErrors, FieldValues, Resolver } from 'react-hook-form';

const generateFormData = (formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outputObject: Record<any, any> = {};

  for (const [key, value] of formData.entries()) {
    const keyParts = key.split('.');
    let currentObject = outputObject;

    for (let i = 0; i < keyParts.length - 1; i++) {
      const keyPart = keyParts[i];
      if (!currentObject[keyPart]) {
        currentObject[keyPart] = /^\d+$/.test(keyParts[i + 1]) ? [] : {};
      }

      currentObject = currentObject[keyPart];
    }

    const lastKeyPart = keyParts[keyParts.length - 1];
    // noinspection RegExpRedundantEscape
    const lastKeyPartIsArray = /\[\d*\]$|\[\]$/.test(lastKeyPart);

    if (lastKeyPartIsArray) {
      // noinspection RegExpRedundantEscape
      const key = lastKeyPart.replace(/\[\d*\]$|\[\]$/, '');
      if (!currentObject[key]) {
        currentObject[key] = [];
      }
      currentObject[key].push(value);
    }

    if (!lastKeyPartIsArray) {
      if (/^\d+$/.test(lastKeyPart)) {
        currentObject.push(value);
      } else {
        currentObject[lastKeyPart] = value;
      }
    }
  }

  return outputObject;
};

const parseFormData = async <T>(request: Request, key = 'formData'): Promise<T> => {
  const formData = await request.formData();
  const data = formData.get(key);

  if (!data) {
    return generateFormData(formData);
  }

  if (!(typeof data === 'string')) {
    throw new Error('Data is not a string');
  }

  return JSON.parse(data);
};

export const validateFormData = async <T extends FieldValues>(request: Request, resolver: Resolver<T>) => {
  const data = await parseFormData<T>(request);
  const { errors, values } = await resolver(data, {}, { shouldUseNativeValidation: false, fields: {} });

  if (Object.keys(errors).length > 0) {
    return { errors: errors as FieldErrors<T>, data: undefined };
  }

  return { errors: undefined, data: values as T };
};

export const createFormData = <T extends FieldValues>(data: T, key = 'formData'): FormData => {
  const formData = new FormData();
  const finalData = JSON.stringify(data);
  formData.append(key, finalData);

  return formData;
};
