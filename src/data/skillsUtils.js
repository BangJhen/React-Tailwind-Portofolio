// Skills data utilities
import technicalSkills from './technical-skills.json'
import aiSkills from './ai-skills.json'

/**
 * Combines all skills from different categories
 * @returns {Array} Combined array of all skills
 */
export const getAllSkills = () => {
  return [
    ...technicalSkills.skills,
    ...aiSkills.skills
  ]
}

/**
 * Gets skills by category
 * @param {string} category - 'technical' or 'ai'
 * @returns {Array} Skills for the specified category
 */
export const getSkillsByCategory = (category) => {
  switch (category) {
    case 'technical':
      return technicalSkills.skills
    case 'ai':
      return aiSkills.skills
    default:
      return getAllSkills()
  }
}

/**
 * Gets a specific skill by name
 * @param {string} skillName - Name of the skill to find
 * @returns {Object|null} The skill object or null if not found
 */
export const getSkillByName = (skillName) => {
  const allSkills = getAllSkills()
  return allSkills.find(skill => 
    skill.name.toLowerCase() === skillName.toLowerCase()
  ) || null
}

/**
 * Gets skills that match a search term
 * @param {string} searchTerm - Term to search for
 * @returns {Array} Array of matching skills
 */
export const searchSkills = (searchTerm) => {
  const allSkills = getAllSkills()
  const term = searchTerm.toLowerCase()
  
  return allSkills.filter(skill => 
    skill.name.toLowerCase().includes(term) ||
    skill.summary.toLowerCase().includes(term) ||
    skill.sections.some(section => 
      section.title.toLowerCase().includes(term) ||
      section.description.toLowerCase().includes(term)
    )
  )
}
