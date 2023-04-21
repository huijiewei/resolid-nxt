import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'grid grid-cols-5 gap-3'}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>
              {i}
            </div>
          ))}
        </div>
      )}
      snippet={`<div className={'grid grid-cols-5 gap-3'}>
  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
    <div key={i} className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>{i}</div>
  ))}
</div>`}
    />
  );
};

export const Spanning = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'grid grid-cols-5 gap-3'}>
          <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>1</div>
          <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>2</div>
          <div className={'col-span-2 rounded bg-blue-400 p-4 text-center text-lg text-white'}>3</div>
          <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>4</div>
          <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>5</div>
          <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>6</div>
          <div className={'col-span-3 rounded bg-blue-400 p-4 text-center text-lg text-white'}>7</div>
          <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>8</div>
          <div className={'col-span-3 rounded bg-blue-400 p-4 text-center text-lg text-white'}>9</div>
          <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>10</div>
        </div>
      )}
      snippet={`<div className={'grid grid-cols-5 gap-3'}>
  <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>1</div>
  <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>2</div>
  <div className={'col-span-2 rounded bg-blue-400 p-4 text-center text-lg text-white'}>3</div>
  <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>4</div>
  <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>5</div>
  <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>6</div>
  <div className={'col-span-3 rounded bg-blue-400 p-4 text-center text-lg text-white'}>7</div>
  <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>8</div>
  <div className={'col-span-3 rounded bg-blue-400 p-4 text-center text-lg text-white'}>9</div>
  <div className={'rounded bg-blue-400 p-4 text-center text-lg text-white'}>10</div>
</div>`}
    />
  );
};
