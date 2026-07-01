# Jakarta Oslo Cityscape Portal - Technical Product Specification & Implementation Guide

## 1. System Persona & Logic

**System Persona:**
You are "Mpok Voyage", an embedded intelligence within the Jakarta Oslo Cityscape Portal. You are an elegant, highly efficient, and privacy-conscious Betawi-accented, professional virtual assistant. Your tone is professional, brief, and impeccably helpful. You do not use slang or overly conversational padding.

**System Logic (The "Triple-Check" AI State):**
The AI operates strictly within the "Unlocked State" of the portal. It assumes the user has passed the Triple-Check gating logic (Auth, Consent, Demographics).
The core instructions for the model are to:
1. **Analyze** the user's intent based on their anonymized demographic profile and current time.
2. **Execute** contextual actions (Wayfinding, Event Recommendations, Perk Redemption).
3. **Protect** user privacy by adhering closely to the provided context and never inferring Personally Identifiable Information (PII) beyond the provided `provider_uid` or demographics.

---

## 2. Input/Output Schema

### Expected Context & User Input (JSON)
The client will send the authenticated user's context along with their query.

```json
{
  "userContext": {
    "provider_uid": "google_sub_882910",
    "demographics": {
      "nationality": "WNI",
      "age": "12_60",
      "city": "South Jakarta"
    },
    "currentLocation": "Monas Zone A",
    "currentTime": "15:57"
  },
  "query": "Where can I redeem my F&B discount and check the next traditional dance?"
}
```

### Expected Model Response (JSON)
The AI is instructed to return a structured JSON response to power the UI seamlessly.

```json
{
  "intent": "wayfinding_and_events",
  "responseMessage": "You can redeem your 15% discount at Soto Betawi Haji Mamat, which is located in the culinary cluster. After that, the Ondel-Ondel traditional puppet street dance starts at 04:00 PM at the Kota Tua Esplanade.",
  "suggestedActions": [
    {
      "type": "NAVIGATE_TO_NODE",
      "payload": {
        "nodeId": "3",
        "name": "Soto Betawi Haji Mamat",
        "lat": -6.188200,
        "lng": 106.821000
      }
    },
    {
      "type": "VIEW_EVENT",
      "payload": {
        "eventId": "e4"
      }
    }
  ]
}
```

---

## 3. Model Configuration

*   **Model Version:** `gemini-1.5-pro` (Optimized for complex reasoning and structured JSON output).
*   **Temperature:** `0.2` (Low temperature for highly deterministic, factual responses. Crucial for accurate wayfinding and schedule information).
*   **Top-P:** `0.8` (Slightly constrained nucleus sampling to maintain focus).
*   **Response Format:** `application/json` (Enforced JSON generation).
*   **Safety Settings:**
    *   Harassment: `BLOCK_MEDIUM_AND_ABOVE`
    *   Hate Speech: `BLOCK_MEDIUM_AND_ABOVE`
    *   Sexually Explicit: `BLOCK_MEDIUM_AND_ABOVE`
    *   Dangerous Content: `BLOCK_MEDIUM_AND_ABOVE`

---

## 4. Integration Snippets

### Example API Request (Node.js / @google/genai SDK)

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `You are Mpok Voyage, the Jakarta Oslo Cityscape. Provide concise, helpful answers based only on the provided user context and site data. Never expose PII. Output strict JSON matching the application schema.`;

/**
 * Predicts the user's intent and generates a structured action plan.
 * @param {Object} userInput - The context and query JSON payload.
 */
export async function getConciergeResponse(userInput: any) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: JSON.stringify(userInput),
      config: {
        temperature: 0.2,
        topP: 0.8,
        responseMimeType: 'application/json',
        systemInstruction: systemInstruction,
      }
    });

    return JSON.parse(response.text());
  } catch (error) {
    console.error("Concierge API Error:", error);
    throw new Error("Unable to retrieve concierge actions at this time.");
  }
}
```

---

## 5. UI/UX Prototype Layout

The prototype (`index.html` & `interactive-app.html`) features a mobile-first PWA design encapsulating the following:

- **Onboarding Flow:**
  - *Step 1 (Auth):* Mock login simulation (Google, Apple, WhatsApp).
  - *Step 2 (Consent):* Privacy policy and data consent acceptance under PDP Law.
  - *Step 3 (Profile):* Mock demographic setup (Nationality, Region/Country, Age, Gender). Directly redirects to main dashboard post-save.

- **Dashboard View:**
  - *Header:* Minimalist navigation header showing current tab and verified explorer name/status badge.
  - *Tab Infrastructure (5 Views):*
    - **Portal (Concierge):** Virtual assistant interface ("Mpok Voyage") with interactive chat logs and wayfinding actions.
    - **Explore (Directory):** Interactive site nodes overview (Monas, Kota Tua, Soto Betawi Haji Mamat, Kerak Telor Kemayoran Stand).
    - **Events:** Real-time event schedules (Monas Sunrise, Kota Tua historical walking tour, Soto Betawi cooking class, Ondel-Ondel street dance, Monas Fountain Laser Show).
    - **Vault:** Digital collectible storage, verified demographic explorer profile, and flipping loyalty cards.
    - **Perks:** Unlocked benefits (15% off Soto Betawi, free Bir Pletok welcome drink, free Fatahillah Museum entry).
  - *Bottom Navbar:* 5 distinct actions with Lucide icons.

- **Aesthetic Guidelines:**
  - *Theme:* Dark mode core (`#f9f8f6` to `#ffffff` backgrounds) with glassmorphic cards.
  - *Typography:* `Outfit` for display headings, `Inter` for sans-serif body text.
  - *Scrollbar:* Custom slim scrollbar (transparent track, low-opacity white thumb) applied globally.
  - *Assets:* Local high-fidelity placeholder assets mapped to landmarks and NFTs.
