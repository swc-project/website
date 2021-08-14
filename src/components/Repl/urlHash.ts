interface ReplState {
  rawCode?: string;
  rawConfig?: string;
}

export const loadReplState: () => ReplState = function () {
  const hash = window.location.hash.slice(1);
  try {
    return JSON.parse(decodeURIComponent(hash));
  } catch {
    return {};
  }
};

export const saveReplState: (state: ReplState) => void = function (state) {
  const hash = encodeURIComponent(JSON.stringify(state));
  if (
    typeof URL === "function" &&
    typeof history === "object" &&
    typeof history.replaceState === "function"
  ) {
    const url = new URL(location.href);
    url.hash = hash;
    history.replaceState(null, null, url);
  } else {
    location.hash = hash;
  }
};
