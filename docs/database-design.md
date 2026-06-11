# Database Design

## Collection 1: Users

### Fields

| Field        | Type     | Required |
| ------------ | -------- | -------- |
| _id          | ObjectId | Yes      |
| name         | String   | Yes      |
| email        | String   | Yes      |
| passwordHash | String   | Yes      |
| role         | String   | Yes      |
| createdAt    | Date     | Yes      |
| updatedAt    | Date     | Yes      |

### Validation

* email must be unique
* email must be lowercase
* password stored using bcrypt hash
* role values:

  * user
  * admin

### Indexes

* email (unique)

### Relationship

One User → Many Resumes

One User → Many Roadmaps

---

## Collection 2: Resumes

### Fields

| Field            | Type          | Required |
| ---------------- | ------------- | -------- |
| _id              | ObjectId      | Yes      |
| userId           | ObjectId      | Yes      |
| originalFilename | String        | Yes      |
| rawText          | String        | No       |
| jobTitle         | String        | Yes      |
| jobDescription   | String        | Yes      |
| status           | String        | Yes      |
| atsScore         | Number        | No       |
| extractedSkills  | Array<String> | No       |
| missingSkills    | Array<String> | No       |
| aiSummary        | String        | No       |
| uploadedAt       | Date          | Yes      |

### Status Enum

* pending
* processing
* completed
* failed

### Indexes

* userId
* userId + uploadedAt

### Relationship

Many Resumes → One User

One Resume → One Roadmap

---

## Collection 3: Roadmaps

### Fields

| Field           | Type          | Required |
| --------------- | ------------- | -------- |
| _id             | ObjectId      | Yes      |
| userId          | ObjectId      | Yes      |
| resumeId        | ObjectId      | Yes      |
| targetRole      | String        | Yes      |
| currentLevel    | String        | Yes      |
| estimatedWeeks  | Number        | Yes      |
| phases          | Array<Object> | Yes      |
| progressPercent | Number        | Yes      |
| generatedAt     | Date          | Yes      |

### Current Level Enum

* student
* junior
* mid
* senior

### Phase Structure

```json
{
  "phaseNumber": 1,
  "title": "Learn Backend Development",
  "description": "Learn Node.js and Express",
  "durationWeeks": 4,
  "skills": ["Node.js", "Express"],
  "resources": [
    {
      "title": "Course Name",
      "url": "https://example.com"
    }
  ]
}
```

### Indexes

* resumeId (unique)
* userId

### Relationship

Many Roadmaps → One User

One Roadmap → One Resume

---

# Entity Relationships

User (1)
↓
Resume (Many)

User (1)
↓
Roadmap (Many)

Resume (1)
↓
Roadmap (1)

---

# Project MVP Scope

Users:

* Registration
* Login

Resumes:

* PDF Upload
* Resume Parsing
* ATS Score
* Skill Extraction

Roadmaps:

* Career Roadmap Generation
* Progress Tracking

This database design is the MVP version for the Smart ATS + Career Roadmap Generator project.
