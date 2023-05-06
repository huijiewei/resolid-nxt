import { Checkbox, Input } from '@resolid/nxt-ui';
import { AtSymbol } from '~/common/icons/AtSymbol';
import { Lock } from '~/common/icons/Lock';

export const FormExample = () => {
  return (
    <>
      <div className={'flex flex-row items-center justify-start gap-4'}>
        <div className={'flex flex-col'}>
          <label htmlFor={'feFirstName'} className={''}>
            First name <span className={'text-red-500'}>*</span>
          </label>
          <Input className={'w-full'} placeholder={'Your first name'} id={'feFirstName'} />
        </div>
        <div className={'flex flex-col'}>
          <label htmlFor={'feLastName'} className={''}>
            Last name <span className={'text-red-500'}>*</span>
          </label>
          <Input className={'w-full'} placeholder={'Your last name'} id={'feLastName'} />
        </div>
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'feEmail'} className={''}>
          Email <span className={'text-red-500'}>*</span>
        </label>
        <Input prefix={<AtSymbol />} className={'w-full'} placeholder={'Your email'} id={'feEmail'} />
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'fePassword'} className={''}>
          Password <span className={'text-red-500'}>*</span>
        </label>
        <Input prefix={<Lock />} className={'w-full'} placeholder={'Your password'} id={'fePassword'} />
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'fePasswordRepeat'} className={''}>
          Confirm Password <span className={'text-red-500'}>*</span>
        </label>
        <Input prefix={<Lock />} className={'w-full'} placeholder={'Your confirm Password'} id={'fePasswordRepeat'} />
      </div>
      <div>
        <Checkbox defaultChecked={true}>Agree to the user agreement and privacy policy.</Checkbox>
      </div>
    </>
  );
};
