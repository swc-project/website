import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  Controlled as CodeMirror,
  UnControlled as UnControlledCodeBlock,
} from "react-codemirror2";
import { sampleCode } from "./sampleCode";
import { loadReplState, saveReplState } from "./urlHash";

const DEBOUNCE_MS = 500;
const codeMirrorOptions: ComponentPropsWithoutRef<
  typeof CodeMirror
>["options"] = {
  mode: { name: "javascript", typescript: true },
  lineNumbers: true,
  lineWrapping: true,
};
const noop = () => {};

export interface ReplProps {}

export const Repl: React.FC<ReplProps> = () => {
  const { rawCode: initRawCode, rawConfig: initRawConfig } = useMemo(() => {
    const restoredReplState = loadReplState();
    const rawCode = restoredReplState.rawCode || sampleCode;
    const rawConfig = restoredReplState.rawConfig || "{}";
    return { rawCode, rawConfig };
  }, []);
  const [rawCode, setRawCode] = useState(initRawCode);
  const [rawConfig, setRawConfig] = useState(initRawConfig);
  const [loadingImportsStatus, setLoadingImportsStatus] = useState<
    "loading" | "success" | "fail"
  >("loading");
  const [compiledCode, setCompiledCode] = useState(`const test = 1`);
  const [compileError, setCompileError] = useState<null | string>(null);
  const compileTimeout = useRef<number | null>(null);

  const swcWasm: MutableRefObject<typeof import("@swc/wasm-web") | null> =
    useRef(null);
  const CodeMirrorLazyImported: MutableRefObject<
    typeof import("react-codemirror2") | null
  > = useRef(null);
  const RawCodeEditor: MutableRefObject<CodeMirror.Editor | null> =
    useRef(null);
  const CompiledCodeEditor: MutableRefObject<CodeMirror.Editor | null> =
    useRef(null);
  const [editorsLoadedCount, setEditorsLoadedCount] = useState(0);

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      try {
        [swcWasm.current, CodeMirrorLazyImported.current] = await Promise.all([
          import("@swc/wasm-web"),
          import("react-codemirror2"),
          import("codemirror/mode/javascript/javascript"),
          import("../../../node_modules/codemirror/lib/codemirror.css"),
        ]);

        const importWasm = swcWasm.current.default();
        await importWasm;
        setLoadingImportsStatus("success");
      } catch (e) {
        setLoadingImportsStatus("fail");
      }
    }
    importAndRunSwcOnMount();
  }, []);

  useEffect(() => {
    if ("success" !== loadingImportsStatus || !swcWasm.current) return;

    compileTimeout.current = window.setTimeout(() => {
      let config: object = {};
      saveReplState({ rawCode, rawConfig });

      try {
        config = JSON.parse(rawConfig);
      } catch (e) {
        setCompileError(`Failed to parse "swcrc": ${e.message}`);
        return;
      }
      try {
        setCompiledCode(swcWasm.current.transformSync(rawCode, config).code);
        setCompileError(null);
      } catch (errorMessage) {
        setCompileError(errorMessage);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (compileTimeout.current) window.clearTimeout(compileTimeout.current);
    };
  }, [loadingImportsStatus, rawCode, rawConfig]);

  const onRawCodeChange: ComponentPropsWithRef<
    typeof CodeMirror
  >["onBeforeChange"] = useCallback((_editor, _data, value) => {
    setRawCode(value);
  }, []);

  const onRawConfigChange: ComponentPropsWithRef<
    typeof CodeMirror
  >["onBeforeChange"] = useCallback((_editor, _data, value) => {
    setRawConfig(value);
  }, []);

  const onRawCodeEditorDidMount: ComponentPropsWithRef<
    typeof CodeMirror
  >["editorDidMount"] = useCallback((editor) => {
    CompiledCodeEditor.current = editor;
    setEditorsLoadedCount((prev) => prev + 1);
  }, []);

  const onCompiledCodeEditorDidMount: ComponentPropsWithRef<
    typeof CodeMirror
  >["editorDidMount"] = useCallback((editor) => {
    RawCodeEditor.current = editor;
    setEditorsLoadedCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    console.log(editorsLoadedCount);
    if (editorsLoadedCount !== 2) return;
    if (!CompiledCodeEditor.current || !RawCodeEditor.current) return;

    console.log(CompiledCodeEditor.current, RawCodeEditor.current);
    [CompiledCodeEditor.current, RawCodeEditor.current].forEach((editor) => {
      editor.setSize(`100%`, `500px`);
    });
  }, [editorsLoadedCount]);

  return (
    <section>
      {(() => {
        switch (loadingImportsStatus) {
          case `loading`:
            return <h2>Please wait. Loading wasm and js files...</h2>;
          case `fail`:
            return <h2>Loading wasm and js files failed. Please try again.</h2>;
          case `success`:
            return (
              <article
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: `100%`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h2>Your code</h2>
                  <div style={{ flex: 9 }}>
                    <CodeMirrorLazyImported.current.Controlled
                      value={rawCode}
                      options={codeMirrorOptions}
                      onBeforeChange={onRawCodeChange}
                      onChange={noop}
                      editorDidMount={onRawCodeEditorDidMount}
                    />
                  </div>

                  <h2>Your swcrc</h2>
                  <div style={{ flex: 1 }}>
                    <CodeMirrorLazyImported.current.Controlled
                      value={rawConfig}
                      options={{
                        mode: { name: "json" },
                        lineNumbers: true,
                        lineWrapping: true,
                      }}
                      onBeforeChange={onRawConfigChange}
                      onChange={noop}
                      editorDidMount={noop}
                    />
                  </div>
                </div>
                <div style={{ width: `100%` }}>
                  <h2>Compiled code</h2>
                  <CodeMirrorLazyImported.current.UnControlled
                    value={compileError ?? compiledCode}
                    options={codeMirrorOptions}
                    editorDidMount={onCompiledCodeEditorDidMount}
                  />
                </div>
              </article>
            );
        }
      })()}
    </section>
  );
};
