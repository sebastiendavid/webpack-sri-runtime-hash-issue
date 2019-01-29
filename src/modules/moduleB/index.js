import React from 'react';

const LazyLoadedComponent = React.lazy(() =>
  import(/* webpackChunkName: "moduleB" */ './lazy')
);

export default function ModuleB() {
  return (
    <div>
      <h1>ModuleB</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyLoadedComponent />
      </React.Suspense>
    </div>
  );
}
