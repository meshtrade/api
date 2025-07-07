declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.ComponentType<React.ComponentProps<'svg'>>;
  export { ReactComponent };
  const src: string;
  export default ReactComponent;
}