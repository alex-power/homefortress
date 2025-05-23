# Pi-hole Parental Control Application: Architectural Fitness Assessment

## 1. Introduction

The purpose of this analysis is to assess the architecture of the Pi-hole parental control application, including its frontend, backend, Pi-hole integration, data management, core functionalities, security aspects, and deployment model, to determine its overall fitness for the intended purpose of providing a user-friendly interface for managing parental controls via Pi-hole.

## 2. Core Architectural Components

The application is composed of several key architectural pieces:

*   **Frontend:**
    *   **Framework:** Next.js (explicitly mentioned in `next.config.mjs` and `package.json`).
    *   **Primary UI Components/Pages:** The main page is `app/page.tsx`. It appears to be a dashboard for managing parental controls, likely displaying a list of devices and their blocking status. It uses React components (e.g., `useState`, `useEffect`).
    *   **Notable Frontend Libraries:** React (core of Next.js), `next/font` for font management. Likely Tailwind CSS and a UI component library or custom components are in use.

*   **Backend API:**
    *   **Framework:** Express.js (evident from `src/app.ts` with `import express from 'express';` and usage of `app.use`, `app.listen`).
    *   **Structure:** Controllers (`src/controllers/ParentalController.ts`) and Services (`src/services/ParentalControlService.ts`).
    *   **ORM:** TypeORM is used, as indicated by imports like `import { DataSource } from "typeorm";` in `src/app.ts` and its usage for database initialization.
    *   **Database:** SQLite is used. This is specified in the TypeORM `DataSource` configuration within `src/app.ts`: `type: "sqlite", database: "database.sqlite"`.

*   **Pi-hole Integration (`PiholeClient`):**
    *   **`PiholeClient.ts` Module:** This module (`src/services/PiholeClient.ts`) is responsible for all direct communication with a Pi-hole instance.
    *   **Role in Communication:**
        *   **HTTP API:** It makes HTTP requests to the Pi-hole web interface (e.g., to `/admin/api.php`) to perform actions like fetching lists of devices, adding/removing domains from blocklists, and enabling/disabling filtering. It likely uses an API token for authentication (`this.apiToken`).
        *   **FTL Service (Faster Than Light):** It also interacts with Pi-hole's FTL service, which provides more real-time data and control. This is done via a Telnet-like interface on port 4711 (e.g., commands like `>top-clients`, `>controlheat`, `>forward-dest`). The `PiholeClient` manages the netcat/socket connection to this service, sends commands, and parses the responses.
        *   It handles authentication (API token) and error management for these interactions.

*   **Frontend-Backend Communication:**
    *   **Separate Processes:** The Next.js frontend and the Express.js backend are running as separate processes.
    *   **API Calls:** The Next.js frontend makes API calls (using `fetch`) to the Express.js backend.
    *   **Next.js Rewrites:** `next.config.mjs` contains a `rewrites` configuration that proxies frontend `/api/:path*` requests to `http://localhost:3001/api/:path*` (the backend) during development.
    *   **CORS (Cross-Origin Resource Sharing):** The Express backend (`src/app.ts`) configures CORS using `app.use(cors());` to allow requests from the frontend running on a different port/origin.

## 3. Data Management

*   **Key Data Entities:**
    *   **Device:** (`src/entity/Device.ts`) - Represents an individual manageable network device.
    *   **DeviceGroup:** (`src/entity/DeviceGroup.ts`) - Represents a collection of devices for applying rules.
    *   **AccessSchedule:** (`src/entity/AccessSchedule.ts`) - Defines time-based rules for when internet access is allowed or blocked for a `DeviceGroup`.
    *   **ContentRule:** (`src/entity/ContentRule.ts`) - Defines rules for blocking or allowing specific types of content or domains for a `DeviceGroup`.
    *   **DomainOverride:** (`src/entity/DomainOverride.ts`) - Allows for specific domains to be explicitly allowed or blocked, overriding other rules for a `DeviceGroup` or `Device`.

*   **Storage Mechanism:**
    *   **Database Type:** SQLite (configured in `src/app.ts`).
    *   **ORM:** TypeORM (used in `src/app.ts` and for entity definitions).
    *   **Database File Location:** `database.sqlite` (in the backend project root).

*   **Conceptual Relationships:**
    *   **Device & DeviceGroup:** A `Device` belongs to a `DeviceGroup`; a `DeviceGroup` has many `Device`s.
    *   **DeviceGroup & AccessSchedule:** A `DeviceGroup` can have many `AccessSchedule`s.
    *   **DeviceGroup & ContentRule:** A `DeviceGroup` can have many `ContentRule`s.
    *   **DeviceGroup/Device & DomainOverride:** `DomainOverride`s can apply to `DeviceGroup`s or individual `Device`s.
    *   **ParentalControlService:** Uses these entities via TypeORM to manage parental control logic and persist state, interacting with `PiholeClient.ts` for actual blocking.

## 4. Core Functionality & Features

*   **UI Capabilities (Conceptual):**
    *   **View Devices:** Fetches (`/api/devices`) and displays device list (name, IP, MAC, block status, group) from `app/page.tsx`. Includes a "Refresh" button (likely triggering backend sync).
    *   **Toggle Device Blocking:** UI elements (checkboxes/toggles) allow direct blocking/unblocking, calling backend endpoints (e.g., `/api/block`) to update status in Pi-hole via `ParentalControlService` and `PiholeClient`.
    *   **Manage Device Groups (Conceptual):** Implied by `DeviceGroup.ts`. Likely involves creating/deleting groups, assigning devices.
    *   **Manage Access Schedules (Conceptual):** Implied by `AccessSchedule.ts`. UI for creating time-based access rules for groups. "Scheduled" device status in UI hints at this.
    *   **Manage Content Rules (Conceptual):** Implied by `ContentRule.ts`. UI for defining content category blocking for groups.
    *   **Manage Domain Overrides (Conceptual):** Implied by `DomainOverride.ts`. UI for whitelisting/blacklisting specific domains for devices/groups.
    *   **View Dashboard Stats (Conceptual):** `PiholeClient.ts` can fetch stats (summary, top clients/items), suggesting potential for dashboard elements.

*   **Device Synchronization (`syncDevicesWithNetwork` in `ParentalControlService.ts`):**
    *   **Gets Info from Pi-hole:** `ParentalControlService` calls `PiholeClient` which queries Pi-hole's API or FTL service for devices (IP, MAC, hostname).
    *   **Local Database Operations:** Fetches existing devices from its SQLite DB, compares Pi-hole devices with local ones, creates new `Device` entities if not found locally, and updates existing ones. Acts as a discovery/reconciliation mechanism.

*   **Domain Override Application (`DomainOverride` in `ParentalControlService.ts` & `PiholeClient.ts`):**
    *   When a `DomainOverride` (with `domain` and `type` - "allow"/"block") is managed:
        *   `ParentalControlService`: Saves/updates/deletes the entity in the local DB. Calls `PiholeClient`.
        *   `PiholeClient`: Adds/removes the specified domain from Pi-hole's global blacklist or whitelist via API calls.
    *   Targeting (Device/Group): For per-device/group overrides, `PiholeClient` would need to manage Pi-hole's client/group-specific lists, possibly via custom adlists.

## 5. Schedule Enforcement Analysis (`enforceSchedules`)

*   **Current Implementation:**
    *   `enforceSchedules` (in `ParentalControlService`) is called every 1 minute via `setInterval` in `src/app.ts`.
    *   It gets the current day/time and identifies active `AccessSchedule` entities from the database.
    *   **Actual Actions:**
        *   For schedule type `internet_access`: Logs to console: `console.log(\`Blocking internet access for device ${device.friendlyName} (${device.macAddress})\`)`. **No actual blocking occurs.**
        *   For schedule type `content_filtering`: Logs to console: `console.log(\`Applying content filtering for device ${device.friendlyName} (${device.macAddress})\`)`. **No specific content filtering beyond existing global Pi-hole rules or domain overrides is applied by this method.**
    *   *Note: The database query for checking active days in schedules (`days: { [day]: true }`) is likely incorrect for TypeORM and needs revision.*

*   **The Gap:**
    *   A major discrepancy exists between intended actions (blocking internet, applying specific filters based on schedules) and the implemented actions (console logging only).
    *   **Missing Mechanisms:**
        *   **Full Internet Blocking:** Lacks router API integration or other network control methods.
        *   **Advanced Content Filtering (Scheduled):** Does not dynamically change Pi-hole group memberships or integrate with proxies based on schedules.

*   **Implications for Functionality:**
    *   The `AccessSchedule` functionality for `internet_access` and specific `content_filtering` is currently **non-functional**.
    *   Users setting up schedules will find they don't actually restrict access as described.
    *   This significantly limits the application's effectiveness as a comprehensive parental control tool.

## 6. Security Aspects (High-Level)

*   **Authentication:**
    *   `ParentalController.ts` uses an `authMiddleware` for all its routes.
    *   `package.json` includes `jsonwebtoken`, strongly implying **JWT-based authentication** for the backend API.

*   **Authorization:**
    *   **No visible granular authorization** (e.g., RBAC) beyond the initial authentication check. Authenticated users appear to have full administrative access.

*   **Sensitive Data Handling:**
    *   **Pi-hole Auth Token (`PIHOLE_AUTH_TOKEN`):** Managed via environment variable. Used in API requests to Pi-hole as a URL query parameter (a Pi-hole API constraint).
    *   **Database Connection:** Path configured via environment variable for SQLite.

*   **Other Security Practices:**
    *   **`helmet`:** Used in `src/app.ts` to set security-enhancing HTTP headers.
    *   **CORS:** `cors()` is used with default (permissive) settings; should be restricted in production.
    *   **SQL Injection:** Mitigated by the use of TypeORM.
    *   **Input Validation:** Basic parsing for URL parameters; no explicit validation for request bodies seen in controllers.
    *   **HTTPS:** No explicit HTTPS configuration for the app server or for Pi-hole communication (defaults to HTTP).

## 7. Deployment and Operational Considerations

*   **Deployment Scenario:**
    *   **Frontend (Next.js):** Likely deployed on **Netlify**, as indicated by `netlify.toml`.
    *   **Backend (Express.js):** Runs as a **separate Node.js process**. Requires a separate environment (PaaS, VPS, container) and is not deployed via `netlify.toml`.
    *   **Frontend-Backend Communication (Production):** The Netlify-hosted frontend will need the public URL of the deployed backend.

*   **Configuration Management (Backend):**
    *   Critical parameters are configured using **environment variables** with sensible defaults.

*   **Database Operations (Backend):**
    *   TypeORM's `synchronize: true` is currently used.
        *   **Development:** Convenient.
        *   **Production:** **Unsuitable and dangerous**; must be set to `false`.
        *   **Migration Strategy:** A proper database migration strategy using TypeORM migrations is essential for production.

*   **Build Process:**
    *   **Next.js Frontend:** Uses `next build`.
    *   **Express.js Backend:** Requires a build step using `tsc` to transpile TypeScript to JavaScript for production.

## 8. Overall "Fitness for Purpose" Summary

*   **Strengths:**
    *   Clear frontend/backend separation.
    *   Comprehensive `PiholeClient.ts` for Pi-hole interaction.
    *   Database for custom rules and state management.
    *   Good backend configuration practices.
    *   Functional core device discovery and global `DomainOverride` implementation.
    *   Basic security foundations (JWT, `helmet`).

*   **Critical Weaknesses:**
    *   **`enforceSchedules` is ineffective:** This is the most significant gap. The system **does not actually block internet access or apply dynamic content filtering based on schedules**; it only logs intentions.
    *   **Production Database Strategy:** `synchronize: true` is a major risk for production data.
    *   **Production Security Hardening:** Lack of granular authorization, permissive CORS, needs more input validation, and lacks explicit HTTPS.
    *   **Incomplete UI for Advanced Features:** The UI for managing groups, schedules, and content rules might be underdeveloped.

*   **Concluding Statement on Current Fitness:**
    The application is currently **partially fit for purpose but with significant limitations** that prevent it from being fully effective as a comprehensive parental control solution. It can serve as a basic Pi-hole dashboard with manual domain override capabilities but fails on automated, schedule-based controls.

*   **Key Recommendations to Achieve Full Fitness for Purpose:**
    1.  **Implement `enforceSchedules` Logic:** This is paramount. Integrate with routers (for internet blocking) and/or enhance Pi-hole group management (for dynamic content filtering) to make schedules functional.
    2.  **Adopt Production Database Practices:** Switch `synchronize: true` to `false` and implement a robust database migration workflow.
    3.  **Enhance Security for Production:** Implement granular authorization, tighten CORS policies, add comprehensive input validation at the API level, and ensure HTTPS is used for all communications.
    4.  **Develop UI for All Features:** Ensure the frontend provides a complete and intuitive interface for managing all backend entities and functionalities (groups, schedules, content rules).
    5.  **Refine Backend Deployment Strategy:** Clearly define and document the build and deployment process for the Express.js backend for production environments.
