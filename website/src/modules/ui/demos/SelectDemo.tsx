import { NativeSelect, Select } from '@resolid/nxt-ui';
import { Brave } from '~/common/icons/browser/Brave';
import { Firefox } from '~/common/icons/browser/Firefox';
import { GoogleChrome } from '~/common/icons/browser/GoogleChrome';
import { MicrosoftEdge } from '~/common/icons/browser/MicrosoftEdge';
import { Opera } from '~/common/icons/browser/Opera';
import { Safari } from '~/common/icons/browser/Safari';
import { Vivaldi } from '~/common/icons/browser/Vivaldi';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row flex-wrap gap-3'}>
          <Select
            options={Array(20)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            defaultValue={16}
            clearable
          />
          <Select
            className={'w-fit'}
            closeOnSelect={false}
            multiple
            clearable
            options={Array(20)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
          />
        </div>
      )}
      snippet={`<div className={'flex flex-row flex-wrap gap-3'}>
  <Select
    options={Array(20)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    defaultValue={16}
    clearable
  />
  <Select
    className={'w-72'}
    closeOnSelect={false}
    multiple
    clearable
    options={Array(20)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
  />
</div>`}
    />
  );
};

export const Searchable = () => {
  return (
    <DemoExample
      preview={() => (
        <Select
          className={'w-56'}
          options={[
            { value: 'react', label: 'React' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
            { value: 'solid', label: 'Solid' },
            { value: 'preact', label: 'Preact' },
          ]}
          searchable
        />
      )}
      snippet={`<Select
  className={'w-56'}
  options={[
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
    { value: 'solid', label: 'Solid' },
    { value: 'preact', label: 'Preact' }
  ]}
  searchable
/>`}
    />
  );
};

export const Status = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row flex-wrap items-center gap-3'}>
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            disabled
          />
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            invalid
          />
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            required
          />
        </div>
      )}
      snippet={`<div className={'flex flex-row flex-wrap items-center gap-3'}>
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    disabled
  />
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    invalid
  />
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    required
  />
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row flex-wrap items-center gap-3'}>
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            size={'xs'}
          />
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            size={'sm'}
          />
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            size={'md'}
          />
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            size={'lg'}
          />
          <Select
            options={Array(10)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            clearable
            size={'xl'}
          />
        </div>
      )}
      snippet={`<div className={'flex flex-row flex-wrap items-center gap-3'}>
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    size={'xs'}
  />
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    size={'sm'}
  />
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    size={'md'}
  />
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    size={'lg'}
  />
  <Select
    options={Array(10)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    clearable
    size={'xl'}
  />
</div>`}
    />
  );
};

export const Group = () => {
  return (
    <DemoExample
      preview={() => (
        <Select
          options={[
            {
              label: 'Category 1',
              options: [
                { label: 'Option 101', value: '101' },
                { label: 'Option 102', value: '102' },
                { label: 'Option 103', value: '103' },
              ],
            },
            {
              label: 'Category 2',
              options: [
                { label: 'Option 201', value: '201' },
                { label: 'Option 202', value: '202' },
                { label: 'Option 203', value: '203' },
              ],
            },
            {
              label: '',
              options: [
                { label: 'Option 301', value: '301' },
                { label: 'Option 302', value: '302' },
                { label: 'Option 303', value: '303' },
              ],
            },
          ]}
          clearable
        />
      )}
      snippet={`<Select
  options={[
    {
      label: 'Category 1',
      options: [
        { label: 'Option 101', value: '101' },
        { label: 'Option 102', value: '102' },
        { label: 'Option 103', value: '103' }
      ]
    },
    {
      label: 'Category 2',
      options: [
        { label: 'Option 201', value: '201' },
        { label: 'Option 202', value: '202' },
        { label: 'Option 203', value: '203' }
      ]
    },
    {
      label: '',
      options: [
        { label: 'Option 301', value: '301' },
        { label: 'Option 302', value: '302' },
        { label: 'Option 303', value: '303' }
      ]
    }
  ]}
  clearable
/>`}
    />
  );
};

const CustomDemo = () => {
  const browsers = [
    {
      value: 'chrome',
      name: 'Google Chrome',
      icon: <GoogleChrome />,
      description: 'Google Chrome is a fast, easy to use, and secure web browser.',
    },
    {
      value: 'firefox',
      name: 'Firefox',
      icon: <Firefox />,
      description: 'Firefox is a free web browser backed by Mozilla.',
    },
    {
      value: 'safari',
      name: 'Safari',
      icon: <Safari />,
      description: 'Safari is the best way to experience the internet on all your Apple devices.',
    },
    {
      value: 'edge',
      name: 'Microsoft Edge',
      icon: <MicrosoftEdge />,
      description: 'Microsoft Edge is the best browser for the new Bing experience.',
    },
    {
      value: 'opera',
      name: 'Opera',
      icon: <Opera />,
      description:
        'Faster, safer and smarter than default browsers. Fully-featured for privacy, security, and so much more.',
    },
    {
      value: 'brave',
      name: 'Brave',
      icon: <Brave />,
      description: 'Brave Browser is a super fast, private and secure web browser with Adblock.',
    },
    {
      value: 'vivaldi',
      name: 'Vivaldi',
      icon: <Vivaldi />,
      description: "We're building a fast, ultra customizable browser that prioritizes your privacy.",
    },
  ];

  const optionRender = (browser: any) => {
    return (
      <div className={'flex items-center gap-2'}>
        {browser.icon}
        <div>
          <div>{browser.name}</div>
          <div className={'text-gray-500'}>{browser.description}</div>
        </div>
      </div>
    );
  };

  const labelRender = (browser: any) => {
    return (
      <div className={'flex flex-row items-center gap-2'}>
        {browser.icon}
        {browser.name}
      </div>
    );
  };

  return (
    <div className={'flex flex-row gap-3'}>
      <Select
        className={'w-56'}
        options={browsers as any}
        optionRender={optionRender}
        labelRender={labelRender}
        clearable
        searchable
        filter={(keyword, option) => {
          return (
            option.value.toLowerCase().indexOf(keyword.toLowerCase()) != -1 ||
            option.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1
          );
        }}
      />
      <Select
        className={'w-fit'}
        options={browsers as any}
        optionRender={optionRender}
        labelRender={labelRender}
        clearable
        multiple
      />
    </div>
  );
};

export const Custom = () => {
  return (
    <DemoExample
      preview={() => <CustomDemo />}
      snippet={`const CustomDemo = () => {
  const browsers = [
    {
      value: 'chrome',
      name: 'Google Chrome',
      icon: <GoogleChrome />,
      description: 'Google Chrome is a fast, easy to use, and secure web browser.',
    },
    {
      value: 'firefox',
      name: 'Firefox',
      icon: <Firefox />,
      description: 'Firefox is a free web browser backed by Mozilla.',
    },
    {
      value: 'safari',
      name: 'Safari',
      icon: <Safari />,
      description: 'Safari is the best way to experience the internet on all your Apple devices.',
    },
    {
      value: 'edge',
      name: 'Microsoft Edge',
      icon: <MicrosoftEdge />,
      description: 'Microsoft Edge is the best browser for the new Bing experience.',
    },
    {
      value: 'opera',
      name: 'Opera',
      icon: <Opera />,
      description:
        'Faster, safer and smarter than default browsers. Fully-featured for privacy, security, and so much more.',
    },
    {
      value: 'brave',
      name: 'Brave',
      icon: <Brave />,
      description: 'Brave Browser is a super fast, private and secure web browser with Adblock.',
    },
    {
      value: 'vivaldi',
      name: 'Vivaldi',
      icon: <Vivaldi />,
      description: "We're building a fast, ultra customizable browser that prioritizes your privacy.",
    },
  ];

  const optionRender = (browser) => {
    return (
      <div className={'flex items-center gap-2'}>
        {browser.icon}
        <div>
          <div>{browser.name}</div>
          <div className={'text-gray-500'}>{browser.description}</div>
        </div>
      </div>
    );
  };

  const labelRender = (browser) => {
    return (
      <div className={'flex flex-row items-center gap-2'}>
        {browser.icon}
        {browser.name}
      </div>
    );
  };

  return (
    <div className={'flex flex-row gap-3'}>
      <Select
        className={'w-56'}
        options={browsers}
        optionRender={optionRender}
        labelRender={labelRender}
        clearable
        searchable
        filter={(keyword, option) => {
          return (
            option.value.toLowerCase().indexOf(keyword.toLowerCase()) != -1 ||
            option.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1
          );
        }}
      />
      <Select
        className={'w-fit'}
        options={browsers}
        optionRender={optionRender}
        labelRender={labelRender}
        clearable
        multiple
      />
    </div>
  );
};`}
    />
  );
};

export const Native = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row items-center gap-3'}>
          <NativeSelect size={'xs'}>
            <option value={'option1'}>Option 1</option>
            <option value={'option2'}>Option 2</option>
            <option value={'option3'}>Option 3</option>
            <option value={'option4'}>Option 4</option>
            <option value={'option5'}>Option 5</option>
          </NativeSelect>
          <NativeSelect size={'sm'}>
            <option value={'option1'}>Option 1</option>
            <option value={'option2'}>Option 2</option>
            <option value={'option3'}>Option 3</option>
            <option disabled value={'option4'}>
              Option 4
            </option>
            <option value={'option5'}>Option 5</option>
          </NativeSelect>
          <NativeSelect defaultValue={'option3'} size={'md'}>
            <option value={'option1'}>Option 1</option>
            <option value={'option2'}>Option 2</option>
            <option value={'option3'}>Option 3</option>
            <option value={'option4'}>Option 4</option>
            <option value={'option5'}>Option 5</option>
          </NativeSelect>
          <NativeSelect size={'lg'}>
            <option value={'option1'}>Option 1</option>
            <option value={'option2'}>Option 2</option>
            <option value={'option3'}>Option 3</option>
            <option value={'option4'}>Option 4</option>
            <option value={'option5'}>Option 5</option>
          </NativeSelect>
          <NativeSelect size={'xl'}>
            <option value={'option1'}>Option 1</option>
            <option value={'option2'}>Option 2</option>
            <option value={'option3'}>Option 3</option>
            <option value={'option4'}>Option 4</option>
            <option value={'option5'}>Option 5</option>
          </NativeSelect>
        </div>
      )}
      snippet={`<div className={'flex flex-row items-center gap-3'}>
  <NativeSelect size={'xs'}>
    <option value={'option1'}>Option 1</option>
    <option value={'option2'}>Option 2</option>
    <option value={'option3'}>Option 3</option>
    <option value={'option4'}>Option 4</option>
    <option value={'option5'}>Option 5</option>
  </NativeSelect>
  <NativeSelect size={'sm'}>
    <option value={'option1'}>Option 1</option>
    <option value={'option2'}>Option 2</option>
    <option value={'option3'}>Option 3</option>
    <option disabled value={'option4'}>Option 4</option>
    <option value={'option5'}>Option 5</option>
  </NativeSelect>
  <NativeSelect defaultValue={'option3'} size={'md'}>
    <option value={'option1'}>Option 1</option>
    <option value={'option2'}>Option 2</option>
    <option value={'option3'}>Option 3</option>
    <option value={'option4'}>Option 4</option>
    <option value={'option5'}>Option 5</option>
  </NativeSelect>
  <NativeSelect size={'lg'}>
    <option value={'option1'}>Option 1</option>
    <option value={'option2'}>Option 2</option>
    <option value={'option3'}>Option 3</option>
    <option value={'option4'}>Option 4</option>
    <option value={'option5'}>Option 5</option>
  </NativeSelect>
  <NativeSelect size={'xl'}>
    <option value={'option1'}>Option 1</option>
    <option value={'option2'}>Option 2</option>
    <option value={'option3'}>Option 3</option>
    <option value={'option4'}>Option 4</option>
    <option value={'option5'}>Option 5</option>
  </NativeSelect>
</div>`}
    />
  );
};

export const BigData = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row flex-wrap gap-3'}>
          <Select
            options={Array(1000)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            defaultValue={16}
            clearable
          />
          <Select
            className={'w-36'}
            options={Array(1000)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
            defaultValue={16}
            searchable
            clearable
          />
          <Select
            className={'w-fit'}
            closeOnSelect={false}
            multiple
            clearable
            options={Array(1000)
              .fill(null)
              .map((_, idx) => idx + 1)
              .map((eve) => ({ value: eve, label: `Option ${eve}` }))}
          />
        </div>
      )}
      snippet={`<div className={'flex flex-row flex-wrap gap-3'}>
  <Select
    options={Array(1000)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    defaultValue={16}
    clearable
  />
  <Select
    className={'w-36'}
    options={Array(1000)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
    defaultValue={16}
    searchable
    clearable
  />
  <Select
    className={'w-fit'}
    closeOnSelect={false}
    multiple
    clearable
    options={Array(1000)
      .fill(null)
      .map((_, idx) => idx + 1)
      .map((eve) => ({ value: eve, label: \`Option \${eve}\` }))}
  />
</div>`}
    />
  );
};
