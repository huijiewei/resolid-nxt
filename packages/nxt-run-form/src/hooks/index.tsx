// noinspection JSUnusedGlobalSymbols

import type {
  FieldValues,
  Path,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useActionData, useFetcher, useSubmit, type SubmitOptions } from 'react-router-dom';
import { createFormData } from '../utils';

type UseNxtFormOptions<T extends FieldValues> = UseFormProps<T> & {
  submitHandlers?: {
    onValid?: SubmitHandler<T>;
    onInvalid?: SubmitErrorHandler<T>;
  };
  submitData?: FieldValues;
};

type UseNxtFetcherFormOptions<T extends FieldValues> = UseNxtFormOptions<T> & {
  submitOptions?: Omit<SubmitOptions, 'replace' | 'preventScrollReset'>;
};

const onInvalid = () => {
  // empty
};

export const useNxtFetcherForm = <T extends FieldValues>({
  submitHandlers,
  submitOptions,
  submitData,
  ...formProps
}: UseNxtFetcherFormOptions<T>) => {
  const fetcher = useFetcher();

  const onSubmit = (data: T) => {
    fetcher.submit(createFormData({ ...data, ...submitData }), {
      method: 'post',
      ...submitOptions,
    });
  };

  const methods = useForm<T>({ ...formProps, errors: fetcher.data?.errors });

  const {
    dirtyFields,
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    isValid,
    isValidating,
    touchedFields,
    submitCount,
    errors,
    isLoading,
  } = methods.formState;

  return {
    ...methods,
    handleSubmit: methods.handleSubmit(submitHandlers?.onValid ?? onSubmit, submitHandlers?.onInvalid ?? onInvalid),
    formState: {
      dirtyFields,
      isDirty,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValid,
      isValidating,
      touchedFields,
      submitCount,
      isLoading,
      errors,
    },
    fetcher: {
      Form: fetcher.Form,
      state: fetcher.state,
      data: fetcher.data,
    },
  };
};

type UseNxtSubmitFormOptions<T extends FieldValues> = UseNxtFormOptions<T> & {
  submitOptions?: SubmitOptions;
};

export const useNxtSubmitForm = <T extends FieldValues>({
  submitHandlers,
  submitOptions,
  submitData,
  ...formProps
}: UseNxtSubmitFormOptions<T>) => {
  const submit = useSubmit();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useActionData() as any;

  const onSubmit = (data: T) => {
    submit(createFormData({ ...data, ...submitData }), {
      method: 'post',
      ...submitOptions,
    });
  };

  const methods = useForm<T>({ ...formProps, errors: data?.errors });

  const {
    dirtyFields,
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    isValid,
    isValidating,
    touchedFields,
    submitCount,
    errors,
    isLoading,
  } = methods.formState;

  return {
    ...methods,
    handleSubmit: methods.handleSubmit(submitHandlers?.onValid ?? onSubmit, submitHandlers?.onInvalid ?? onInvalid),
    register: (name: Path<T>, options?: RegisterOptions<T>) => ({
      ...methods.register(name, options),
      defaultValue: data?.defaultValues?.[name] ?? '',
    }),
    formState: {
      dirtyFields,
      isDirty,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValid,
      isValidating,
      touchedFields,
      submitCount,
      isLoading,
      errors,
    },
  };
};
