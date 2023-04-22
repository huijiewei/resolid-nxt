import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@resolid/nxt-ui';
import { ChevronRight } from '~/common/icons/ChevronRight';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem currentPage>
            <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      snippet={`<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href="#">Docs</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem currentPage>
    <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>`}
    />
  );
};

export const Separator = () => {
  return (
    <DemoExample
      preview={() => (
        <Breadcrumb separator="-">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">About</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem currentPage>
            <BreadcrumbLink href="#">Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      snippet={`<Breadcrumb separator="-">
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href="#">About</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem currentPage>
    <BreadcrumbLink href="#">Contact</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>`}
    />
  );
};

export const IconSeparator = () => {
  return (
    <DemoExample
      preview={() => (
        <Breadcrumb separator={<ChevronRight className={'text-fg-muted'} size={'0.875em'} />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">About</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem currentPage>
            <BreadcrumbLink href="#">Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      snippet={`<Breadcrumb separator={<ChevronRight className={'text-fg-muted'} size={'0.875em'} />}>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href="#">About</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem currentPage>
    <BreadcrumbLink href="#">Contact</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>`}
    />
  );
};
