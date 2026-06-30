import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
// The original search bar provided by @easyops-cn/docusaurus-search-local.
// We keep all of its search behaviour intact and simply render it inside a
// centered modal instead of an inline navbar dropdown.
import SearchBar from '@theme-original/SearchBar';
import { useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';

import styles from './styles.module.css';

type Props = {
  // Forwarded to the wrapped SearchBar (used by the mobile navbar).
  handleSearchBarToggle?: (toggle: boolean) => void;
};

function MagnifierIcon(): React.JSX.Element {
  return (
    <svg
      className={styles.searchCtaIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon(): React.JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function SearchBarWrapper(props: Props): React.JSX.Element {
  const isBrowser = useIsBrowser();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isMac =
    isBrowser && typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

  const label = translate({
    id: 'theme.SearchBar.label',
    message: 'Search',
    description: 'The ARIA label and placeholder for search button',
  });

  // Close and return focus to the trigger (used by the ✕ button / ESC / backdrop).
  const closeModal = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // ⌘K / Ctrl+K opens the modal anywhere on the site; ESC closes it.
  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === 'Escape' && open) {
        event.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isBrowser, open, closeModal]);

  // Selecting a result navigates — close the modal when the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // While open: lock body scroll, focus the input, and select any existing
  // text so the user can immediately type over a previous query.
  useEffect(() => {
    if (!open || !isBrowser) {
      return undefined;
    }
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        const input = modalRef.current?.querySelector<HTMLInputElement>(
          '.navbar__search-input',
        );
        if (!input) {
          return;
        }
        input.focus();
        const selectAll = () => {
          if (input.value) {
            input.select();
          }
        };
        // Deferred so it runs AFTER the plugin's own focus handler, which on
        // small screens (max-width: 576px) moves the caret to the end — that
        // would otherwise clear our selection on mobile. The extra delayed
        // pass covers the async index load on the very first open.
        timers.push(window.setTimeout(selectAll, 0));
        if (window.matchMedia('(max-width: 576px)').matches) {
          timers.push(window.setTimeout(selectAll, 250));
        }
      }, 0),
    );
    return () => {
      body.style.overflow = previousOverflow;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [open, isBrowser]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.searchCta}
        aria-label={label}
        onClick={() => setOpen(true)}
      >
        <MagnifierIcon />
        <span className={styles.searchCtaText}>{label}</span>
        <span className={styles.searchCtaHint} aria-hidden="true">
          <kbd className={styles.searchCtaKbd}>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd className={styles.searchCtaKbd}>K</kbd>
        </span>
      </button>

      {/* The modal is kept mounted (so the query persists across opens) and is
          shown/hidden via the `.open` class. It is portaled to <body> to escape
          the navbar's backdrop-filter containing block. */}
      {isBrowser &&
        createPortal(
          <div
            className={clsx(styles.backdrop, open && styles.open)}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              ref={modalRef}
              className={styles.modal}
              role="dialog"
              aria-modal={open}
              aria-label={label}
              aria-hidden={!open}
            >
              <SearchBar {...props} />
              <button
                type="button"
                className={styles.closeButton}
                aria-label={translate({
                  id: 'theme.SearchModal.close',
                  message: 'Close search',
                })}
                onClick={closeModal}
              >
                <CloseIcon />
              </button>
              <div className={styles.modalFooter} aria-hidden="true">
                <span>
                  <kbd className={styles.footerKbd}>↵</kbd> to select
                </span>
                <span>
                  <kbd className={styles.footerKbd}>↑</kbd>
                  <kbd className={styles.footerKbd}>↓</kbd> to navigate
                </span>
                <span>
                  <kbd className={styles.footerKbd}>esc</kbd> to close
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
