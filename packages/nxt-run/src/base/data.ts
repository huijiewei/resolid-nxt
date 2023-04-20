import {
  useActionData as useActionDataRR,
  useLoaderData as useLoaderDataRR,
  type ActionFunction,
  type LoaderFunction,
} from 'react-router-dom';

export const useLoaderData = <T extends LoaderFunction>() => {
  return useLoaderDataRR() as Awaited<ReturnType<T>>;
};

export const useActionData = <T extends ActionFunction>() => {
  return useActionDataRR() as Awaited<ReturnType<T>> | undefined;
};
