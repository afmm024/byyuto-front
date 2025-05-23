import { type ReactNode, forwardRef } from 'react';

import {
  Box,
  type BoxProps,
  type PaperProps,
  createPolymorphicComponent,
} from '@mantine/core';

type SurfaceProps = { children: ReactNode } & BoxProps & PaperProps;

const Surface = createPolymorphicComponent<'div', SurfaceProps>(
  forwardRef<HTMLDivElement, SurfaceProps>(({ children, ...others }, ref) => (
    <Box component="div" {...others} ref={ref}>
      {children}
    </Box>
  )),
);

Surface.displayName = 'Surface';

export default Surface;