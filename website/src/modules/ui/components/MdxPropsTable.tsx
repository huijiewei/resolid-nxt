import { isString } from '@resolid/nxt-utils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('ui');

  return (
    <table className={'w-full my-4 table-auto border-separate rounded border border-bg-subtle'}>
      {title && (
        <caption className={'mb-1.5 text-left font-bold text-fg-muted'}>{isString(title) ? title : component}</caption>
      )}
      <thead>
        <tr className={'bg-bg-subtle'}>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>{t('prop.name')}</th>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>{t('prop.description')}</th>
          <th className={'hidden whitespace-nowrap p-2 text-center tablet:table-cell'}>{t('prop.default')}</th>
          <th className={'hidden whitespace-nowrap p-2 text-center tablet:table-cell'}>{t('prop.required')}</th>
          <th className={'hidden whitespace-nowrap p-2 text-left tablet:table-cell'}>{t('prop.type')}</th>
        </tr>
      </thead>
      <tbody>
        {componentProps?.map((prop, i) => (
          <tr
            className={
              'last:border-none last:pb-0 last:mb-0 tablet:table-row tablet:flex-no-wrap tablet:border-none tablet:mb-0 mb-[1px] flex flex-row flex-wrap border-b border-b-bg-subtle pb-[1px]'
            }
            key={`${prop.name}-${i}`}
          >
            <td className={'tablet:table-cell tablet:p-2 tablet:w-auto font-bold block w-full whitespace-nowrap'}>
              <span className="mr-3 inline-block w-[5.5rem] bg-bg-subtle p-2 text-sm font-bold tablet:hidden">
                {t('prop.name')}
              </span>
              {prop.name}
            </td>
            <td className={'tablet:table-cell tablet:p-2 tablet:w-auto block w-full whitespace-pre-line'}>
              <span className="mr-3 inline-block w-[5.5rem] bg-bg-subtle p-2 text-sm font-bold tablet:hidden">
                {t('prop.description')}
              </span>
              {prop.description || '-'}
            </td>
            <td
              className={'tablet:table-cell tablet:text-center tablet:w-auto table:p-2 block w-full whitespace-nowrap'}
            >
              <span className="mr-3 inline-block w-[5.5rem] bg-bg-subtle p-2 text-sm font-bold tablet:hidden">
                {t('prop.default')}
              </span>
              {prop.defaultValue || '-'}
            </td>
            <td
              className={'tablet:table-cell tablet:text-center tablet:w-auto tablet:p-2 block w-full whitespace-nowrap'}
            >
              <span className="mr-3 inline-block w-[5.5rem] bg-bg-subtle p-2 text-sm font-bold tablet:hidden">
                {t('prop.required')}
              </span>
              {prop.required ? 'true' : 'false'}
            </td>
            <td className={'tablet:table-cell tablet:p-2 tablet:w-auto block w-full'}>
              <span className="mr-3 inline-block w-[5.5rem] bg-bg-subtle p-2 text-sm font-bold tablet:hidden">
                {t('prop.type')}
              </span>
              {prop.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
