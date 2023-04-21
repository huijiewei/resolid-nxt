import { Divider, type DividerProps } from '@resolid/nxt-ui';
import { Info } from '~/common/icons/Info';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<DividerProps>
      componentProps={[
        {
          propName: 'variant',
          control: 'select',
          options: ['solid', 'dotted', 'dashed'],
          defaultValue: 'solid',
        },
        {
          propName: 'color',
          control: 'color',
          options: ['primary', 'neutral', 'success', 'warning', 'danger'],
          defaultValue: 'neutral',
        },
        {
          propName: 'vertical',
          control: 'switch',
          defaultValue: false,
        },
        {
          propName: 'size',
          control: 'number',
          defaultValue: 1,
        },
      ]}
      preview={(props) => <Divider {...props} />}
      snippet={`<Divider {...props} />`}
    />
  );
};

export const Variants = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 py-3'}>
          <Divider />
          <Divider variant={'dashed'} />
          <Divider variant={'dotted'} />
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 py-3'}>
  <Divider />
  <Divider variant={'dashed'} />
  <Divider variant={'dotted'} />
</div>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 py-3'}>
          <Divider />
          <Divider color={'primary'} />
          <Divider color={'success'} />
          <Divider color={'warning'} />
          <Divider color={'danger'} />
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 py-3'}>
  <Divider />
  <Divider color={'primary'} />
  <Divider color={'success'} />
  <Divider color={'warning'} />
  <Divider color={'danger'} />
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 py-3'}>
          <Divider />
          <Divider size={2} />
          <Divider size={3} />
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 py-3'}>
  <Divider />
  <Divider size={2} />
  <Divider size={3} />
</div>`}
    />
  );
};

export const Vertical = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-5 px-3 h-6 items-center'}>
          <span>Word</span>
          <Divider vertical />
          <span>Word</span>
          <Divider vertical variant="dashed" />
          <span>Word</span>
          <Divider vertical variant="dotted" />
          <span>Word</span>
          <Divider vertical color={'primary'} />
          <span>Word</span>
          <Divider vertical size={3} color={'success'} variant="dotted" />
          <span>Word</span>
          <Divider vertical size={2} color={'danger'} variant="dashed" />
          <span>Word</span>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-5 px-3 h-6 items-center'}>
  <span>Word</span>
  <Divider vertical/>
  <span>Word</span>
  <Divider vertical variant="dashed"/>
  <span>Word</span>
  <Divider vertical variant="dotted"/>
  <span>Word</span>
  <Divider vertical color={'primary'}/>
  <span>Word</span>
  <Divider vertical size={3} color={'success'} variant="dotted"/>
  <span>Word</span>
  <Divider vertical size={2} color={'danger'} variant="dashed"/>
  <span>Word</span>
</div>`}
    />
  );
};

export const TextLabel = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 py-3'}>
          <Divider>Divider</Divider>
          <Divider position={'left'} variant="dashed">
            Divider
          </Divider>
          <Divider variant="dotted">Divider</Divider>
          <Divider color={'primary'}>
            <Info size={'xs'} className={'mr-1'} /> Divider
          </Divider>
          <Divider position={'right'} size={3} color={'success'} variant="dotted">
            Divider
          </Divider>
          <Divider size={2} color={'danger'} variant="dashed">
            <a href={'#text-label'} className={'text-blue-500 hover:underline'}>
              Link Divider
            </a>
          </Divider>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 py-3'}>
  <Divider>Divider</Divider>
  <Divider position={'left'} variant="dashed">
    Divider
  </Divider>
  <Divider variant="dotted">Divider</Divider>
  <Divider color={'primary'}>
    <Info className={'mr-1'} /> Divider
  </Divider>
  <Divider position={'right'} size={3} color={'success'} variant="dotted">
    Divider
  </Divider>
  <Divider size={2} color={'danger'} variant="dashed">
    <a href={'#TextLabel'} className={'text-blue-500 hover:underline'}>
      Link Divider
    </a>
  </Divider>
</div>`}
    />
  );
};
