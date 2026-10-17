import { Pizzeria, Chauffeur, School, Excavation, Accounting, BuildingSupplies, Supermarket, Supplements } from './clients'
import { SecondBrain, LolCoach, QuestZip } from './personal'

// The diagram of each private project, by id (the projects with a screenshot have none).
export const drawings = {
  pizzeria: Pizzeria, chauffeur: Chauffeur, school: School, excavation: Excavation,
  accounting: Accounting, 'building-supplies': BuildingSupplies, supermarket: Supermarket, supplements: Supplements,
  'second-brain': SecondBrain, 'lol-coach': LolCoach, questzip: QuestZip,
}
