# Assets & Dynamic Content Setup

## Folder Structure

```
project/
├── assets/
│   ├── foto.jpg          (Your profile photo - 120x120px recommended)
│   ├── cv.pdf            (Your CV for download)
│   └── projects/         (Project screenshots/images)
│       ├── pastrystock.jpg
│       ├── robot.jpg
│       └── ...
│
├── projects.json         (Projects data source - fallback if Supabase fails)
└── js/
    ├── projects-loader.js   (Loads projects dynamically)
    └── supabase-client.js   (Supabase integration)
```

## Setup Instructions

### 1. Add Profile Photo
- Place your profile photo at `assets/foto.jpg`
- Recommended size: 120x120px
- Formats: JPG, PNG, WebP

**Where it appears:** Top of hero section on home page

### 2. Add CV PDF
- Place your CV at `assets/cv.pdf`
- The "Download CV" button appears on the hero section

**Where it appears:** CTA buttons on home page (between "Learn More" and "Get In Touch")

### 3. Add Project Images (Optional)
- Place project screenshots in `assets/projects/`
- This folder is ready for when you want to add images to project cards

## Data Management

### Projects Data Sources (Priority Order)

1. **Supabase Database** (Primary)
   - Automatically synced from table: `projects`
   - Data structure: `title`, `description`, `category`, `tags`, `github_link`, `demo_link`, `featured`, `sort_order`

2. **projects.json** (Fallback)
   - Loaded if Supabase is unavailable
   - Same structure as Supabase table
   - Manually maintained

### How Projects Are Loaded

**On Projects Page (`projects.html`):**

```javascript
// projects-loader.js automatically:
// 1. Fetches projects.json
// 2. Renders project cards dynamically
// 3. Handles errors gracefully
```

## File Purposes

| File | Purpose |
|------|---------|
| `assets/foto.jpg` | Profile image displayed in hero section |
| `assets/cv.pdf` | CV file for download link |
| `projects.json` | Fallback projects data (JSON format) |
| `js/projects-loader.js` | Loads and renders projects on projects page |
| `js/supabase-client.js` | Supabase client setup (ready for future use) |

## Updating Projects

### Method 1: Edit projects.json (Easy)
```json
{
  "projects": [
    {
      "id": "1",
      "title": "Project Name",
      "description": "Description...",
      "category": "Category",
      "tags": ["Tag1", "Tag2"],
      "github_link": "https://github.com/...",
      "demo_link": "https://demo.com/...",
      "featured": true,
      "sort_order": 1
    }
  ]
}
```

### Method 2: Use Supabase Dashboard (Recommended)
1. Go to Supabase dashboard
2. Open `projects` table
3. Add/edit rows directly
4. Changes appear immediately on your website

## CSS Classes Added

| Class | Element | Purpose |
|-------|---------|---------|
| `.profile-section` | Profile container | Profile image wrapper |
| `.profile-image-container` | Profile image | Circular bordered image |
| `.profile-image` | Image | Profile photo |
| `.btn-tertiary` | Button | CV download button style |
| `.project-links` | Links container | Flexible links layout |
| `.project-demo` | Demo link | Styled demo link |

## Features Implemented

✓ Profile photo in hero section (circular with border)
✓ CV download button
✓ Dynamic project loading from projects.json
✓ Fallback mechanism (works without Supabase)
✓ Supabase database setup ready
✓ Responsive design
✓ Error handling

## Next Steps

1. Add your profile photo to `assets/foto.jpg`
2. Add your CV to `assets/cv.pdf`
3. (Optional) Update projects in `projects.json` or Supabase
4. (Optional) Add project images to `assets/projects/`
