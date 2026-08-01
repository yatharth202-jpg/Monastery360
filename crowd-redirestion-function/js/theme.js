/**
 * Monastery360 — Theme Management Module
 * Smart India Hackathon 2026 (SIH25061)
 * 
 * Handles switching between light and dark theme by toggling the 'dark'
 * class on the root <html> element, persisting the choice in localStorage.
 */

// Storage key for user theme selection
const THEME_STORAGE_KEY = "mv-theme";

/**
 * Initializes the theme state based on localStorage or OS preference.
 * Called on page initialization.
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Update theme toggle button UI if present
  updateThemeButtonUI();
}

/**
 * Toggles the theme state between light and dark modes.
 */
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  updateThemeButtonUI();
}

/**
 * Synchronizes the theme button visual icon/text with the current theme.
 */
function updateThemeButtonUI() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (!themeBtn) return;

  const isDark = document.documentElement.classList.contains("dark");
  
  // Sun icon for dark mode (click to switch to light), Moon icon for light mode (click to switch to dark)
  themeBtn.innerHTML = isDark ? `
    <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd"/>
    </svg>
    <span class="text-xs font-semibold">Light theme</span>
  ` : `
    <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
    </svg>
    <span class="text-xs font-semibold">Dark theme</span>
  `;
}
