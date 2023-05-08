import { Button, Spinner, useToast, type ButtonProps, type ToastOptions } from '@resolid/nxt-ui';
import type { ToastId } from '@resolid/nxt-ui/src/components/toast/ToastContext';
import { useRef } from 'react';
import { Check } from '~/common/icons/Check';
import { Error } from '~/common/icons/Error';
import { Info } from '~/common/icons/Info';
import { DemoExample } from '~/modules/ui/components/DemoExample';

const BasicDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      <Button
        onClick={() =>
          toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center',
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};

export const Basic = () => {
  return (
    <DemoExample
      preview={() => <BasicDemo />}
      snippet={`const BasicDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      <Button
        onClick={() =>
          toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center'
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};`}
    />
  );
};

const UpdateDemo = () => {
  const toast = useToast();
  const toastId = useRef<ToastId>();

  return (
    <div className={'flex gap-3'}>
      <Button
        onClick={() => {
          toastId.current = toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center',
          });
        }}
      >
        Show Toast
      </Button>
      <Button
        onClick={() => {
          toastId.current && toast.update(toastId.current, { color: 'success', title: 'Toast updated' });
        }}
      >
        Update Toast
      </Button>
    </div>
  );
};

export const Update = () => {
  return (
    <DemoExample
      preview={() => <UpdateDemo />}
      snippet={`const UpdateDemo = () => {
  const toast = useToast();
  const toastId = useRef();

  return (
    <div className={'flex gap-3'}>
      <Button
        onClick={() => {
          toastId.current = toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center'
          });
        }}
      >
        Show Toast
      </Button>
      <Button
        onClick={() => {
          toastId.current &&
            toast.update(toastId.current, { color: 'success', title: 'Toast updated' });
        }}
      >
        Update Toast
      </Button>
    </div>
  );
};`}
    />
  );
};

const DurationDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      <Button
        onClick={() =>
          toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            duration: 10000,
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center',
          })
        }
      >
        Show Toast 10 seconds
      </Button>
      <Button
        onClick={() =>
          toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            color: 'danger',
            duration: null,
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center',
          })
        }
      >
        Show Toast not auto close
      </Button>
    </div>
  );
};

export const Duration = () => {
  return (
    <DemoExample
      preview={() => <DurationDemo />}
      snippet={`const DurationDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      <Button
        onClick={() =>
          toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            duration: 10000,
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center'
          })
        }
      >
        Show Toast 10 seconds
      </Button>
      <Button
        onClick={() =>
          toast.create({
            icon: <Info size={'md'} />,
            title: 'Toast',
            color: 'danger',
            duration: null,
            description: 'The toast component is used to give feedback to users after an action has taken place.',
            className: 'items-center'
          })
        }
      >
        Show Toast not auto close
      </Button>
    </div>
  );
};`}
    />
  );
};

const HandlePromiseDemo = () => {
  const toast = useToast();

  const promise = (state: 'success' | 'error') => {
    return state == 'success'
      ? new Promise((resolve) => setTimeout(resolve, 3000))
      : new Promise((resolve, reject) => setTimeout(reject, 3000));
  };

  const handleClick = (state: 'success' | 'error') => {
    toast.promise(promise(state), {
      pending: {
        icon: <Spinner size={'lg'} />,
        title: 'Toast',
        description: 'Promise is pending.',
        className: 'items-center',
      },
      success: {
        icon: <Check size={'md'} />,
        color: 'success',
        description: 'Promise resolved 👌.',
      },
      error: {
        icon: <Error size={'md'} />,
        color: 'danger',
        description: 'Promise rejected 🤯.',
      },
    });
  };

  return (
    <div className={'flex gap-3'}>
      <Button
        color={'success'}
        variant={'outline'}
        onClick={() => {
          handleClick('success');
        }}
      >
        Promise resolved
      </Button>
      <Button
        color={'danger'}
        variant={'outline'}
        onClick={() => {
          handleClick('error');
        }}
      >
        Promise rejected
      </Button>
    </div>
  );
};

export const HandlePromise = () => {
  return (
    <DemoExample
      preview={() => <HandlePromiseDemo />}
      snippet={`const HandlePromiseDemo = () => {
  const toast = useToast();

  const promise = (state) => {
    return state == 'success'
      ? new Promise((resolve) => setTimeout(resolve, 3000))
      : new Promise((resolve, reject) => setTimeout(reject, 3000));
  };

  const handleClick = (state) => {
    toast.promise(promise(state), {
      pending: {
        icon: <Spinner size={'lg'} />,
        title: 'Toast',
        description: 'Promise is pending.',
        className: 'items-center'
      },
      success: {
        icon: <Check size={'md'} />,
        color: 'success',
        description: 'Promise resolved 👌.'
      },
      error: {
        icon: <Error size={'md'} />,
        color: 'danger',
        description: 'Promise rejected 🤯.'
      }
    });
  };

  return (
    <div className={'flex gap-3'}>
      <Button
        color={'success'}
        variant={'outline'}
        onClick={() => {
          handleClick('success');
        }}
      >
        Promise resolved
      </Button>
      <Button
        color={'danger'}
        variant={'outline'}
        onClick={() => {
          handleClick('error');
        }}
      >
        Promise rejected
      </Button>
    </div>
  );
};`}
    />
  );
};

const ColorsDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      {[
        ['neutral', 'Neutral'],
        ['primary', 'Primary'],
        ['success', 'Success'],
        ['warning', 'Warning'],
        ['danger', 'Danger'],
      ].map(([color, name]) => {
        return (
          <Button
            color={color as ButtonProps['color']}
            key={color}
            onClick={() =>
              toast.create({
                icon: <Info size={'md'} />,
                color: color as ToastOptions['color'],
                title: 'Toast',
                description: 'The toast component is used to give feedback to users after an action has taken place.',
                className: 'items-center',
              })
            }
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => <ColorsDemo />}
      snippet={`const ColorsDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      {[
        ['neutral', 'Neutral'],
        ['primary', 'Primary'],
        ['success', 'Success'],
        ['warning', 'Warning'],
        ['danger', 'Danger']
      ].map(([color, name]) => {
        return (
          <Button
            color={color}
            key={color}
            onClick={() =>
              toast.create({
                icon: <Info size={'md'} />,
                color: color,
                title: 'Toast',
                description: 'The toast component is used to give feedback to users after an action has taken place.',
                className: 'items-center'
              })
            }
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};`}
    />
  );
};

const VariantsDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      {[
        ['solid', 'Solid'],
        ['light', 'Light'],
        ['outline', 'Outline'],
      ].map(([variant, name]) => {
        return (
          <Button
            variant={variant as ButtonProps['variant']}
            key={variant}
            onClick={() =>
              toast.create({
                icon: <Info size={'md'} />,
                variant: variant as ToastOptions['variant'],
                title: 'Toast',
                color: 'success',
                description: 'The toast component is used to give feedback to users after an action has taken place.',
                className: 'items-center',
              })
            }
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};

export const Variants = () => {
  return (
    <DemoExample
      preview={() => <VariantsDemo />}
      snippet={`const VariantsDemo = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-3'}>
      {[
        ['solid', 'Solid'],
        ['light', 'Light'],
        ['outline', 'Outline']
      ].map(([variant, name]) => {
        return (
          <Button
            variant={variant}
            key={variant}
            onClick={() =>
              toast.create({
                icon: <Info size={'md'} />,
                variant: variant,
                title: 'Toast',
                description: 'The toast component is used to give feedback to users after an action has taken place.',
                className: 'items-center'
              })
            }
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};`}
    />
  );
};

const PlacementDemo = () => {
  const toast = useToast();

  return (
    <div
      className={'mx-auto grid w-fit gap-2'}
      style={{
        gridTemplateAreas:
          '"top-start     top         top-end"' +
          '".            center       ."' +
          '"bottom-start  bottom      bottom-end"',
      }}
    >
      {[
        ['top-start', 'Top\nStart'],
        ['top', 'Top'],
        ['top-end', 'Top\nEnd'],
        ['center', 'Close All'],
        ['bottom-start', 'Bottom\nStart'],
        ['bottom', 'Bottom'],
        ['bottom-end', 'Bottom\nEnd'],
      ].map(([placement, name]) => {
        return (
          <button
            key={placement}
            style={{ gridArea: placement }}
            className={
              'flex h-12 w-12 text-center leading-tight text-sm cursor-default items-center justify-center rounded bg-bg-subtle hover:bg-bg-subtlest active:bg-bg-muted'
            }
            onClick={() => {
              placement == 'center'
                ? toast.clean()
                : toast.create({
                    placement: placement as ToastOptions['placement'],
                    icon: <Info size={'md'} />,
                    title: 'Toast',
                    description:
                      'The toast component is used to give feedback to users after an action has taken place.',
                    className: 'items-center',
                  });
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export const Placement = () => {
  return (
    <DemoExample
      preview={() => <PlacementDemo />}
      snippet={`const PlacementDemo = () => {
  const toast = useToast();

  return (
    <div
      className={'mx-auto grid w-fit gap-2'}
      style={{
        gridTemplateAreas:
          '"top-start     top         top-end"' +
          '".            center       ."' +
          '"bottom-start  bottom      bottom-end"'
      }}
    >
      {[
        ['top-start', 'Top\\nStart'],
        ['top', 'Top'],
        ['top-end', 'Top\\nEnd'],
        ['center', 'Close All'],
        ['bottom-start', 'Bottom\\nStart'],
        ['bottom', 'Bottom'],
        ['bottom-end', 'Bottom\\nEnd']
      ].map(([placement, name]) => {
        return (
          <button
            key={placement}
            style={{ gridArea: placement }}
            className={
              'flex h-12 w-12 text-center leading-tight text-sm cursor-default items-center justify-center rounded bg-bg-subtle hover:bg-bg-subtlest active:bg-bg-muted'
            }
            onClick={() => {
              placement === 'center'
                ? toast.clean()
                : toast.create({
                    placement: placement,
                    icon: <Info size={'md'} />,
                    title: 'Toast',
                    description:
                      'The toast component is used to give feedback to users after an action has taken place.',
                    className: 'items-center'
                  });
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};`}
    />
  );
};
