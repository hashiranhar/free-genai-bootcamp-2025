# Frontend Technical Spec

*Last Updated: Wednesday 26th March 2025, 17:12*

## Pages

### Dashboard `/dashboard`

#### Purpose
Provides a summary of learning and serves as the default page when a user visits the web app.

#### Components
- **Last Study Session**
    - Displays the last activity used.
    - Shows when the last activity was used.
    - Summarizes wrong vs correct answers from the last activity.
    - Includes a link to the associated group.
- **Study Progress**
    - Displays total words studied (e.g., `3/124`).
        - Represents the total words studied across all sessions out of all possible words in the database.
    - Shows mastery progress (e.g., `0%`).
- **Quick Stats**
    - Success rate (e.g., `80%`).
    - Total study sessions (e.g., `4`).
    - Total active groups (e.g., `3`).
    - Study streak (e.g., `4 days`).
- **Start Studying Button**
    - Navigates to the Study Activities page.

#### Needed API Endpoints
- `GET /api/dashboard/last_study_session`
- `GET /api/dashboard/study_progress`
- `GET /api/dashboard/quick_stats`

---

### Study Activities Index `/study_activities`

#### Purpose
Displays a collection of study activities with thumbnails and names, allowing users to launch or view details of each activity.

#### Components
- **Study Activity Card**
    - Thumbnail of the study activity.
    - Name of the study activity.
    - Launch button to start the activity.
    - View button to access more information about past sessions for the activity.

#### Needed API Endpoints
- `GET /api/study_activities`

---

### Study Activity Show `/study_activities/:id`

#### Purpose
Displays details of a specific study activity and its past study sessions.

#### Components
- Name of the study activity.
- Thumbnail of the study activity.
- Description of the study activity.
- Launch button.
- **Study Activities Paginated List**
    - ID.
    - Activity name.
    - Group name.
    - Start time.
    - End time (inferred from the last `word_review_item` submitted).
    - Number of review items.

#### Needed API Endpoints
- `GET /api/study_activities/:id`
- `GET /api/study_activities/:id/study_sessions`

---

### Study Activities Launch `/study_activities/:id/launch`

#### Purpose
Launches a study activity.

#### Components
- Name of the study activity.
- **Launch Form**
    - Select field for group.
    - Launch Now button.

#### Behaviour
- After form submission:
    - A new tab opens with the study activity URL from the database.
    - The page redirects to the Study Session Show page.

#### Needed API Endpoints
- `POST /api/study_activities`

---

### Words Index `/words`

#### Purpose
Displays all words in the database.

#### Components
- **Paginated Word List**
    - Columns:
        - Japanese.
        - Romaji.
        - English.
        - Correct Count.
        - Wrong Count.
    - Pagination with 100 items per page.
    - Clicking a Japanese word navigates to the Word Show page.

#### Needed API Endpoints
- `GET /api/words`

---

### Word Show `/words/:id`

#### Purpose
Displays information about a specific word.

#### Components
- Japanese.
- Romaji.
- English.
- **Study Statistics**
    - Correct Count.
    - Wrong Count.
- **Word Groups**
    - Displays a series of pills (e.g., tags).
    - Clicking a group name navigates to the Group Show page.

#### Needed API Endpoints
- `GET /api/words/:id`

---

### Word Groups Index `/groups`

#### Purpose
Displays a list of groups in the database.

#### Components
- **Paginated Group List**
    - Columns:
        - Group Name.
        - Word Count.
    - Clicking a group name navigates to the Group Show page.

#### Needed API Endpoints
- `GET /api/groups`

---

### Group Show `/groups/:id`

#### Purpose
Displays information about a specific group.

#### Components
- Group Name.
- **Group Statistics**
    - Total Word Count.
- **Words in Group**
    - Paginated list of words (reuses the Words Index component).
- **Study Sessions**
    - Paginated list of study sessions (reuses the Study Sessions Index component).

#### Needed API Endpoints
- `GET /api/groups/:id` (name and group stats).
- `GET /api/groups/:id/words`
- `GET /api/groups/:id/study_sessions`

---

### Study Sessions Index `/study_sessions`

#### Purpose
Displays a list of study sessions in the database.

#### Components
- **Paginated Study Session List**
    - Columns:
        - ID.
        - Activity Name.
        - Group Name.
        - Start Time.
        - End Time.
        - Number of Review Items.
    - Clicking a study session ID navigates to the Study Session Show page.

#### Needed API Endpoints
- `GET /api/study_sessions`

---

### Study Session Show `/study_sessions/:id`

#### Purpose
Displays information about a specific study session.

#### Components
- **Study Session Details**
    - Activity Name.
    - Group Name.
    - Start Time.
    - End Time.
    - Number of Review Items.
- **Words Review Items**
    - Paginated list of words (reuses the Words Index component).

#### Needed API Endpoints
- `GET /api/study_sessions/:id`
- `GET /api/study_sessions/:id/words`

---

### Settings Page `/settings`

#### Purpose
Allows users to configure the study portal.

#### Components
- **Theme Selection**
    - Options: Light, Dark, System Default.
- **Reset History Button**
    - Deletes all study sessions and word review items.
- **Full Reset Button**
    - Drops all tables and recreates them with seed data.

#### Needed API Endpoints
- `POST /api/reset_history`
- `POST /api/full_reset`