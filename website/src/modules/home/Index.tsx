import { Button } from '@resolid/nxt-ui';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '~/common/components/DefaultLayout';
import { ArrowRight } from '~/common/icons/ArrowRight';
import { Github } from '~/common/icons/Github';

export default function HomeIndex() {
  return (
    <DefaultLayout>
      <main className={'flex min-h-[calc(100vh-17em)] flex-col items-center justify-center'}>
        <p
          className={
            'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 bg-clip-text text-[5em] font-bold leading-normal text-transparent'
          }
        >
          Resolid Nxt
        </p>
        <p className={'mt-10 text-lg'}>
          React SSR framework that combines the power of React-Router and TailwindCSS to give you a seamless web
          development experience.
        </p>

        <p className={'mt-10 flex flex-row gap-9'}>
          <Button size={'xl'} as={Link} to={'/run'}>
            Get Started
            <ArrowRight className={'ml-2'} />
          </Button>
          <Button
            size={'xl'}
            color={'neutral'}
            variant={'outline'}
            as={'a'}
            target={'_blank'}
            rel="noopener noreferrer"
            href="https://github.com/resolid/nxt"
          >
            <Github className={'mr-2'} />
            GitHub
          </Button>
        </p>
      </main>
    </DefaultLayout>
  );
}
