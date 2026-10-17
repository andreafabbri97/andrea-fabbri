import { projectsEn } from './projectsEn'
import { projectsIt } from './projectsIt'

export const copyFor = (lang) => (lang === 'it' ? projectsIt : projectsEn)
