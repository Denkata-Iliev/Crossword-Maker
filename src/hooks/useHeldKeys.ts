import { useEffect, useRef, useState } from "react";

// Maps event.key values for modifier keys to the convention used in combo strings
const EVENT_KEY_TO_MODIFIER: Record<string, string> = {
  control: "ctrl",
  shift: "shift",
  alt: "alt",
};

const MODIFIERS = new Set(["ctrl", "shift", "alt"]);

interface ParsedKey {
  modifiers: Set<string>;
  key: string;
  raw: string; // normalized, e.g. "ctrl+alt+e"
}

const parseKey = (input: string): ParsedKey => {
  const parts = input.toLowerCase().split("+");
  const modifiers = new Set(parts.filter((p) => MODIFIERS.has(p)));
  const key = parts.find((p) => !MODIFIERS.has(p))!;

  // Normalize order: sorted modifiers then key
  const raw = [...modifiers].sort().concat(key).join("+");
  return { modifiers, key, raw };
};

const matchesEvent = (parsed: ParsedKey, event: KeyboardEvent): boolean => {
  // if the event key maches the parsed key (which is one of the tracked keys),
  // and if the parsed key has a modifier and the event key same modifier is also active,
  // then we have a match.
  // For example, we track ["ctrl+e", "s"]. We press "ctrl+e", then:
  // - event.key is "e", which matches parsed.key "e" from "ctrl+e"
  // - parsed.modifiers has "ctrl", and event.ctrlKey is true, so the modifier also matches
  // - parsed.modifiers does not have shift and alt, and event.shiftKey and event.altKey are false, so those also match
  // => we have a full match.
  return (
    event.key.toLowerCase() === parsed.key &&
    parsed.modifiers.has("ctrl") === event.ctrlKey &&
    parsed.modifiers.has("shift") === event.shiftKey &&
    parsed.modifiers.has("alt") === event.altKey
  );
};

const useHeldKeys = (trackedKeys: string[]) => {
  const parsedRef = useRef<ParsedKey[]>(trackedKeys.map(parseKey));
  const heldKeysRef = useRef<Set<string>>(new Set());
  const [heldKeys, setHeldKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    parsedRef.current = trackedKeys.map(parseKey);
  }, [trackedKeys]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        // arr of matches: a match is when we are not already holding down the key combo, and the event matches the parsed key combo
      const matches = parsedRef.current.filter((p) => !heldKeysRef.current.has(p.raw) && matchesEvent(p, event));
      if (matches.length === 0) return;

      event.preventDefault();
      const next = new Set(heldKeysRef.current);
      matches.forEach((p) => next.add(p.raw));

      heldKeysRef.current = next;
      setHeldKeys(new Set(next));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const releasedKey = event.key.toLowerCase();
      const releasedModifier = EVENT_KEY_TO_MODIFIER[releasedKey];

      // if a modifier was released, we get all tracked keys that have the modifier.
      // if a key was released, we get all tracked keys that match the released key.
      const toRemove = parsedRef.current.filter((p) => (releasedModifier ? p.modifiers.has(releasedModifier) : p.key === releasedKey));
      if (toRemove.length === 0) return;

      event.preventDefault();
      const next = new Set(heldKeysRef.current);
      toRemove.forEach((p) => next.delete(p.raw));

      heldKeysRef.current = next;
      setHeldKeys(new Set(next));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Normalizes input the same way as parseKey so "ctrl+e" and "e+ctrl" both work
  const normalize = (key: string) => parseKey(key).raw;
  const isHeld = (key: string) => heldKeys.has(normalize(key));
  const isHeldRef = (key: string) => heldKeysRef.current.has(normalize(key));

  return { isHeld, isHeldRef };
};

export default useHeldKeys;
