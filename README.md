# Steps to reproduce issue

- Install node modules

```bash
npm ci
```

- Build project

```bash
npm run build
```

- Copy `runtime` file:

```bash
cp build/runtime.94ebc40d8dbd2fa73811.js runtime1.js
```

- Change `src/modules/moduleA` content, for example:

Before:

```javascript
import React from 'react';

export default function ModuleA() {
  return <div>ModuleA</div>;
}
```

After:

```javascript
import React from 'react';

export default function ModuleA() {
  return <div>ModuleA FOOBAR</div>;
}
```

- Build again

```bash
npm run build
```

- Copy `runtime` file: `build/runtime.94ebc40d8dbd2fa73811.js`.

```bash
cp build/runtime.94ebc40d8dbd2fa73811.js runtime2.js
```

Notice that the hash in the filename did not change.

- Compare the 2 `runtime` files

```bash
diff runtime1.js runtime2.js
```

```diff
var sriHashes = {
  "vendors": "sha256-yg3QzpkruWNm6WDkQxkfriaJxgtrrkRt8Q0dHCJQq90=",
- "app": "sha256-mvIw4Dp56Bv+nKsu9opwjBXHjonZgZ74q/HELYx401A=",
+ "app": "sha256-jlJ+6K39QeYSRDEzkeFV9NpXhrAULzxUAJTG1RtjBVg=",
  "moduleB": "sha256-GHBHstHDefAN+5Hv7+vVQj5fK0qzELaR/nkh75mVJjk=",
  "moduleC": "sha256-CLQxfIsv0UujQXZL1Ezz3Rb/guLqcWahQjSGnaebpuQ="
};
```

Subresource integrity hash from `app` chunk changed.

- So the `runtime` filename did not change, but the content did. So if this file is cached by the browser and loaded from this cache: an integrity error occurs.
