# Skills Data Structure

This directory contains the modular skills data for the portfolio's About section.

## File Structure

```
src/data/
├── skills.json           # Complete skills data (original, kept for reference)
├── technical-skills.json # Programming, Design, and Troubleshooting skills
├── ai-skills.json        # AI, ML, CV, NLP, and related skills
└── skillsUtils.js        # Utility functions for working with skills data
```

## Data Format

Each skill object follows this structure:

```json
{
  "name": "Skill Name",
  "icon": "🔥",
  "color": "from-blue-500 to-purple-600",
  "summary": "Brief description of the skill category...",
  "sections": [
    {
      "title": "Specific Technology/Area",
      "description": "Detailed description of experience and expertise..."
    }
  ]
}
```

## Usage Examples

### Import all skills
```javascript
import { getAllSkills } from '../data/skillsUtils'
const skills = getAllSkills()
```

### Get skills by category
```javascript
import { getSkillsByCategory } from '../data/skillsUtils'
const technicalSkills = getSkillsByCategory('technical')
const aiSkills = getSkillsByCategory('ai')
```

### Search for specific skills
```javascript
import { searchSkills, getSkillByName } from '../data/skillsUtils'
const pythonSkills = searchSkills('python')
const programmingSkill = getSkillByName('Programming')
```

## Adding New Skills

1. **For technical skills**: Add to `technical-skills.json`
2. **For AI/ML skills**: Add to `ai-skills.json`
3. **For new categories**: Create a new JSON file and update `skillsUtils.js`

## Available Tailwind Gradient Colors

Use these gradient combinations for the `color` property:
- `from-blue-500 to-purple-600`
- `from-pink-500 to-red-500`
- `from-green-500 to-blue-500`
- `from-purple-500 to-indigo-600`
- `from-orange-500 to-red-500`
- `from-cyan-500 to-blue-600`
- `from-emerald-500 to-teal-600`
- `from-violet-500 to-purple-600`

## Benefits of This Structure

1. **Modularity**: Skills are organized by category
2. **Maintainability**: Easy to update individual skill categories
3. **Reusability**: Utility functions can be used throughout the app
4. **Performance**: Can load only needed categories if required
5. **Type Safety**: Consistent data structure across all files
