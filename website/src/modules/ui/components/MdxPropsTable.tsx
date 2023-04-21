import { isString } from '@resolid/nxt-utils';

export type MdxPropsTableProps = {
  title?: string | boolean;
  component: string;
  componentProps: {
    name: string;
    type: string;
    description: string;
    defaultValue?: string;
    required: boolean;
  }[];
};

export const MdxPropsTable = ({ componentProps, title, component }: MdxPropsTableProps) => {
  return (
    <table className={'w-full my-4 table-auto border-separate rounded border border-gray-200'}>
      {title && (
        <caption className={'mb-1.5 text-left font-bold text-gray-500'}>{isString(title) ? title : component}</caption>
      )}
      <thead>
        <tr className={'bg-gray-50'}>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>Name</th>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>Description</th>
          <th className={'hidden whitespace-nowrap p-2 text-center tablet:table-cell'}>Default</th>
          <th className={'hidden whitespace-nowrap p-2 text-center tablet:table-cell'}>Required</th>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>Type</th>
        </tr>
      </thead>
      <tbody>
        {componentProps?.map((prop, i) => (
          <tr
            className={
              'last:border-none last:pb-0 last:mb-0 tablet:table-row tablet:flex-no-wrap tablet:border-none tablet:mb-0 mb-[1px] flex flex-row flex-wrap border-b border-b-gray-200 pb-[1px]'
            }
            key={`${prop.name}-${i}`}
          >
            <td className={'tablet:table-cell tablet:p-2 tablet:w-auto block w-full whitespace-nowrap'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">Name</span>
              {prop.name}
            </td>
            <td className={'tablet:table-cell tablet:p-2 tablet:w-auto block w-full'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">
                Description
              </span>
              {prop.description || '-'}
            </td>
            <td
              className={'tablet:table-cell tablet:text-center tablet:w-auto table:p-2 block w-full whitespace-nowrap'}
            >
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">Default</span>
              {prop.defaultValue || '-'}
            </td>
            <td
              className={'tablet:table-cell tablet:text-center tablet:w-auto tablet:p-2 block w-full whitespace-nowrap'}
            >
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">Required</span>
              {prop.required ? 'true' : 'false'}
            </td>
            <td className={'tablet:table-cell tablet:p-2 tablet:w-auto block w-full'}>
              <span className="mr-3 inline-block w-1/5 bg-gray-50 p-2 text-sm font-bold tablet:hidden">Type</span>
              {prop.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
