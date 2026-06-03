<?php

/**
 * Hash a plain-text password using bcrypt.
 *
 * @param string $password  The plain-text password to hash.
 * @param int    $cost      Work factor (4–31). Higher = slower = more secure. Default: 12.
 * @return string           The bcrypt hash string.
 */
function hashPassword(string $password, int $cost = 12): string
{
    if ($cost < 4 || $cost > 31) {
        throw new InvalidArgumentException('Cost must be between 4 and 31.');
    }

    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => $cost]);

    if ($hash === false) {
        throw new RuntimeException('Password hashing failed.');
    }

    return $hash;
}

/**
 * Verify a plain-text password against a bcrypt hash.
 *
 * @param string $password  The plain-text password to check.
 * @param string $hash      The stored bcrypt hash.
 * @return bool             True if the password matches, false otherwise.
 */
function verifyPassword(string $password, string $hash): bool
{
    return password_verify($password, $hash);
}

/**
 * Check if a stored hash needs to be rehashed (e.g. cost factor was updated).
 *
 * @param string $hash  The stored hash.
 * @param int    $cost  The current desired cost factor.
 * @return bool         True if the hash should be regenerated.
 */
function needsRehash(string $hash, int $cost = 12): bool
{
    return password_needs_rehash($hash, PASSWORD_BCRYPT, ['cost' => $cost]);
}


// --- Example usage ---

$plainPassword = 'MyS3cur3P@ssword!';

// 1. Hash on registration
$storedHash = hashPassword($plainPassword);
echo "Hash: $storedHash\n";

// 2. Verify on login
if (verifyPassword($plainPassword, $storedHash)) {
    echo "Login successful.\n";
} else {
    echo "Invalid password.\n";
}

// 3. Rehash check (e.g. after bumping cost from 10 → 12)
if (needsRehash($storedHash)) {
    $storedHash = hashPassword($plainPassword);
    echo "Hash updated: $storedHash\n";
}