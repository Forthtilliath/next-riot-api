// eslint-disable-next-line @typescript-eslint/no-unused-vars -- needed for TS to treat this as a module augmentation
import * as React from 'react';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- required by the augmented interface's shape
  interface HTMLAttributes<T> {
    active?: string;
  }
}
