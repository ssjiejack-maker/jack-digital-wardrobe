# Notion workspace setup

Notion is the source of truth for your wardrobe. The web app reads and writes these databases through a Notion internal integration.

## 1. Create the integration

1. Open https://www.notion.so/profile/integrations and create an internal integration.
2. Give it read, insert, and update content capabilities.
3. Copy the integration secret into the server-side `NOTION_TOKEN` environment variable.
4. Do not put this token in client-side code or commit it to GitHub.

## 2. Create the Wardrobe database

Create a full-page Notion database called **Wardrobe**. Add these properties with the exact names and types:

| Property | Notion type | Used for |
| --- | --- | --- |
| Item | Title | Item name |
| Category | Select | Clothing category |
| Status | Select | Owns, Wishlist, Archived |
| Love Level | Select | Favorite marker |
| Colour | Multi-select | Main colours |
| Designer | Select | Brand / designer |
| Occasion | Multi-select | Suitable occasions |
| Season | Multi-select | Seasonal use |
| Fabric / Material | Multi-select | Material |
| Fit / Silhouette | Multi-select | Cut and fit |
| Styling Notes | Text | Notes for styling |
| Link | URL | Product page |
| Photo | Files & media | Product photo |

Copy the database ID from its URL into `NOTION_DB_ID`.

## 3. Optional databases

Create these only if you want their corresponding features.

### Looks / Outfit Diary

Set `NOTION_LOOKS_DB_ID` to this database ID.

| Property | Notion type |
| --- | --- |
| Look | Title |
| Occasion | Text |
| Worn With | Text |
| Date Captured | Date |
| Photo | Files & media |
| Tags | Multi-select |
| Rating | Number |
| Pieces | Relation to Wardrobe |
| Notes | Text |

The **Pieces** relation should point to the Wardrobe database so outfit entries can link back to the clothes you wore.

### Wishlist

Set `NOTION_WISHLIST_DB_ID` to this database ID.

| Property | Notion type |
| --- | --- |
| Item | Title |
| Brand | Text |
| Price | Text |
| Link | URL |
| Category | Text |
| Archetype | Text |
| On-Body Photo | Files & media |
| Product Image | Files & media |
| Styling | Text |
| Note | Text |
| Priority | Select |

### Assessed Looks

Set `NOTION_ASSESSED_DB_ID` to the database ID used to save photo assessments. The app's assessment flow writes its own structured result; create the database using the properties expected by the assessment page before enabling that feature.

## 4. Share every database with the integration

For each database:

1. Open the database in Notion.
2. Select **••• → Connections** (or **Add connections**).
3. Add your integration.
4. Repeat for each database, including any parent page needed to access it.

A database ID alone is not enough: the integration must be explicitly shared with the database.

## 5. Add environment variables

Set these in your local `.env.local` and in Vercel → Project → Settings → Environment Variables:

```env
NOTION_TOKEN=your_notion_integration_secret
NOTION_DB_ID=your_wardrobe_database_id
NOTION_LOOKS_DB_ID=your_looks_database_id
NOTION_WISHLIST_DB_ID=your_wishlist_database_id
NOTION_ASSESSED_DB_ID=your_assessed_looks_database_id
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1
APP_PASSCODE=choose_a_private_passcode
```

Only add optional database IDs after creating and sharing those databases. Keep all secrets server-side; never use a `NEXT_PUBLIC_` prefix for API keys or integration tokens.

## 6. Verify the connection

Start the app and sign in. Open the Closet page. If the connection works, your Wardrobe database items load. If it fails, check:

- `NOTION_TOKEN` is correct and has not been revoked.
- `NOTION_DB_ID` is the database ID, not the page ID.
- The integration is connected to the database.
- Property names and types match the tables above.

The AI features additionally require a valid `OPENAI_API_KEY`. Image uploads and saved generated images require Vercel Blob configured in the deployment.
