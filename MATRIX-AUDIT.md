# MATRIX AUDIT

This document summarizes the CI matrix failures identified during testing, along with their causes, classifications, and the fixes implemented to achieve a successful cross-platform build.

---

## Failure 1

- **Environment:** `windows-latest` (Node 18, 20, and 22)
- **Failed Step:** Loading configuration file in `src/fileUtils.js`
- **Error from Log:**
  ```
  Error: ENOENT: no such file or directory, open 'C:\workspace\matrix-debug-drill/src/configs/default.json'
  ```
- **Failure Type:** OS-specific (Path handling)
- **Resolution:**
  - Replaced manual path string construction with:
    ```js
    path.join(__dirname, 'configs', configName + '.json')
    ```
  - Using `path.join()` allows Node.js to generate the correct path separator automatically, ensuring compatibility across both Windows and Unix-based operating systems.

---

## Failure 2

- **Environment:** `windows-latest` (Node 18, 20, and 22)
- **Failed Step:** File content assertion in `src/fileUtils.test.js`
- **Error from Log:**
  ```
  Expected: "line one\nline two\nline three\n"
  Received: "line one\r\nline two\r\nline three\r\n"
  ```
- **Failure Type:** OS-specific (Line ending differences)
- **Resolution:**
  - Updated the test to normalize line endings before performing the assertion:
    ```js
    content.replace(/\r\n/g, '\n')
    ```
  - This prevents failures caused by Windows using CRLF (`\r\n`) while Linux and macOS use LF (`\n`).

---

## Failure 3

- **Environment:** `ubuntu-latest` (Node 22)
- **Failed Step:** Encryption logic in `src/cryptoUtils.js`
- **Error from Log:**
  ```
  Error: crypto.createCipher is not a function
  ```
- **Failure Type:** Runtime version compatibility
- **Resolution:**
  - Replaced the deprecated `crypto.createCipher()` and `crypto.createDecipher()` APIs with the supported `crypto.createCipheriv()` and `crypto.createDecipheriv()` methods.
  - Introduced explicit IV generation and stored the IV alongside the encrypted data to maintain successful encryption and decryption while remaining compatible with Node 22.

---

# Workflow Configuration Changes

**File Updated:** `.github/workflows/ci.yml`

### Changes Made

- Set:
  ```yaml
  fail-fast: false
  ```
  so every matrix job runs to completion, making it easier to identify all failing environments instead of stopping after the first failure.

- Added an experimental matrix entry for **Node.js 24** using:
  ```yaml
  experimental: true
  ```
  and configured the job with:
  ```yaml
  continue-on-error: ${{ matrix.experimental }}
  ```
  This allows testing compatibility with upcoming Node.js releases without causing the overall workflow to fail.

### Reasoning

Production environments (Node 18, 20, and 22) are required to pass successfully on both Ubuntu and Windows. Node 24 is included only as an experimental runtime so that compatibility can be monitored while keeping the CI pipeline stable.