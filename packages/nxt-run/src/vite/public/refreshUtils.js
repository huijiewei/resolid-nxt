// noinspection JSUnresolvedReference

if (typeof window !== 'undefined') {
  if (window.__vite_plugin_react_runtime_loaded__) {
    throw new Error('React refresh runtime was loaded twice. Maybe you forgot the base path?');
  }
  window.__vite_plugin_react_runtime_loaded__ = true;
}

function debounce(fn, delay) {
  let handle;
  return () => {
    clearTimeout(handle);
    handle = setTimeout(fn, delay);
  };
}

const enqueueUpdate = debounce(exports.performReactRefresh, 16);

function registerExportsForReactRefresh(filename, moduleExports) {
  for (const key in moduleExports) {
    if (key === '__esModule') continue;
    const exportValue = moduleExports[key];
    if (exports.isLikelyComponentType(exportValue)) {
      // 'export' is required to avoid key collision when renamed exports that
      // shadow a local component name: https://github.com/vitejs/vite-plugin-react/issues/116
      // The register function has an identity check to not register twice the same component,
      // so this is safe to not used the same key here.
      exports.register(exportValue, filename + ' export ' + key);
    }
  }
}

function validateRefreshBoundaryAndEnqueueUpdate(prevExports, nextExports) {
  if (!predicateOnExport(prevExports, (key) => ignoreResolidExport(key) || !!nextExports[key])) {
    return 'Could not Fast Refresh (export removed)';
  }

  let hasExports = false;
  const allExportsAreComponentsOrUnchanged = predicateOnExport(nextExports, (key, value) => {
    hasExports = true;
    if (ignoreResolidExport(key)) return true;
    if (exports.isLikelyComponentType(value)) return true;
    if (!prevExports[key]) return false;
    return prevExports[key] === nextExports[key];
  });
  if (hasExports && allExportsAreComponentsOrUnchanged) {
    enqueueUpdate();
  } else {
    return 'Could not Fast Refresh. Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports';
  }
}

function predicateOnExport(moduleExports, predicate) {
  for (const key in moduleExports) {
    if (key === '__esModule') continue;
    const desc = Object.getOwnPropertyDescriptor(moduleExports, key);
    if (desc && desc.get) return false;
    if (!predicate(key, moduleExports[key])) return false;
  }
  return true;
}

const IGNORE_RESOLID_EXPORTS = ['handle', 'shouldRevalidate', 'unstable_shouldReload'];

function ignoreResolidExport(moduleExport) {
  return IGNORE_RESOLID_EXPORTS.includes(moduleExport);
}

function __hmr_import(module) {
  return import(/* @vite-ignore */ module);
}

exports.__hmr_import = __hmr_import;

exports.registerExportsForReactRefresh = registerExportsForReactRefresh;
exports.validateRefreshBoundaryAndEnqueueUpdate = validateRefreshBoundaryAndEnqueueUpdate;
