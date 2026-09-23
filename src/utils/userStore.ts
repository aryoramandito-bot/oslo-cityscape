import { UserAccount, UserDataVault } from '../types';
import { SEED_PERSONAS, GUEST_USER, SeedPersona } from '../data/seedUsers';

const STORAGE_KEY_ACCOUNTS = 'oslo_accounts';
const STORAGE_KEY_ACTIVE_USER_ID = 'oslo_active_user_id';
const STORAGE_PREFIX_VAULT = 'oslo_vault_';

/**
 * Initializes the client-side multi-user store with default seed personas if empty.
 */
export function initializeUserStore(): void {
  try {
    const existingAccounts = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (existingAccounts) {
      // Filter out stale demo accounts (Budi & Sarah) if present from previous run
      const parsed: UserAccount[] = JSON.parse(existingAccounts);
      const filtered = parsed.filter((a) => a.id !== 'usr_budi' && a.id !== 'usr_sarah');
      if (!filtered.some((a) => a.id === 'usr_astrid')) {
        filtered.unshift(SEED_PERSONAS[0].account);
      }
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(filtered));
      localStorage.removeItem(`${STORAGE_PREFIX_VAULT}usr_budi`);
      localStorage.removeItem(`${STORAGE_PREFIX_VAULT}usr_sarah`);
    } else {
      const defaultAccounts = SEED_PERSONAS.map((p) => p.account);
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(defaultAccounts));
    }

    // Pre-populate vault for Astrid
    SEED_PERSONAS.forEach((persona) => {
      const vaultKey = `${STORAGE_PREFIX_VAULT}${persona.account.id}`;
      if (!localStorage.getItem(vaultKey)) {
        localStorage.setItem(vaultKey, JSON.stringify(persona.vault));
      }
    });

    const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE_USER_ID);
    if (!activeId || activeId === 'usr_budi' || activeId === 'usr_sarah') {
      localStorage.setItem(STORAGE_KEY_ACTIVE_USER_ID, 'usr_astrid');
    }
  } catch (err) {
    console.warn('Unable to initialize userStore in localStorage:', err);
  }
}

/**
 * Retrieves all registered explorer accounts on this device.
 */
export function getRegisteredAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading accounts from localStorage:', err);
  }
  return SEED_PERSONAS.map((p) => p.account);
}

/**
 * Gets the active user ID.
 */
export function getActiveAccountId(): string {
  try {
    const active = localStorage.getItem(STORAGE_KEY_ACTIVE_USER_ID);
    if (active) return active;
  } catch {
    // fallback
  }
  return 'usr_astrid';
}

/**
 * Sets the active user ID.
 */
export function setActiveAccountId(userId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_USER_ID, userId);
  } catch (err) {
    console.warn('Error setting active user id:', err);
  }
}

/**
 * Finds an account by ID from the registry or seed personas.
 */
export function getAccountById(userId: string): UserAccount {
  if (userId === GUEST_USER.account.id) {
    return GUEST_USER.account;
  }
  const accounts = getRegisteredAccounts();
  const match = accounts.find((a) => a.id === userId);
  if (match) return match;

  const seedMatch = SEED_PERSONAS.find((p) => p.account.id === userId);
  if (seedMatch) return seedMatch.account;

  return SEED_PERSONAS[0].account;
}

/**
 * Retrieves the scoped user vault (points, ledger, checkins, reminders, etc.).
 */
export function getUserVault(userId: string): UserDataVault {
  if (userId === GUEST_USER.account.id) {
    return GUEST_USER.vault;
  }

  const vaultKey = `${STORAGE_PREFIX_VAULT}${userId}`;
  try {
    const raw = localStorage.getItem(vaultKey);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`Error reading vault for ${userId}:`, err);
  }

  // Fallback to seed persona vault if available
  const seedMatch = SEED_PERSONAS.find((p) => p.account.id === userId);
  if (seedMatch) {
    return seedMatch.vault;
  }

  // Default fresh vault
  return {
    loyaltyPoints: 500,
    activeCity: 'jakarta',
    checkins: [],
    eventReminders: [],
    redeemedPerks: [],
    userLedger: [
      {
        id: 'wlcm_' + Date.now(),
        action: 'Welcome Bonus',
        spot: 'Oslo Cityscape Passport Activation',
        pts: 500,
        icon: '🎉',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    ]
  };
}

/**
 * Saves the scoped user vault to localStorage.
 */
export function saveUserVault(userId: string, vault: UserDataVault): void {
  if (userId === GUEST_USER.account.id) return; // do not persist guest vault permanently
  const vaultKey = `${STORAGE_PREFIX_VAULT}${userId}`;
  try {
    localStorage.setItem(vaultKey, JSON.stringify(vault));
  } catch (err) {
    console.warn(`Error saving vault for ${userId}:`, err);
  }
}

/**
 * Registers or updates a user account and sets up their initial vault.
 */
export function registerUserAccount(account: UserAccount, initialVault?: Partial<UserDataVault>): void {
  try {
    const accounts = getRegisteredAccounts();
    const existingIndex = accounts.findIndex((a) => a.id === account.id || a.email.toLowerCase() === account.email.toLowerCase());

    if (existingIndex >= 0) {
      accounts[existingIndex] = {
        ...accounts[existingIndex],
        ...account,
        lastActiveAt: 'Just now'
      };
    } else {
      accounts.unshift({
        ...account,
        lastActiveAt: 'Just now'
      });
    }

    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));

    // Initialize vault if not present
    const vaultKey = `${STORAGE_PREFIX_VAULT}${account.id}`;
    if (!localStorage.getItem(vaultKey) || initialVault) {
      const fullVault: UserDataVault = {
        loyaltyPoints: 500,
        activeCity: 'jakarta',
        checkins: [],
        eventReminders: [],
        redeemedPerks: [],
        userLedger: [
          {
            id: 'reg_' + Date.now(),
            action: 'Registration Bonus',
            spot: 'Verified Explorer Welcome Stamp',
            pts: 500,
            icon: '🏅',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          }
        ],
        ...initialVault
      };
      localStorage.setItem(vaultKey, JSON.stringify(fullVault));
    }
  } catch (err) {
    console.warn('Error registering user account:', err);
  }
}

/**
 * Removes an account from this device.
 */
export function removeUserAccount(userId: string): void {
  try {
    const accounts = getRegisteredAccounts().filter((a) => a.id !== userId);
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    localStorage.removeItem(`${STORAGE_PREFIX_VAULT}${userId}`);

    // If removing the active user, fallback to Astrid or first available
    const active = getActiveAccountId();
    if (active === userId) {
      const nextId = accounts.length > 0 ? accounts[0].id : 'usr_astrid';
      setActiveAccountId(nextId);
    }
  } catch (err) {
    console.warn('Error removing user account:', err);
  }
}
