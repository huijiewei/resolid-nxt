import { Image } from '@resolid/nxt-ui';
import { BlurhashCanvas } from '~/common/components/BlurhashCanvas';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'grid grid-cols-4 gap-3'}>
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'oJKl?HS}8wIupJR%%LI=i_sot6xY4Tso_N$|IUnmD%n%x]WoRjS5Y6NdIAahxaoI-ns,rrs.j]WV'}
              />
            }
            className={'w-auto'}
            src={'https://www.huijiewei.com/images/01.jpg'}
          />
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'o9Cr_.R%03R.}r=__NxYVtNIJAt6IU%2j]9uoL$%D%X9tQr=RjR+IpR*xt%1RkNHS$n$s9S$ofxE'}
              />
            }
            className={'w-auto rounded'}
            src={'https://www.huijiewei.com/images/02.jpg'}
          />
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'o23b]@?wwEtRsiR$H=DhI9Rij[ac$^%itnV?WFn*RjROkCo#jsf,t3ogV[RiWAfSMwWUo#ofozj['}
              />
            }
            className={'w-auto rounded-lg'}
            src={'https://www.huijiewei.com/images/03.jpg'}
          />
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'o03kjBT|9UR4KtO*33kErVnOs7X2DZm+x+%LrpnB:QrZF{KjOHwMKj%3$$NInmkVXcORNG;3$1K4'}
              />
            }
            className={'w-auto rounded'}
            src={'https://www.huijiewei.com/images/04.jpg'}
          />
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'o7G8=r00x[tS8_D%_19Y9FxZWC%M00%L_49F-;tR00~q?aS6_3D%JA%29F%LIpsl?vNHITD%ROkD'}
              />
            }
            className={'w-auto rounded'}
            src={'https://www.huijiewei.com/images/05.jpg'}
          />
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'o7G8=r00x[tS8_D%_19Y9FxZWC%M00%L_49F-;tR00~q?aS6_3D%JA%29F%LIpsl?vNHITD%ROkD'}
              />
            }
            className={'w-auto rounded blur-sm'}
            src={'https://www.huijiewei.com/images/05.jpg'}
          />
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'o7G8=r00x[tS8_D%_19Y9FxZWC%M00%L_49F-;tR00~q?aS6_3D%JA%29F%LIpsl?vNHITD%ROkD'}
              />
            }
            className={'w-auto rounded sepia'}
            src={'https://www.huijiewei.com/images/05.jpg'}
          />
          <Image
            fallback={
              <BlurhashCanvas
                width={181}
                height={120}
                hash={'o7G8=r00x[tS8_D%_19Y9FxZWC%M00%L_49F-;tR00~q?aS6_3D%JA%29F%LIpsl?vNHITD%ROkD'}
              />
            }
            className={'w-auto rounded grayscale'}
            src={'https://www.huijiewei.com/images/05.jpg'}
          />
        </div>
      )}
      snippet={`<div className={'grid grid-cols-4 gap-3'}>
  <Image className={'w-auto'} src={'https://www.huijiewei.com/images/01.jpg'} />
  <Image className={'w-auto rounded'} src={'https://www.huijiewei.com/images/02.jpg'} />
  <Image className={'w-auto rounded-lg'} src={'https://www.huijiewei.com/images/03.jpg'} />
  <Image className={'w-auto rounded'} src={'https://www.huijiewei.com/images/04.jpg'} />
  <Image className={'w-auto rounded'} src={'https://www.huijiewei.com/images/05.jpg'} />
  <Image className={'w-auto rounded blur-sm'} src={'https://www.huijiewei.com/images/05.jpg'} />
  <Image className={'w-auto rounded sepia'} src={'https://www.huijiewei.com/images/05.jpg'} />
  <Image className={'w-auto rounded grayscale'} src={'https://www.huijiewei.com/images/05.jpg'} />
</div>`}
    />
  );
};

export const Fallback = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'grid grid-cols-4 gap-3'}>
          <Image
            className={'w-auto'}
            fallback={'https://img.temp.im/199x132'}
            src={'https://www.huijiewei.com/images/012.jpg'}
          />
          <Image
            className={'w-auto'}
            fallback={
              <div
                className={
                  'flex h-auto w-auto items-center justify-center border border-gray-200 bg-gray-50 text-gray-400'
                }
              >
                Image load fail
              </div>
            }
            src={'https://www.huijiewei.com/images/012.jpg'}
          />
          <Image
            className={'w-auto'}
            fallback={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAACECAMAAAATF882AAAAOVBMVEXc4+ifsb2nuMPJ09vU3OKtvMfX3+Xa4uepusWktcGis7/P2d/F0NiywMq9ytLBzdW6x9C2xM2vvshvkV5dAAAB3klEQVR42u3V3Y6kIBQE4FOAgCD+9Ps/7HoaXcI4M9nNJMxNfRdYsTGhJLRCRERERERERERERERERERERERERERERP/NH6uobTLT6qXL31kOVx+Pc9yDqLDqc5rHcwlGl2OgZtflb+yAPS8Zb0nnurlmL8PlCXj3KDBOQsHc5S+tCe8eIaGEYA3ieTMiejnzJMMdMIv28ICXk4Ht8leAPerPFinUXdGh5dEWK0572OslbihdvpSSz9GX4u/+XibtsaZVTgEIf+cneBmv9ljwqr0Qu3zZMQeR6SzYaI/bhnQOcdHsx+9H65Gvw1Awd/kWUXSx/rMedo3QfHmNPx+tR0jY31uA1OWbT1iBLJ/1SAA2uYQCOBms9RALzC+DA6bPN3sv9tkjLyXhqNkZbTtc6yHZAPPuMHW5MUjy7NG2K9QjBeNkvNZDBV3I0efbBuB49jiivw7FUr+Nu4zWn4/ZhHqec5fbJNgE++gxYREV9bpBx9H6/Zix6lt/5CroLQu4Dz3u/zALeHHjazx7LEDcJyB3+VYQ68f/cT5MnavN1zNWTkZr52PFac7S52oBfN2V/WMP/8Ipbe+yNye/KGTru/yPfLZOiIiIiIiIiIiIiIiIiIiIiIiIiIiIiOhH/gDRLw2Nq8xTsAAAAABJRU5ErkJggg=='
            }
            src={'https://www.huijiewei.com/images/012.jpg'}
          />
        </div>
      )}
      snippet={`<div className={'grid grid-cols-4 gap-3'}>
  <Image
    className={'w-auto'}
    fallback={'https://img.temp.im/199x132'}
    src={'https://www.huijiewei.com/images/012.jpg'}
  />
  <Image
    className={'w-auto'}
    fallback={
      <div className={'flex h-auto w-auto items-center justify-center border border-gray-200 bg-gray-50 text-gray-400'}>
        Image load fail
      </div>
    }
    src={'https://www.huijiewei.com/images/012.jpg'}
  />
  <Image
    className={'w-auto'}
    fallback={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAACECAMAAAATF882AAAAOVBMVEXc4+ifsb2nuMPJ09vU3OKtvMfX3+Xa4uepusWktcGis7/P2d/F0NiywMq9ytLBzdW6x9C2xM2vvshvkV5dAAAB3klEQVR42u3V3Y6kIBQE4FOAgCD+9Ps/7HoaXcI4M9nNJMxNfRdYsTGhJLRCRERERERERERERERERERERERERERERP/NH6uobTLT6qXL31kOVx+Pc9yDqLDqc5rHcwlGl2OgZtflb+yAPS8Zb0nnurlmL8PlCXj3KDBOQsHc5S+tCe8eIaGEYA3ieTMiejnzJMMdMIv28ICXk4Ht8leAPerPFinUXdGh5dEWK0572OslbihdvpSSz9GX4u/+XibtsaZVTgEIf+cneBmv9ljwqr0Qu3zZMQeR6SzYaI/bhnQOcdHsx+9H65Gvw1Awd/kWUXSx/rMedo3QfHmNPx+tR0jY31uA1OWbT1iBLJ/1SAA2uYQCOBms9RALzC+DA6bPN3sv9tkjLyXhqNkZbTtc6yHZAPPuMHW5MUjy7NG2K9QjBeNkvNZDBV3I0efbBuB49jiivw7FUr+Nu4zWn4/ZhHqec5fbJNgE++gxYREV9bpBx9H6/Zix6lt/5CroLQu4Dz3u/zALeHHjazx7LEDcJyB3+VYQ68f/cT5MnavN1zNWTkZr52PFac7S52oBfN2V/WMP/8Ipbe+yNye/KGTru/yPfLZOiIiIiIiIiIiIiIiIiIiIiIiIiIiIiOhH/gDRLw2Nq8xTsAAAAABJRU5ErkJggg=='}
    src={'https://www.huijiewei.com/images/012.jpg'}
  />
</div>`}
    />
  );
};
