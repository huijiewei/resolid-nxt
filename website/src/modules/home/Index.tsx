import { useActionData, useLoaderData } from '@resolid/nxt-run';
import { server$ } from '@resolid/nxt-run/server';
import { Button } from '@resolid/nxt-ui';
import { useSubmit, type ShouldRevalidateFunction } from 'react-router-dom';
import { DefaultLayout } from '~/common/components/DefaultLayout';

let count = 0;

export const loader = server$(() => {
  return { count };
});

export const action = server$(async ({ request }) => {
  const formData = await request.formData();

  const actionMethod = formData.get('method');

  if (actionMethod == 'increment') {
    count++;
  }

  if (actionMethod == 'decrement') {
    count--;
  }

  return { count };
});

export const shouldRevalidate: ShouldRevalidateFunction = ({ actionResult }) => {
  return actionResult == undefined;
};

export const Component = () => {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  return (
    <DefaultLayout>
      <div>Home Index</div>
      <div className={'my-3'}>{actionData?.count ?? data.count}</div>
      <div className={'flex flex-row gap-3 my-3'}>
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => {
            submit({ method: 'increment' }, { method: 'post' });
          }}
        >
          Increment
        </Button>
        <Button
          size={'sm'}
          variant={'outline'}
          color={'neutral'}
          onClick={() => {
            submit({ method: 'decrement' }, { method: 'post' });
          }}
        >
          Decrement
        </Button>
      </div>
    </DefaultLayout>
  );
};
