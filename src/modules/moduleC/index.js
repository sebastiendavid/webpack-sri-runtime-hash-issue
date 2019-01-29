import React from 'react';

const LazyLoadedComponent = React.lazy(() =>
  import(/* webpackChunkName: "moduleC" */ './lazy')
);

export default function ModuleC() {
  return (
    <div>
      <h1>ModuleC</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyLoadedComponent />
      </React.Suspense>
    </div>
  );
}
