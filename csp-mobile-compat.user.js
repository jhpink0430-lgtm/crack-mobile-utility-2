// ==UserScript==
// @name         🎨 Crack Scene Painter 모바일 호환
// @namespace    csp-mobile-compat-jhpink0430
// @version      1.0.0
// @description  원본 CSP 5.6.0의 삽화 갤러리와 설정을 모바일 화면에서 열고 사용할 수 있게 합니다. 원본과 함께 켜세요.
// @match        https://crack.wrtn.ai/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    // The original script injects its stylesheet after a delayed boot.
    // Important declarations keep these mobile rules effective in either load order.
    const css = `
@media (max-width: 1179px) {
  #csp-v35-root { place-items: stretch !important; overflow: hidden !important; }
  #csp-v35-root::after { display: none !important; content: none !important; }
  #csp-v35-root .v35-app,
  #csp-v35-root .v35-app.settings,
  #csp-v35-root .v35-app.gallery {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    height: 100% !important;
    min-width: 0 !important;
    min-height: 0 !important;
    max-width: none !important;
    max-height: none !important;
    border-radius: 0 !important;
  }
  #csp-v35-root .v35-top { min-width: 0; flex-shrink: 0; }
  #csp-v35-root .v35-brand { min-width: 0; }
  #csp-v35-root .gallery-body,
  #csp-v35-root .settings-body,
  #csp-v35-root .settings-content { min-width: 0; min-height: 0; }
  #csp-v35-root .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
  }
  #csp-v35-root .settings-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) !important;
    grid-template-rows: auto minmax(0, 1fr);
  }
  #csp-v35-root .settings-nav {
    min-width: 0;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  #csp-v35-root .settings-nav .navbtn { flex: 0 0 auto; }
  #csp-v35-root .settings-nav .grow { display: none; }
  #csp-v35-root .settings-page,
  #csp-v35-root .settings-page .section,
  #csp-v35-root .settings-page .field { min-width: 0; }
  #csp-v35-root .settings-page .setting-row {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 8px !important;
  }
  #csp-v35-root .settings-page .master {
    grid-template-columns: minmax(0, 1fr) !important;
    min-height: 0 !important;
  }
  #csp-v35-root .settings-page .list { border-right: 0; }
  #csp-v35-root .settings-page .connection-actions { flex-wrap: wrap; }
  #csp-v35-root .settings-page .connection-actions .grow { display: none; }
  #csp-v35-root .settings-page .usage-table { overflow-x: auto; }
  #csp-v35-root .viewer-panel {
    width: 100%;
    max-width: 100% !important;
    max-height: 100%;
  }
  #csp-v35-root .viewer-img {
    max-width: calc(100vw - 24px) !important;
    max-height: calc(100dvh - 110px) !important;
  }
}
@media (max-width: 800px) {
  #csp-v35-root .v35-top { padding: 0 8px; gap: 4px; }
  #csp-v35-root .v35-brand { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  #csp-v35-root .v35-app.gallery .gallery-body { padding: 12px; }
  #csp-v35-root .gallery-toolbar { flex-wrap: wrap; }
  #csp-v35-root #v35-g-search { width: 100% !important; }
  #csp-v35-root #v35-g-sort { width: 130px !important; }
  #csp-v35-root .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px; }
  #csp-v35-root .settings-nav { padding: 5px 8px; gap: 3px; }
  #csp-v35-root .settings-nav .navbtn { height: 38px; padding: 0 10px; }
  #csp-v35-root .settings-content { padding: 14px 12px; overflow: auto; -webkit-overflow-scrolling: touch; }
  #csp-v35-root .settings-page .grid2,
  #csp-v35-root .settings-page .grid3 { grid-template-columns: minmax(0, 1fr) !important; }
  #csp-v35-root .settings-page .input,
  #csp-v35-root .settings-page .select,
  #csp-v35-root .settings-page .ta { min-width: 0; max-width: 100%; }
  #csp-v35-root .settings-page .connection-actions .btn { max-width: 100%; white-space: normal; height: auto; min-height: 36px; }
  #csp-v35-root .viewer { padding: 4px; }
  #csp-v35-root .viewer-panel { border-radius: 8px; }
  #csp-v35-root .viewer .v35-brand { max-width: 35vw; }
  #csp-v35-root .viewer #v35-v-studio { max-width: 110px; overflow: hidden; text-overflow: ellipsis; }
  #csp-v35-root .viewer-footer { padding: 0 8px; gap: 5px; }
  #csp-v35-root .viewer-footer .help:last-child { display: none; }

  /* A gallery image can open its studio; keep the editor reachable too. */
  #csp-v35-root .v35-app:not(.settings):not(.gallery) > .v35-top {
    height: auto; min-height: 46px; max-height: 96px;
    flex-basis: auto; flex-wrap: wrap; overflow-y: auto;
  }
  #csp-v35-root .v35-app:not(.settings):not(.gallery) > .v35-top .select { width: auto !important; max-width: 44vw; flex: 1 1 90px; }
  #csp-v35-root .studio,
  #csp-v35-root .studio.panel {
    display: flex !important; flex-direction: column; min-width: 0;
    overflow-y: auto; -webkit-overflow-scrolling: touch;
  }
  #csp-v35-root .studio .rail {
    flex-direction: row; flex: 0 0 auto; padding: 4px 8px;
    border-right: 0; border-bottom: 1px solid var(--line);
  }
  #csp-v35-root .studio .context-panel {
    flex: 0 0 auto; max-height: 45dvh; overflow: auto;
    border-right: 0; border-bottom: 1px solid var(--line);
  }
  #csp-v35-root .studio .output { flex: 0 0 auto; height: min(50dvh, 420px); }
  #csp-v35-root .studio .inspector { flex: 0 0 auto; min-height: 240px; overflow: visible; border-left: 0; }
  #csp-v35-root .studio .inspector-body { flex: 0 0 auto; overflow: visible; }
  #csp-v35-root .canvas-tools { opacity: 1; }
  #csp-v35-root .v35-app > .bottom {
    gap: 6px; overflow-x: auto; overflow-y: hidden;
    -webkit-overflow-scrolling: touch; flex-shrink: 0;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
  #csp-v35-root .v35-app > .bottom > * { flex-shrink: 0; }
  #csp-v35-root .v35-app > .bottom .grow { min-width: 2px; }
}
`;
    const style = document.createElement('style');
    style.id = 'csp-mobile-compat-style';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
})();
