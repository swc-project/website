import { Layout as BasicLayout } from "@rspress/core/theme-original";
import "./index.css";

function PoweredByZephyr() {
  return (
    <footer className="powered-by-zephyr">
      <a href="https://zephyr-cloud.io" target="_blank" rel="noopener">
        <span>Powered by</span>
        <strong>Zephyr Cloud</strong>
      </a>
    </footer>
  );
}

const Layout = () => <BasicLayout bottom={<PoweredByZephyr />} />;

export { Layout };
export * from "@rspress/core/theme-original";
